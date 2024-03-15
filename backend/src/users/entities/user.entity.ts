import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database';

@Schema()
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
