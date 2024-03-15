import { Logger } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    return (await this.model.create(document)).toJSON() as unknown as TDocument;
  }

  async findOne(
    query: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOne(query, projection).lean<TDocument>();
  }

  async find(
    query: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
  ): Promise<TDocument> {
    return this.model.find(query, projection).lean<TDocument>();
  }

  async findOneAndUpdate(
    query: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument> {
    return this.model
      .findOneAndUpdate(query, update, options)
      .lean<TDocument>();
  }

  async findOneAndDelete(query: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(query).lean<TDocument>();
  }
}
