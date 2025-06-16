import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthenticationService } from '../authentication.service';
import { JwtPayload } from '../types/current-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtConfiguration: ConfigType<typeof jwtConfig>,
    private authService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
      ignoreExpiration: false,
    } as StrategyOptionsWithRequest);
  }

  validate(payload: JwtPayload) {
    const userId = payload.id;
    return this.authService.validateJwtUser(userId);
  }
}
