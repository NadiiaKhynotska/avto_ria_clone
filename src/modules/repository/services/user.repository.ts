import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getById(userId: string, userData: IUserData) {
    const qb = this.createQueryBuilder('user');
    qb.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
      { myId: userData.userId },
    );
    qb.where('user.id = :userId');
    qb.setParameter('userId', userId);
    return await qb.getOne();
  }
}
