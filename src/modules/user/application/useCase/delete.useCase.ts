import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { DeleteUserResponseDto } from '../../infra/dto/delete/response.dto';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: number): Promise<DeleteUserResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(userId);

    return {
      message: 'User deleted successfully',
    };
  }
}
