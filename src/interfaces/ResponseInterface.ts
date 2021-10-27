export interface ResponseSuccessREST {
  responseCode?: string;
  message: string;
  success: boolean;
}

export interface ResponseFailREST extends ResponseSuccessREST {
  data: null;
}

export interface BaseResponseRestInterface<T> {
  data: T | null;
  message: string;
  success: boolean;
}
