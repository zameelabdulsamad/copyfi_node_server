import env from '@main/config/env';
import { TokenGenerationError } from '@modules/userauthentication/domain/errors/tokengeneration.error';
import { InvalidTokenError } from '@modules/userauthentication/domain/errors/tokeninvalid.error';
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
    try {
      const payload = {
        uid: generateTokenData.USER_UID,
        iat: Math.floor(Date.now() / 1000),
      };
      const token = jwt.sign(payload, this.key, { expiresIn: '50m' });
      const refreshToken = jwt.sign(payload, this.key, { expiresIn: '25d' });

      return { data: { token, refreshToken } };
    } catch (error) {
      return new TokenGenerationError();
    }
  }

  async verifyToken(
    verifyTokenData: JwtExternalAdapterInterface.VerifyTokenRequest,
  ): Promise<JwtExternalAdapterInterface.VerifyTokenResponse> {
    try {
      const decoded = jwt.verify(verifyTokenData.token, this.key);
      return { data: { userUid: (decoded as any).uid } };
    } catch (error) {
      return new InvalidTokenError();
    }
  }
}
