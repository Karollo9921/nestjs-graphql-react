import { Logger } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  Types,
  UpdateQuery,
} from 'mongoose';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    return (
      await this.model.create({ ...document, _id: new Types.ObjectId() })
    ).toJSON() as T;
  }

  async findOne(
    query: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T> {
    return this.model.findOne(query, projection).lean<T>();
  }

  async find(
    query: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T[]> {
    return this.model.find(query, projection).lean<T[]>();
  }

  async findOneAndUpdate(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    console.log(query);
    console.log(update);
    return this.model.findOneAndUpdate(query, update, options).lean<T>();
  }

  async findOneAndDelete(query: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndDelete(query).lean<T>();
  }
}
