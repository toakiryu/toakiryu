type ResourceResponse<T> = {
  data: T;
};
export type PaginatedResourceResponse<T> = ResourceResponse<T> & {
  totalCount: number;
};