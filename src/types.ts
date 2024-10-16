import { User } from "@prisma/client";

export type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type PasswordAuthSuccess = {
  item: Pick<User, "name" | "email">;
  sessionToken: string;
};

export type PasswordAuthFailure = {
  message: string;
};

export type PasswordAuthResult = PasswordAuthSuccess | PasswordAuthFailure;

export function isAuthSuccess(
  result: PasswordAuthResult,
): result is PasswordAuthSuccess {
  return "sessionToken" in result;
}

export function isAuthFailure(
  result: PasswordAuthResult,
): result is PasswordAuthFailure {
  return "message" in result;
}
