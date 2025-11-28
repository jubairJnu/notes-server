import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/crate-notes.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private noteModel: Model<NoteDocument>) {}

  async create(dto: CreateNoteDto, authorId: string): Promise<Note> {
    const createdNote = new this.noteModel({
      ...dto,
      authorId,
    });
    return createdNote.save();
  }
  //

  async findAll(): Promise<Note[]> {
    return this.noteModel.find({ isPrivate: false });
  }
  async findByAuthorId(userId: string) {
    return this.noteModel.find({ authorId: new Types.ObjectId(userId) });
  }
}
