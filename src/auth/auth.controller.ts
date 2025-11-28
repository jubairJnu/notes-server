import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { sendResponse } from '../common/utils/sendResponse';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { email: string; password: string }) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return sendResponse({
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      data: result,
      success: true,
    });
  }
}
