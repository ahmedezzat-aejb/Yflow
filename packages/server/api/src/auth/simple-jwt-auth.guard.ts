import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    // Simple token validation (in production, use proper JWT validation)
    const token = authHeader.replace('Bearer ', '');
    if (!token || token.length < 10) {
      throw new UnauthorizedException('Invalid token');
    }

    // For development, we'll allow any token that looks valid
    // In production, verify the JWT signature and expiration
    return true;
  }
}
