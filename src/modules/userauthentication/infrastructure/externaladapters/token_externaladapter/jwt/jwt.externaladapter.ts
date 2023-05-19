import env from '@main/config/env';
import { ForbiddenError } from '@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError';
import { JwtExternalAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/token/jwt/jwt.externaladapter';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import 'reflect-metadata';

@injectable()
export class JwtExternalAdapter implements JwtExternalAdapterInterface {
  private key:string = env.jwtSecurityKey as string;

  async generateToken(
    generateTokenData: JwtExternalAdapterInterface.GenerateTokenRequest,
  ): Promise<JwtExternalAdapterInterface.GenerateTokenResponse> {
    const token = jwt.sign({ uid: generateTokenData.USER_UID }, this.key);
    return { acctok: `${token}` };
  }

  async verifyToken(
    verifyTokenData: JwtExternalAdapterInterface.VerifyTokenRequest,
  ): Promise<JwtExternalAdapterInterface.VerifyTokenResponse> {
    try {
      return jwt.verify(verifyTokenData, this.key) as string;
    } catch (error) {
      return new ForbiddenError();
    }
  }
}
