"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  IRHFSingleSelect,
  ISelectOption,
  SelectMenuOptionsLoadType,
} from "@/typings/ui-kit/forms/form.typings";
import { useFormContext } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import {
  INITIAL_TABLE_LIMIT,
  INITIAL_TABLE_PAGE,
  INITIAL_TABLE_TOTAL,
} from "@/store/constants/table.constants";

import {
  IResponse,
  IResponseWithPaginationAndFilters,
} from "@/typings/server/server.typings";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/ui-kit/loader/Loader";
import { Input } from "@/components/ui/input";
import useThrottleFunc from "@/hooks/useThrottleFunc";
import { parseReqString } from "@/utils";
import TextTruncate from "@/ui-kit/common/textTruncate";
import { useFormSchema } from "@/components/wrapper/FormSchemaProvider";

function RHFSingleSelect<T = unknown>({
  label,
  name,
  className,
  disabled,
  optionsLoadProps,
  popoverContentClassname,
  popoverTriggerClassname,
  allowSearch,
  ax,
  placeholder = "Select an option",
}: IRHFSingleSelect<T>) {
  const { type } = optionsLoadProps;
  const parentRef = useRef<HTMLDivElement>(null);

  const { control, setValue, getValues } = useFormContext();
  const selectedOpt = getValues(name);

  const schema = useFormSchema();

  const isRequired = useMemo(() => {
    if (!schema) return false;
    return !(
      (schema._def as any)?.shape()?.[name]?.safeParse(undefined)?.success ||
      (schema._def as any)?.shape()?.[name]?.safeParse(null)?.success
    );
  }, [schema]);

  const { ref, inView } = useInView({
    root: parentRef.current,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const [selectedOptionDetails, setSelectedOptionDetails] = useState<T>();
  const [options, setOptions] = useState<ISelectOption[]>(
    type === SelectMenuOptionsLoadType.DEFINED ? optionsLoadProps.options : []
  );

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(INITIAL_TABLE_PAGE);
  const [limit, setLimit] = useState(INITIAL_TABLE_LIMIT);
  const [total, setTotal] = useState(INITIAL_TABLE_TOTAL);

  async function fetchSelectedResource() {
    try {
      if (!selectedOpt) return;
      setFetchingDetails(true);
      if (optionsLoadProps.type === SelectMenuOptionsLoadType.DEFINED) return;
      const res = await ax.get<IResponse<T>>(
        parseReqString(
          `${optionsLoadProps.optionsBaseUrl}/${selectedOpt}`,
          optionsLoadProps.filters
        )
      );
      setSelectedOptionDetails(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingDetails(false);
    }
  }

  async function fetchOptions() {
    if (disabled) return;
    setLoading(true);
    try {
      if (optionsLoadProps.type !== SelectMenuOptionsLoadType.INFINITE) return;
      const {
        optLabel,
        optionsBaseUrl,
        optValueAccessor,
        searchProperty,
        filters = {},
      } = optionsLoadProps;

      const res = await ax.get<
        IResponse<IResponseWithPaginationAndFilters<Record<keyof T, any>>>
      >(
        parseReqString(optionsBaseUrl, {
          page,
          limit,
          id: selectedOpt,
          [String(searchProperty)]: debouncedSearch,
          ...filters,
        })
      );

      const optionsArr = res.data.result?.data || [];
      const parsedOptArr: ISelectOption[] = optionsArr.map((option) => ({
        label: optLabel(option),
        value: option[optValueAccessor],
      }));
      setOptions(parsedOptArr);
      setTotal(res.data.result?.total || INITIAL_TABLE_TOTAL);
      setLimit((prev) => prev + INITIAL_TABLE_LIMIT);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const throttledFecthOpts = useThrottleFunc(fetchOptions, 1000);

  useEffect(() => {
    if (
      optionsLoadProps.type === SelectMenuOptionsLoadType.INFINITE &&
      inView &&
      options.length - 1 < total
    ) {
      throttledFecthOpts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, debouncedSearch]);

  useEffect(() => {
    fetchSelectedResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOpt]);

  useEffect(() => {
    if (optionsLoadProps.type === SelectMenuOptionsLoadType.DEFINED) {
      setOptions(optionsLoadProps.options);
    }
  }, [optionsLoadProps]);

  return (
    <FormField
      name={name}
      disabled={disabled}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start items-start w-full">
          <FormControl>
            <Popover modal open={open} onOpenChange={setOpen}>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                {label && (
                  <FormLabel
                    className={`text-[0.7rem] 2xl:text-[0.8rem] -mb-1 font-medium  ${
                      disabled
                        ? "text-input_disabled"
                        : "text-light-primary dark:text-dark_text_tertiary"
                    }`}
                  >
                    {label}
                    {isRequired && "*"}
                  </FormLabel>
                )}
                <PopoverTrigger disabled={disabled} asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`flex h-10 2xl:h-12 bg-transparent dark:bg-dark_bg2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:font-normal placeholder:opacity-[0.6] text-light-primary dark:text-white font-normal rounded-md w-full px-2 py-3 outline-none text-[0.7rem] placeholder:text-[0.7rem] border placeholder:text-light-secondary md:py-4 border-light-border lg:py-3  dark:border-dark_border dark:placeholder:text-dark_text_secondary dark:text-dark_text_primary justify-between items-center gap-1 ${popoverTriggerClassname}`}
                  >
                    {field.value ? (
                      fetchingDetails ? (
                        <Loader className="w-3 h-3" />
                      ) : (
                        <p className="text-[0.7rem] 2xl:text-[0.8rem] text-light-primary font-normal dark:text-dark_text_tertiary">
                          <TextTruncate
                            text={
                              optionsLoadProps.type ===
                              SelectMenuOptionsLoadType.DEFINED
                                ? options.find(
                                    (ele) => ele.value === field.value
                                  )?.label
                                : optionsLoadProps.optLabel(
                                    selectedOptionDetails
                                  )
                            }
                            limit={18}
                          />
                          {/* {optionsLoadProps.type ===
                          SelectMenuOptionsLoadType.DEFINED
                            ? options.find((ele) => ele.value === field.value)
                                ?.label
                            : optionsLoadProps.optLabel(selectedOptionDetails)} */}
                        </p>
                      )
                    ) : (
                      <p className="opacity-50 text-[0.7rem] 2xl:text-[0.8rem] text-light-secondary font-medium dark:text-dark_text_secondary">
                        {placeholder}
                      </p>
                    )}
                    <CaretSortIcon className="ml-0 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent
                className={`p-0 w-fit ${popoverContentClassname}`}
              >
                <Command className="">
                  {allowSearch && (
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="h-9"
                    />
                  )}
                  <CommandList ref={parentRef}>
                    {!loading && total === options.length && (
                      <CommandEmpty className="text-[0.7rem] p-2 w-fit border">
                        No results found
                      </CommandEmpty>
                    )}
                    <CommandGroup className="border-none border">
                      {options.map((ele) => (
                        <CommandItem
                          key={ele.value}
                          value={ele.value}
                          onSelect={(currentValue: any) => {
                            setValue(
                              name,
                              currentValue === field.value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                          className="text-[0.7rem] 2xl:text-[0.8rem]"
                        >
                          {ele.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              field.value === ele.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                      <div ref={ref}></div>
                      {loading &&
                        type === SelectMenuOptionsLoadType.INFINITE && (
                          <div className="flex justify-center items-center">
                            <Loader />
                          </div>
                        )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFSingleSelect;
