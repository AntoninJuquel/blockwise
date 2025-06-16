import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  EVERY_ROLES_KEY,
  EXCLUDED_ROLES_KEY,
  ROLES_KEY,
} from '../decorators/role.decorator';
import { UserRole } from 'src/modules/api/user/entities/user.entity';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user = this.getUserFromContext(context);
    const { requiredRoles, excludedRoles, everyRoles } =
      this.getRoleMetadata(context);

    if (!requiredRoles && !excludedRoles && !everyRoles) {
      return true;
    }

    if (everyRoles) {
      return this.hasEveryRole(user.role, everyRoles);
    }

    const hasRequiredRole = this.hasAnyRole(user.role, requiredRoles);
    const hasExcludedRole = this.hasAnyRole(user.role, excludedRoles);

    return hasRequiredRole && !hasExcludedRole;
  }

  private getUserFromContext(context: ExecutionContext) {
    return context.switchToHttp().getRequest<FastifyRequest>().user;
  }

  private getRoleMetadata(context: ExecutionContext) {
    return {
      requiredRoles: this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]),
      excludedRoles: this.reflector.getAllAndOverride<UserRole[]>(
        EXCLUDED_ROLES_KEY,
        [context.getHandler(), context.getClass()],
      ),
      everyRoles: this.reflector.getAllAndOverride<UserRole[]>(
        EVERY_ROLES_KEY,
        [context.getHandler(), context.getClass()],
      ),
    };
  }

  private hasEveryRole(
    userRole: UserRole,
    roles: UserRole[] | undefined,
  ): boolean {
    if (!roles) return false;
    return roles.every((role) => userRole === role);
  }

  private hasAnyRole(
    userRole: UserRole,
    roles: UserRole[] | undefined,
  ): boolean {
    if (!roles) return true;
    return roles.some((role) => userRole === role);
  }
}
