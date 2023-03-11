export interface UserEntityInterface {
  user_uid: string;
  user_email: string;
  user_fullname: string;
  user_phone: string;
}
export class UserEntity implements UserEntityInterface {
  public user_uid: string;

  public user_email: string;

  public user_fullname: string;

  public user_phone: string;

  constructor(props:UserEntityInterface) {
    this.user_uid = props.user_uid;
    this.user_email = props.user_email;
    this.user_fullname = props.user_fullname;
    this.user_phone = props.user_phone;
  }
}
