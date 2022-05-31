import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * A generic entity used to be extended by other entities that should have timestamps.
 * timestamp is required for entities that need soft remove in the database
 */
export class Timestamp {
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
