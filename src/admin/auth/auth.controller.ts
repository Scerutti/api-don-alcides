import { Controller, Post, Body, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminUser } from '../admin.model';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() adminUser: AdminUser): Promise<{ token: string }> {
    const validUser = await this.authService.validateAdminUser(adminUser.username, adminUser.password);

    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.generateJwtToken(validUser);
    return { token };
  }

  @Post('register')
  async register(@Body() adminUser: AdminUser): Promise<void> {
    const existingUser = await this.authService.validateAdminUser(adminUser.username, adminUser.password);

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    await this.authService.registerAdminUser(adminUser);
  }
}
