import { User } from 'src/modules/api/user/entities/user.entity';

export type JwtPayload = {
  id: string;
  email: string;
  role: UserRole;
};

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
