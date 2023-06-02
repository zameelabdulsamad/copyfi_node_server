import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,
} from 'typeorm';
import { UserDataModelEntity } from './user.datamodelentity';

@Entity('PRINTJOB')
export class PrintJobDataModelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    PRINTJOB_UID!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
    PRINTJOB_TIME!: Date;

  @Column({
    type: 'simple-array',
    nullable: false,
  })
    PRINTJOB_FILE!: string[];

  @ManyToOne(() => UserDataModelEntity, (PRINTJOB_USER) => PRINTJOB_USER.USER_PRINTJOB, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
    PRINTJOB_USER!: UserDataModelEntity;
}
