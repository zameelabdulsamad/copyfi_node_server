export interface UserEntityInterface {
  USER_UID: string;
  USER_EMAIL: string;
  USER_FULLNAME: string;
  USER_PHONE: string;
}
export class UserEntity implements UserEntityInterface {
  public USER_UID: string;

  public USER_EMAIL: string;

  public USER_FULLNAME: string;

  public USER_PHONE: string;

  constructor(props:UserEntityInterface) {
    this.USER_UID = props.USER_UID;
    this.USER_EMAIL = props.USER_EMAIL;
    this.USER_FULLNAME = props.USER_FULLNAME;
    this.USER_PHONE = props.USER_PHONE;
  }
}
