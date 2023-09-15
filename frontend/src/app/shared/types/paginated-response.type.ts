export type TPaginationResponse<Type> = {
  currentLimit: number;
  currentOffset: string | null;
  nextOffset: string | null;
  records: Array<Type>;
};
