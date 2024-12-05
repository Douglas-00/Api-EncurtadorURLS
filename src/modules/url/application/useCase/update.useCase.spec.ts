import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUrlUseCase } from './update.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { NotFoundException } from '@nestjs/common';

describe('UpdateUrlUseCase', () => {
  let updateUrlUseCase: UpdateUrlUseCase;
  let logger: AppLogger;

  const mockUrlRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUrlUseCase,
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

    updateUrlUseCase = module.get<UpdateUrlUseCase>(UpdateUrlUseCase);

    logger = module.get<AppLogger>(AppLogger);
  });

  it('should update the URL successfully when found and authorized', async () => {
    const userId = 1;
    const urlId = 1;
    const fromUrl = 'https://new-url.com';
    const url = { id: urlId, fromUrl: 'https://old-url.com' };

    mockUrlRepository.findById.mockResolvedValueOnce(url);
    mockUrlRepository.update.mockResolvedValueOnce({ id: urlId, fromUrl });

    const result = await updateUrlUseCase.execute(urlId, userId, fromUrl);

    expect(result).toEqual({ message: 'URL updated successfully' });
    expect(mockUrlRepository.findById).toHaveBeenCalledWith(urlId, userId);
    expect(mockUrlRepository.update).toHaveBeenCalledWith(urlId, fromUrl);
  });

  it('should throw NotFoundException when the URL is not found', async () => {
    const userId = 1;
    const urlId = 1;
    const fromUrl = 'https://new-url.com';
    mockUrlRepository.findById.mockResolvedValueOnce(null);

    await expect(
      updateUrlUseCase.execute(urlId, userId, fromUrl),
    ).rejects.toThrowError(NotFoundException);
    expect(logger.warn).toHaveBeenCalledWith('URL not found');
  });
});
