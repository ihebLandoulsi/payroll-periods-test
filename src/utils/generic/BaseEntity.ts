import { PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from './timestamp';
/**
 * a generic entity used to be extended by other entities
 */
export class BaseEntity extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
