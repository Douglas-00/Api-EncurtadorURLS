import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { CreateUserRequestDto } from '../../infra/dto/create/request.dto';
import { CreateUserResponseDto } from '../../infra/dto/create/response.dto';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(payload: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashPass = await bcrypt.hash(payload.password, 10);

    const user = UserMapper.toDomain(payload, hashPass);

    const newUser = await this.userRepository.create(user);

    return {
      id: newUser.id,
      message: 'User created successfully',
    };
  }
}
