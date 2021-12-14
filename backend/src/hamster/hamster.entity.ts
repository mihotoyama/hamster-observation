import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hamster {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  nowtime: string;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int' })
  activeCount: number;

  @Column({ type: 'int' })
  temperature: number;

  @Column({ type: 'int' })
  wheelCount: number;

  @Column({ type: 'int' })
  houseCount: number;

  @Column({ type: 'int' })
  humidity: number;

  @Column({ type: 'double', nullable: true })
  wheelSpeed: number;

  @CreateDateColumn({
    type: 'datetime',
    default: () => "datetime('now', 'localtime')",
    precision: 0,
  })
  createdAt: Date;

  constructor(
    nowtime: string,
    weight: number,
    activeCount: number,
    temperature: number,
    wheelCount: number,
    houseCount: number,
    humidity: number,
    wheelSpeed: number,
  ){
    this.nowtime = nowtime;
    this.weight = weight;
    this.activeCount = activeCount;
    this.temperature = temperature;
    this.wheelCount = wheelCount;
    this.houseCount = houseCount;
    this.humidity = humidity;
    this.wheelSpeed = wheelSpeed;
  }
}