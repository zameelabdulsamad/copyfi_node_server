import env from '@main/config/env';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import 'reflect-metadata';
import { GenerateTokenJwtAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/jwt/generatetoken.jwtadapter';

@injectable()
export class GenerateTokenJwtAdapter implements GenerateTokenJwtAdapterInterface {
  private key:string = env.jwtSecurityKey as string;

  async generateToken(
    generateTokenData: GenerateTokenJwtAdapterInterface.Request,
  ): Promise<GenerateTokenJwtAdapterInterface.Response> {
    const token = jwt.sign({ uid: generateTokenData.USER_UID }, this.key);
    return { acctok: `${token}` };
  }
}
