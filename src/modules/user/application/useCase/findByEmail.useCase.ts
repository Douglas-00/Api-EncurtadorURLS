import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { ShowUserResponseDto } from '../../infra/dto/show/response.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<ShowUserResponseDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toFindResponseDto(user);
  }
}
