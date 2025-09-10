import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthDto.Login) {
    return this.authService.login(body);
  }

  @Get('users')
  async findUsers(@Query() query: AuthDto.Params) {
    return this.authService.findUsers(query);
  }

  @Get('users/:id')
  async findOneUser(@Param('id') id: number) {
    return this.authService.findOneUser(id);
  }

  @Post('users')
  async createUser(@Body() body: AuthDto.Create) {
    return this.authService.createUser(body);
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: number, @Body() body: AuthDto.Update) {
    return this.authService.updateUser(id, body);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
