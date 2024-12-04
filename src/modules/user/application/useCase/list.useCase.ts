import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { ListUserResponseDto } from '../../infra/dto/list/response.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class ListUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<ListUserResponseDto[]> {
    const users = await this.userRepository.list();

    return UserMapper.toListResponseDto(users);
  }
}
