import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
export class UserModelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    user_uid!: string;

  @Column({
    nullable: true,
  })
    user_email!: string;

  @Column({
    nullable: true,
  })
    user_fullname!: string;

  @Column({
    nullable: true,
  })
    user_phone!: string;
}
