import { Either } from "@/types";

type OffsetPage = {
  take?: number;
  skip?: number;
};

type SizedPage = {
  page?: number;
  size?: number;
};

export type PagedProps = Either<OffsetPage, SizedPage>;
