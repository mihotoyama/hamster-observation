export type HamsterResponse = {
  nowtime: string;
  weight: number;
  activeCount: number;
  temperature: number;
  wheelCount: number;
  houseCount: number;
  humidity: number;
  wheelSpeed: number;
}

export type HamsterResponseList = {
  allData: HamsterResponse[];
}
