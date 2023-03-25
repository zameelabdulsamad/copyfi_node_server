import env from '@main/config/env';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import 'reflect-metadata';
import { VerifyTokenJwtAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/jwt/verifytoken.jwtadapter';
import { ForbiddenError } from '@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError';

@injectable()
export class VerifyTokenJwtAdapter implements VerifyTokenJwtAdapterInterface {
  private key:string = env.jwtSecurityKey as string;

  async verifyToken(
    verifyTokenData: VerifyTokenJwtAdapterInterface.Request,
  ): Promise<VerifyTokenJwtAdapterInterface.Response> {
    try {
      return jwt.verify(verifyTokenData, this.key) as string;
    } catch (error) {
      return new ForbiddenError();
    }
  }
}
