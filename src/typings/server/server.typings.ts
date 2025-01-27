export interface IResponse<T = any> {
  result?: T;
  error?: string;
  message?: string;
}

export interface IResponseWithPaginationAndFilters<DataType> {
  data: DataType[];
  limit: number;
  total: number;
  page: number;
}

export interface IErrorResponse {
  message?: string;
  error?: string;
}

export interface IPaginationFilters {
  page: number;
  limit: number;
}
