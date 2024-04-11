export interface Category {
  id:number;
  name:string;
  slug:string;
  created_at:string;
}

export interface ApiResponse<T> {
  message?: string;
  data: T;
}
