import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto, @Req() req: FastifyRequest) {
    return this.authenticationService.login({
      id: req.user.id,
      email: loginDto.email,
      role: req.user.role,
    });
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authenticationService.register(registerDto);
  }

  @Get('/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  status(@Req() req: FastifyRequest) {
    return req.user;
  }
}
