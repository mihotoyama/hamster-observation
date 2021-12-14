import http from './api-settings';
import { HamsterResponseArray } from './type';

export default async function getHamsterJsonArray(): Promise<HamsterResponseArray> {
  return http.get('').then((res) => {
    if (res.status === 200) {
      return res.data as HamsterResponseArray;
    }
    return [{
      nowtime: '',
      weight: 0,
      activeCount: 0,
      temperature: 0,
      wheelCount: 0,
      houseCount: 0,
      humidity: 0,
      wheelSpeed: 0,
    }] as HamsterResponseArray;
  });
}
