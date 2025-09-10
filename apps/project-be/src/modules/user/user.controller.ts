import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserDto, AuthDto } from './app/dto';
import { UserService, AuthService } from './app/service';
import { AuthGuard } from './app/auth.guard';
import { AuthTokenInterceptor } from './app/auth.interceptor';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() query: UserDto.Params) {
    return this.userService.findUsers(query);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findByIdUser(id);
  }

  @Get('email')
  async getUserByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post()
  async createUser(@Body() body: UserDto.Create) {
    return this.userService.createUser(body);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() body: UserDto.Update) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UseInterceptors(AuthTokenInterceptor)
  async login(@Body() body: AuthDto.Login) {
    return this.authService.signIn(body);
  }

  @Get('sign-out')
  async logout() {
    return this.authService.signOut();
  }
}
