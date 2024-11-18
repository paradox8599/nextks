import { Either } from "../types";

type OffsetPage = {
  take?: number;
  skip?: number;
};

type SizedPage = {
  page?: number;
  size?: number;
};

export type PagedProps = Either<OffsetPage, SizedPage>;

export type Text = {
  text: string;
  [key: string]: unknown;
};
export type DocumentElement = {
  children: (DocumentElement | Text)[];
  [key: string]: unknown;
};
