import { Column } from 'typeorm';
import { BaseEntity } from './generic/BaseEntity';

export abstract class Periode extends BaseEntity {
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
}
