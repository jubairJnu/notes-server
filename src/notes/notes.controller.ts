import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/crate-notes.dto';
import { AuthGuard } from '../auth/auth.guard';
import { sendResponse } from '../common/utils/sendResponse';

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

  // GET all notes
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

  // GET notes by logged-in user
  @Get('my-notes')
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

  // update
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateNote(@Param('id') id: string, @Body() body: any) {
    const result = await this.notesService.updateNote(id, body);
    return sendResponse({
      statusCode: 200,
      message: 'Notes updated successfully',
      data: result,
      success: true,
    });
  }

  // delete
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteNote(@Param('id') id: string) {
    const result = await this.notesService.deleteNote(id);
    return sendResponse({
      statusCode: 200,
      message: 'Notes deleted successfully',
      data: result,
      success: true,
    });
  }
}
