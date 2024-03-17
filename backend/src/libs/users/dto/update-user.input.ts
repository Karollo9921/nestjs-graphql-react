import { CreateUserInput } from './create-user.input';
import { InputType, Field, OmitType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, ['password']) {
  @Field()
  @IsMongoId()
  id: string;
}
