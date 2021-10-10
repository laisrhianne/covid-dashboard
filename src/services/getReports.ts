import { api } from './api';
import { IReport } from '@/@types';
import { formatDate } from '@/utils/formatData';

interface IResponse {
  data: IReport;
}

async function apiRequest(date: string, iso: string): Promise<IReport> {
  return new Promise((resolve, reject) => {
    api
      .get('reports/total', { params: { date, iso } })
      .then((response) => {
        const data: IResponse = response.data;
        return data.data;
      })
      .catch((err) => {
        reject([]);
        throw new Error(err.message);
      });
  });
}

export async function getReports(
  regionIso: string,
  days = 90
): Promise<IReport[]> {
  const promises = [];

  const daysInMs = 24 * 60 * 60 * 1000;
  const yesterday = Date.now() - daysInMs;

  for (let i = 0; i < days; i++) {
    const daysToSubtract = i * daysInMs;
    const date = formatDate(new Date(yesterday - daysToSubtract));
    promises.push(apiRequest(date, regionIso));
  }

  const responses = (await Promise.all(promises)).filter(
    (report) => !Array.isArray(report)
  );

  return responses;
}
