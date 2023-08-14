import { v4, validate } from "uuid";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const formatCurrency = (amount: number): string => {
  return `$ ${amount.toFixed(2)}`;
};

export const formatDateRange = (from: number, to: number): string => {
  return `FROM ${formatDate(new Date(from))} TO ${formatDate(new Date(to))}`;
};

export const generateUuid = (): string => {
  return v4();
};

export const isValidUuid = (uuid: string): boolean => {
  return validate(uuid);
};

export const getTimestamp = (date: Date): number => {
  return Math.floor(date.getTime());
};
