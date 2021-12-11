import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hamster {
  @PrimaryGeneratedColumn()
  readonly id: number;
  nowtime: string;
  weight: number;
  activeCount: number;
  temperature: number;
  wheelCount: number;
  houseCount: number;
  humidity: number;

  constructor(
    nowtime: string,
    weight: number,
    activeCount: number,
    temperature: number,
    wheelCount: number,
    houseCount: number,
    humidity: number,
  ){
    this.nowtime = nowtime;
    this.weight = weight;
    this.activeCount = activeCount;
    this.temperature = temperature;
    this.wheelCount = wheelCount;
    this.houseCount = houseCount;
    this.humidity = humidity;
  }
}