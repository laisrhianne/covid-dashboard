export interface IRegion {
  iso: string;
  name: string;
}

export interface IReport {
  [x: string]: number;
  date: string;
  last_update: string;
  confirmed: number;
  confirmed_diff: number;
  deaths: number;
  deaths_diff: number;
  recovered: number;
  recovered_diff: number;
  active: number;
  active_diff: number;
  fatality_rate: number;
}

export interface IGraphData {
  x: string[];
  y: number[];
}
