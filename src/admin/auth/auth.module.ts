import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

dotenv.config()

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
