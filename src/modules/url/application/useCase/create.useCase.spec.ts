import { Test, TestingModule } from '@nestjs/testing';
import { CreateUrlUseCase } from './create.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { NotFoundException } from '@nestjs/common';
import { UrlMapper } from '../mappers/url.mapper';

describe('CreateUrlUseCase', () => {
  let createUrlUseCase: CreateUrlUseCase;

  let logger: AppLogger;

  const mockUrlRepository = {
    findUserById: jest.fn(),
    create: jest.fn(),
    updateUser: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUrlUseCase,
        {
          provide: 'UrlPrismaRepository',
          useValue: mockUrlRepository,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    createUrlUseCase = module.get<CreateUrlUseCase>(CreateUrlUseCase);

    logger = module.get<AppLogger>(AppLogger);
  });

  it('should create a new URL when the user exists', async () => {
    const payload = { fromUrl: 'https://example.com' };
    const userId = 1;
    const shortUrl = 'aZbKq7';

    jest.spyOn(UrlMapper, 'generateShortUrl').mockReturnValueOnce(shortUrl);

    mockUrlRepository.findUserById.mockResolvedValueOnce(true);
    mockUrlRepository.create.mockResolvedValueOnce({ shortUrl });

    const result = await createUrlUseCase.execute(payload, userId);

    expect(result).toEqual({ shortUrl });
    expect(mockUrlRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(mockUrlRepository.create).toHaveBeenCalledWith(
      payload.fromUrl,
      shortUrl,
    );
  });

  it('should throw NotFoundException when user is not found', async () => {
    const payload = { fromUrl: 'https://example.com' };
    const userId = 1;

    mockUrlRepository.findUserById.mockResolvedValueOnce(null);

    await expect(
      createUrlUseCase.execute(payload, userId),
    ).rejects.toThrowError(NotFoundException);
    expect(logger.warn).toHaveBeenCalledWith('User not found');
  });
});
