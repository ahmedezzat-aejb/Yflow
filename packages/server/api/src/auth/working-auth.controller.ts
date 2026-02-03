import { Controller, Post, Body, Get, UseGuards, Req, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AuthService, RegisterDto, LoginDto } from './complete-auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    try {
      const user = req.user;
      const token = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
        refreshToken,
      };
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    try {
      return await this.authService.refreshToken(body.refreshToken);
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    try {
      return await this.authService.getProfile(req.user.sub);
    } catch (error) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Req() req, @Body() changePasswordDto: any) {
    try {
      await this.authService.changePassword(req.user.sub, changePasswordDto);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req, @Body() updateProfileDto: any) {
    try {
      return await this.authService.updateProfile(req.user.sub, updateProfileDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsersList(@Req() req) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      return await this.authService.getUsersList(page, limit, search);
    } catch (error) {
      throw new HttpException('Failed to get users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getUserStats() {
    try {
      return await this.authService.getUserStats();
    } catch (error) {
      throw new HttpException('Failed to get user stats', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('deactivate/:id')
  @UseGuards(JwtAuthGuard)
  async deactivateUser(@Param('id') id: string) {
    try {
      await this.authService.deactivateUser(id);
      return { message: 'User deactivated successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('activate/:id')
  @UseGuards(JwtAuthGuard)
  async activateUser(@Param('id') id: string) {
    try {
      await this.authService.activateUser(id);
      return { message: 'User activated successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
