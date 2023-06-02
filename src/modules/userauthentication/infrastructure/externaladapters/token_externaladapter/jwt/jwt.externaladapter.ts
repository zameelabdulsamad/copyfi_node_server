import env from '@main/config/env';
import { ForbiddenError } from '@modules/userauthentication/domain/errors/ForbiddenError';
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
    const payload = {
      uid: generateTokenData.USER_UID,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = jwt.sign(payload, this.key);
    return token;
  }

  async verifyToken(
    verifyTokenData: JwtExternalAdapterInterface.VerifyTokenRequest,
  ): Promise<JwtExternalAdapterInterface.VerifyTokenResponse> {
    try {
      const decoded = jwt.verify(verifyTokenData, this.key);
      return (decoded as any).uid as string;
    } catch (error) {
      return new ForbiddenError();
    }
  }
}
