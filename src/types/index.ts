export interface Center {
  count: number;
  centerName: string;
  url: string | null;
}

export interface Parish {
  total: number;
  centers: Record<string, Center>;
}

export interface Municipality {
  total: number;
  parishes: Record<string, Parish>;
}

export interface State {
  total: number;
  municipalities: Record<string, Municipality>;
}

export type GroupedReport = Record<string, State>;
