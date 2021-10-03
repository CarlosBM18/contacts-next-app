import { ButtonHTMLAttributes } from "react";

export type BasicLayoutProps = {
  title: string;
  children: JSX.Element;
};

export type InputProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: string;
};

export type ButtonProps = {
  title: string;
  onClick?: () => void;
  styleType: ButtonTypes;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  loading?: boolean;
  disabled?: boolean;
};

type ButtonTypes = "primary" | "danger";

export type TextLinkProps = {
  text: string;
  onClick: () => void;
};

export interface ContactObject {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface ContactHistoryObject {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  state: ContactHistoryStates;
}

export enum ContactHistoryStates {
  CREATED = "created",
  UPDATED = "updated",
}

export type ContactElementProps = {
  data: ContactObject;
};

export type ContactHistoryElementProps = {
  data: ContactHistoryObject;
};

export interface AlertObject {
  id: number;
  status: AlertStatus;
  message: string;
}

export enum AlertStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export type AlertElementProps = {
  data: AlertObject;
};

export interface UserObject {
  id: number;
  email: string;
}
