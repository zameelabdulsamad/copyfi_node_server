import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/register_error/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/register_error/RegisterUserError';

export interface RegisterUserUsecaseInterface extends
  UseCase<RegisterUserUsecaseInterface.Request, RegisterUserUsecaseInterface.Response> {
  execute(userRegisterData: RegisterUserUsecaseInterface.Request):
  Promise<RegisterUserUsecaseInterface.Response>;

}

export namespace RegisterUserUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'otp'>;
  export type Response = { message: string } | PhoneInUseError | RegisterUserError;
}
