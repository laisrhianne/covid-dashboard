export interface IReportType {
  title: string;
  key: string;
}

export const reportTypes = [
  { title: 'Confirmed Cases Difference', key: 'confirmed_diff' },
  { title: 'Deaths Difference', key: 'deaths_diff' },
  // { title: 'Recovered Cases Difference', key: 'recovered_diff' },
];
