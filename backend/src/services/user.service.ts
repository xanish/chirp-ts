import BaseService from './base.service.js';
import { Prisma } from '@prisma/client';
import { ApplicationError } from '../errors/application.error.js';
import { ParsedCursorPaginationParams } from '../utils/types/parsed-cursor-pagination-params.type.js';

export class UserService extends BaseService {
  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({ data });

    // todo: trigger verify user mail

    return user;
  }

  async findMany(
    where: Prisma.UserWhereInput,
    pagination: ParsedCursorPaginationParams,
    orderBy: Prisma.UserOrderByWithRelationInput = { createdAt: 'desc' }
  ) {
    const { limit, offset } = pagination;

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
      where: where,
      take: limit,
      skip: offset ? 1 : undefined,
      cursor: offset ? { id: offset } : undefined,
      orderBy: orderBy,
    });

    return users;
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        city: true,
        country: true,
        birthDate: true,
        _count: {
          select: {
            tweets: true,
            followers: true,
            following: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      where: where,
    });

    if (user) {
      // need to remap inputs since for prisma following is basically
      // where current user is following someone (aka followers)
      [user._count.followers, user._count.following] = [
        user._count.following,
        user._count.followers,
      ];

      return user;
    }

    throw new ApplicationError('User not found', 404);
  }

  async findOneForAuth(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where: where,
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        isVerified: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user) {
      return user;
    }

    throw new ApplicationError('User not found', 404);
  }

  async update(
    data: Prisma.UserUpdateInput,
    where: Prisma.UserWhereUniqueInput
  ) {
    return await this.prisma.user.update({ data, where });
  }
}
