export type BasicLayoutProps = {
  title: string;
  children: JSX.Element;
};

export type InputProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
};

export type ButtonProps = {
  title: string;
  onClick: () => void;
  type: ButtonTypes;
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

export type ContactHistoryStates = "created" | "updated" | "deleted";

export interface ContactElementProps {
  data: ContactObject;
}

export interface ContactHistoryElementProps {
  data: ContactHistoryObject;
}
