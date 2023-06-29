import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { BoardDto } from './board.dto';

@InputType()
export class CreateBoardDto extends PickType(PartialType(BoardDto, InputType), [
  'title',
  'content',
]) {
  @Field({ nullable: true })
  email: string;
}
