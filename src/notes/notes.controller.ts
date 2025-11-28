import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/crate-notes.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async creatNote(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const authorId = req.user.id;
    return this.notesService.create(createNoteDto, authorId);
  }
}
