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
  DefinedSelectMenuProps,
  InfiniteSelectMenuProps,
  IRHFMultiSelect,
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
import useDebounce from "@/hooks/useDebounce";
import {
  IResponse,
  IResponseWithPaginationAndFilters,
} from "@/typings/server/server.typings";
import useThrottleFunc from "@/hooks/useThrottleFunc";
import Loader from "../loader/Loader";
import { Input } from "@/components/ui/input";
import { parseReqString } from "@/utils/parseReqString";
import TextTruncate from "@/ui-kit/common/textTruncate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormSchema } from "@/components/wrapper/FormSchemaProvider";

function RHFMultiSelect<T = unknown>({
  label,
  name,
  className,
  popoverContentClassname,
  popoverTriggerClassname,
  disabled,
  allowSearch,
  optionsLoadProps,
  ax,
  placeholder = "Select an option",
}: IRHFMultiSelect<T>) {
  const { type } = optionsLoadProps;

  const parentRef = useRef<HTMLDivElement>(null);
  const { control, setValue, getValues } = useFormContext();
  const selectedOpts = getValues(name);

  const schema = useFormSchema();

  const isRequired = useMemo(() => {
    if (!schema) return false;
    return !(
      (schema._def as any)?.shape()?.[name]?.safeParse(undefined)?.success ||
      (schema._def as any)?.shape()?.[name]?.safeParse(null)?.success
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  // const selectedOpts = [

  // ];

  const { ref, inView } = useInView({
    root: parentRef.current,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const [selectedOptionDetails, setSelectedOptionDetails] = useState<T[]>([]);
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
      if (
        optionsLoadProps.type !== SelectMenuOptionsLoadType.INFINITE ||
        !Array.isArray(selectedOpts) ||
        (Array.isArray(selectedOpts) && selectedOpts.length <= 0)
      )
        return;
      setFetchingDetails(true);
      const reqStr = parseReqString(
        `${optionsLoadProps.optionsBaseUrl}/fetch-multiple`,
        optionsLoadProps.filters
      );
      const res = await ax.post<IResponse<T[]>>(reqStr, {
        ids: selectedOpts,
        // ids: selectedOpts,
      });
      setSelectedOptionDetails(res.data.result || []);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingDetails(false);
    }
  }

  async function fetchOptions() {
    try {
      if (optionsLoadProps.type !== SelectMenuOptionsLoadType.INFINITE) return;
      setLoading(true);
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
        // `${optionsBaseUrl}?page=${page}&limit=${limit}&${String(
        //   searchProperty
        // )}=${debouncedSearch}`
        parseReqString(optionsBaseUrl, {
          limit,
          page,
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
  }, [selectedOpts]);

  return (
    <FormField
      name={name}
      disabled={disabled}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col justify-start items-start">
          <FormControl>
            <Popover modal open={open} onOpenChange={setOpen}>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                {label && (
                  <FormLabel
                    className={`text-[0.7rem] 2xl:text-[0.8rem] -mb-1 font-medium ${
                      disabled
                        ? "text-input_disabled"
                        : "text-light-primary dark:text-dark_text_tertiary"
                    }`}
                  >
                    {label}
                    {isRequired && "*"}
                  </FormLabel>
                )}
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`h-10 2xl:h-12 w-full flex justify-between px-2 py-3 text-[0.7rem] 2xl:text-[0.8rem] font-normal text-light-secondary border border-light-border dark:border-dark_border dark:bg-dark_bg2 bg-white ${popoverTriggerClassname}`}
                  >
                    {field.value &&
                    Array.isArray(field.value) &&
                    field.value.length > 0 ? (
                      fetchingDetails ? (
                        <Loader className="w-3 h-3" />
                      ) : type === SelectMenuOptionsLoadType.DEFINED ? (
                        <TextTruncate
                          text={getSelectedOptionsLabel({
                            ...optionsLoadProps,
                          })}
                          limit={14}
                        />
                      ) : (
                        <TextTruncate
                          text={getSelectedOptionsLabel({
                            ...optionsLoadProps,
                            options: selectedOptionDetails,
                          })}
                          limit={14}
                        />
                      )
                    ) : (
                      <p className="opacity-50">{placeholder}</p>
                    )}
                    {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    {field.value.length > 0 ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="py-[2px] px-[6px] bg-light-bg2 dark:bg-dark_bg3 rounded-sm group-hover:bg-transparent font-semibold text-[0.65rem] 2xl:text-[0.75rem]">
                              {field.value.length}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <ul className="w-full flex flex-col gap-1 py-1 px-4 list-disc">
                              {selectedOpts.map((id: string) =>
                                optionsLoadProps.type ===
                                SelectMenuOptionsLoadType.DEFINED ? (
                                  <li
                                    className="my-1 text-[0.7rem] 2xl:text-[0.8rem] font-medium text-light-primary"
                                    key={id}
                                  >
                                    {
                                      optionsLoadProps.options.find(
                                        (ele) => ele.value === id
                                      )?.label
                                    }
                                  </li>
                                ) : (
                                  <li
                                    className="my-1 text-[0.7rem] 2xl:text-[0.8rem] font-medium text-light-primary dark:text-dark_text_primary"
                                    key={id}
                                  >
                                    {optionsLoadProps.optLabel(
                                      selectedOptionDetails.find(
                                        (ele) => ele["id" as keyof T] === id
                                      )
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent
                className={`w-[12rem] p-0 ${popoverContentClassname}`}
              >
                <Command>
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
                      <CommandEmpty>No results found.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {options.map((ele) => (
                        <CommandItem
                          key={ele.value}
                          value={ele.value}
                          onSelect={(currentValue: string) => {
                            if (
                              field.value &&
                              Array.isArray(field.value) &&
                              field.value.includes(currentValue)
                            ) {
                              setValue(
                                name,
                                field.value.filter(
                                  (ele) => ele !== currentValue
                                )
                              );
                            } else {
                              setValue(name, [...field.value, currentValue]);
                            }
                          }}
                        >
                          {ele.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              Array.isArray(field.value) &&
                                field.value?.includes(ele.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                      <div ref={ref}>
                        {loading &&
                          type === SelectMenuOptionsLoadType.INFINITE && (
                            <div className="flex justify-center items-center">
                              <Loader />
                            </div>
                          )}
                      </div>
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

export default RHFMultiSelect;

function getSelectedOptionsLabel<T>(
  optionsData:
    | DefinedSelectMenuProps
    | (InfiniteSelectMenuProps<T> & { options: T[] })
): string {
  switch (optionsData.type) {
    case SelectMenuOptionsLoadType.DEFINED:
      const { options } = optionsData;
      return options.reduce(
        (prev, curr) => `${prev}${prev && ","} ${curr?.label}`,
        ""
      );
    case SelectMenuOptionsLoadType.INFINITE:
      const { optLabel, options: infiOpts } = optionsData;
      return infiOpts.map((opt) => optLabel(opt)).join(", ");
    default:
      return "";
  }
}
