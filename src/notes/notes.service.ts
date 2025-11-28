import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/crate-notes.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private noteModel: Model<NoteDocument>) {}

  async create(dto: CreateNoteDto, authorId: string): Promise<Note> {
    dto.authorId = new Types.ObjectId(authorId);
    return this.noteModel.create(dto);
  }
  //

  async findAll(): Promise<Note[]> {
    return this.noteModel
      .find({ isPrivate: false })
      .populate('authorId', 'email name');
  }
  async findByAuthorId(authorId: string) {
    return this.noteModel
      .find({ authorId: new Types.ObjectId(authorId) })
      .populate('authorId', 'email name');
  }

  // update

  async updateNote(
    id: string,
    dto: Partial<CreateNoteDto>,
  ): Promise<Note | null> {
    console.log(id, 'service id');
    return await this.noteModel.findByIdAndUpdate(id, dto, { new: true });
  }
  // delete

  async deleteNote(id: string): Promise<Note | null> {
    return await this.noteModel.findByIdAndDelete(id);
  }
}
