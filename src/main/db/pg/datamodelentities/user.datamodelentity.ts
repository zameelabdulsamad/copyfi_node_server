import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity('USERS')
export class UserDataModelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    USER_UID!: string;

  @Column({
    nullable: false,
  })
    USER_EMAIL!: string;

  @Column({
    nullable: false,
  })
    USER_FULLNAME!: string;

  @Column({
    nullable: false,
  })
    USER_PHONE!: string;
}
