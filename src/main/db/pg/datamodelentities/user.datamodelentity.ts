import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity('USERS')
export class UserDataModelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    USER_UID!: string;

  @Column({
    nullable: true,
  })
    USER_EMAIL!: string;

  @Column({
    nullable: true,
  })
    USER_FULLNAME!: string;

  @Column({
    nullable: true,
  })
    USER_PHONE!: string;
}
