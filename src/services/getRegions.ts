import { api } from './api';
import { IRegion } from '@/@types';

interface IResponse {
  data: IRegion[];
}

export async function getRegions(): Promise<IRegion[]> {
  const data: IResponse = (
    await api.get('regions', { params: { order: 'name', sort: 'asc' } })
  ).data;

  return data.data;
}
