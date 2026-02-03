import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy {
  constructor() {
    console.log('🔐 JWT Strategy initialized (mock mode)');
  }

  async validate(payload: any) {
    // Mock validation for development
    return {
      userId: payload.sub || 'mock-user-id',
      email: payload.email || 'mock@example.com',
      role: payload.role || 'user',
    };
  }
}
