import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/RegisterUserError';

export interface RegisterUserUsecaseInterface extends
  UseCase<RegisterUserUsecaseInterface.Request, RegisterUserUsecaseInterface.Response> {
  execute(userRegisterData: RegisterUserUsecaseInterface.Request):
  Promise<RegisterUserUsecaseInterface.Response>;

}

export namespace RegisterUserUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_REFRESHTOKEN'>;
  export type ResponseDataType = {
    userFullname:string;
    userEmail:string;
    userPhone:string;
    token:string
    refreshToken:string;
  };
  export type Response = { message: string; data: ResponseDataType }
  | PhoneInUseError | RegisterUserError;
}
