import { PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from './timestamp';

export class BaseEntity extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
