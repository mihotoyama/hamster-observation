import http from './api-settings';
import { HamsterResponse } from './type';

export default async function getHamsterJson(): Promise<HamsterResponse> {
  return http.get('').then((res) => {
    if (res.status === 200) {
      return res.data as HamsterResponse;
    }
    return {
      nowtime: '',
      weight: 0,
      activeCount: 0,
      temperature: 0,
      wheelCount: 0,
      houseCount: 0,
      humidity: 0,
    } as HamsterResponse;
  });
}
