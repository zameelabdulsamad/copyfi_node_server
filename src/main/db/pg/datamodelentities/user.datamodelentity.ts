import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';
import { PrintJobDataModelEntity } from './printjob.datamodelentity';

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

  @OneToMany(() => PrintJobDataModelEntity, (USER_PRINTJOB) => USER_PRINTJOB.PRINTJOB_USER)
    USER_PRINTJOB!: PrintJobDataModelEntity[];
}
