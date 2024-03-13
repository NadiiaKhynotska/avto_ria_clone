import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

import { AccountTypeEnum } from '../enums/account-type.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { AdvertisementEntity } from './advertisement.entity';
import { CarEntity } from './car.entity';
import { BaseModel } from './models/base.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RoleEntity } from './role.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column({
    type: 'enum',
    enum: AccountTypeEnum,
    default: AccountTypeEnum.BASE,
  })
  accountType: AccountTypeEnum;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => AdvertisementEntity, (entity) => entity.user)
  advertisements?: AdvertisementEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];

  @ManyToMany(() => RoleEntity, (entity) => entity.users)
  roles?: RoleEntity[];
}
