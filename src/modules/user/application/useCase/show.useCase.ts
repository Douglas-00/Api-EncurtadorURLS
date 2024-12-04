import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { ShowUserResponseDto } from '../../infra/dto/show/response.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class ShowUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: number): Promise<ShowUserResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toShowResponseDto(user);
  }
}
