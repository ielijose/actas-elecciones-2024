export interface Person {
  cid: string;
  fullname: string;
  date: string;
  location: string;
  state: string;
  mun: string;
  par: string;
  center: string;
  address: string;
  table: string | null;
  book: string | null;
  page: string | null;
  row: string | null;
  markCheck: boolean;
}

export interface Acta {
  geo: string | null;
  serial: string;
  documentId: number;
  url: string;
  stages: string | null;
}

export interface CIQueryResponse {
  url: string;
}

export interface FormData {
  cedula: string;
}
