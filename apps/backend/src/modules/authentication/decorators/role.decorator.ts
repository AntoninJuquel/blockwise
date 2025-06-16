import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/api/user/entities/user.entity';

export const ROLES_KEY = 'roles';
export const EXCLUDED_ROLES_KEY = 'excludedRoles';
export const EVERY_ROLES_KEY = 'everyRoles';
export const Roles = (...roles: [UserRole, ...UserRole[]]) =>
  SetMetadata(ROLES_KEY, roles);
export const ExcludedRoles = (...roles: [UserRole, ...UserRole[]]) =>
  SetMetadata(EXCLUDED_ROLES_KEY, roles);
export const EveryRoles = () => SetMetadata(EVERY_ROLES_KEY, true);
