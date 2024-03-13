import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ROLES)
export class RoleEntity extends BaseModel {
  @Column('text')
  role_name: string;

  @ManyToMany(() => UserEntity, (entity) => entity.roles)
  @JoinTable()
  users?: UserEntity[];
}
