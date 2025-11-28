import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/crate-notes.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { sendResponse } from 'src/common/utils/sendResponse';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async creatNote(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const authorId = req.user.id;
    const result = await this.notesService.create(createNoteDto, authorId);
    return sendResponse({
      statusCode: 201,
      message: 'Note created successfully',
      data: result,
      success: true,
    });
  }

  // get

  @Get()
  async getAllNotes() {
    const result = await this.notesService.findAll();
    return sendResponse({
      statusCode: 200,
      message: 'All Notes retrieved successfully',
      data: result,
      success: true,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  async getNotesByAuthorId(@Req() req) {
    const authorId = req.user.id;
    const result = await this.notesService.findByAuthorId(authorId);
    return sendResponse({
      statusCode: 200,
      message: 'Notes retrieved successfully',
      data: result,
      success: true,
    });
  }
}
