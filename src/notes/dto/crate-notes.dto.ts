import { Types } from 'mongoose';

export class CreateNoteDto {
  title: string;
  content: string;
  isPrivate?: boolean;
  authorId: Types.ObjectId;
}
