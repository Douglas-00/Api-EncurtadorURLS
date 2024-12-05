import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUrlUseCase } from './delete.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUrlUseCase', () => {
  let deleteUrlUseCase: DeleteUrlUseCase;
  let logger: AppLogger;

  const mockUrlRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUrlUseCase,
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

    deleteUrlUseCase = module.get<DeleteUrlUseCase>(DeleteUrlUseCase);

    logger = module.get<AppLogger>(AppLogger);
  });

  it('should delete the URL successfully when found', async () => {
    const userId = 1;
    const urlId = 1;
    const url = {
      id: urlId,
      fromUrl: 'https://example.com',
      shortUrl: 'aZbKq7',
    };

    mockUrlRepository.findById.mockResolvedValueOnce(url);
    mockUrlRepository.delete.mockResolvedValueOnce({});

    const result = await deleteUrlUseCase.execute(urlId, userId);

    expect(result).toEqual({ message: 'URL deleted successfully' });
    expect(mockUrlRepository.findById).toHaveBeenCalledWith(urlId, userId);
    expect(mockUrlRepository.delete).toHaveBeenCalledWith(urlId);
  });

  it('should throw NotFoundException when the URL is not found', async () => {
    const userId = 1;
    const urlId = 1;

    mockUrlRepository.findById.mockResolvedValueOnce(null);

    await expect(deleteUrlUseCase.execute(urlId, userId)).rejects.toThrowError(
      NotFoundException,
    );
    expect(logger.warn).toHaveBeenCalledWith('URL not found');
  });
});
