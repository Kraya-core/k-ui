import React from "react";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
// import { ISampleDefaultValues } from "./sample/formSample.typings";

import z, { ZodType } from "zod";

// export type IDefaultValues = ISampleDefaultValues;

export interface IRHFForm<IDefaultValues = any> {
  defaultValues: IDefaultValues;
  validationSchema: z.ZodTypeAny;
  onSubmit: (value: z.infer<ZodType<IDefaultValues>>) => Promise<void> | void;
  children?: React.ReactNode;
  className?: string;
}

export interface IRHFField<PossibleNames = string> {
  label: string | boolean;
  name: PossibleNames;
  // type?: React.HTMLInputTypeAttribute;
  // className?: string;
  // disabled?: boolean;
}

export interface ISelectOption<Label = any, Value = string> {
  label: Label;
  value: Value;
}

interface IRHFArrayFieldObjectProps {
  // append: UseFieldArrayAppend<FieldValues, string>;
  remove: UseFieldArrayRemove;
  field: Record<"id", string>;
  index: number;
  baseName: string;
}
export interface IRHFArrayField<T = unknown> extends IRHFField {
  appendObj: Record<keyof T, unknown>;
  renderChildren: ({}: IRHFArrayFieldObjectProps) => React.ReactNode;
}
export interface IRHFRadio
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IRHFField {
  children: React.ReactNode;
  defaultValue?: string | undefined;
}

export interface IRHFDateTimePicker
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IRHFField {}

export interface IRHFTextarea<PossibleNames = string>
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "name">,
    IRHFField<PossibleNames> {
  rows?: number;
}
export interface IRHFInput
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IRHFField {}

export interface IRHFDatePicker
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IRHFField {}
export interface IRHFSwitch
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IRHFField {}
export interface IRHFSelect
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IRHFField {
  placeholder?: string;
  allowSearch?: boolean;
  popoverContentClassname?: string;
  popoverTriggerClassname?: string;
}

export enum SelectMenuOptionsLoadType {
  DEFINED = "DEFINED",
  INFINITE = "INFINITE",
}

export type InfiniteSelectMenuProps<T> = {
  type: SelectMenuOptionsLoadType.INFINITE;
  optionsBaseUrl: string;
  optValueAccessor: keyof T;
  optLabel: (data?: T) => React.ReactNode;
  searchProperty: string | keyof T;
  filters?: Record<
    string,
    string | string[] | number | number[] | boolean | undefined | null
  >;
};

export type DefinedSelectMenuProps = {
  type: SelectMenuOptionsLoadType.DEFINED;
  options: ISelectOption[];
};

export type IRHFSingleSelect<T> = IRHFSelect & {
  optionsLoadProps: DefinedSelectMenuProps | InfiniteSelectMenuProps<T>;
  ax: Axios.AxiosInstance;
};

export type IRHFMultiSelect<T = unknown> = IRHFSelect & {
  optionsLoadProps: DefinedSelectMenuProps | InfiniteSelectMenuProps<T>;
  ax: Axios.AxiosInstance;
};

export interface IRHFCheckbox
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IRHFField {}
