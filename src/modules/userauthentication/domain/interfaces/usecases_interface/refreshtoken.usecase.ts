import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '../../entities/user.entity';
import { InvalidRefreshTokenError } from '../../errors/refreshtokeninvalid.error';
import { RefreshTokenGenerationError } from '../../errors/refreshtokengeneration.error';

export interface RefreshTokenUsecaseInterface extends
  UseCase<RefreshTokenUsecaseInterface.Request, RefreshTokenUsecaseInterface.Response> {
  execute(refteshTokenData: RefreshTokenUsecaseInterface.Request):
  Promise<RefreshTokenUsecaseInterface.Response>;

}

export namespace RefreshTokenUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_PHONE'>;
  export type ResponseDataType = {
    token:string
    refreshToken:string;
  };
  export type Response = { message: string; data: ResponseDataType }
  | InvalidRefreshTokenError | RefreshTokenGenerationError;
}
