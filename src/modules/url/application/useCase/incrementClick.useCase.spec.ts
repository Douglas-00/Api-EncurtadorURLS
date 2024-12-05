import { Test, TestingModule } from '@nestjs/testing';
import { IncrementClickUseCase } from './IncrementClick.useCase';
import { RedisService } from 'src/modules/redis/redis.service';
import { AppLogger } from 'src/modules/logger/logger.service';

describe('IncrementClickUseCase', () => {
  let incrementClickUseCase: IncrementClickUseCase;

  const mockUrlRepository = {
    findByShortUrl: jest.fn(),
    updateClicks: jest.fn(),
  };

  const mockRedisService = {
    incrementClickCount: jest.fn(),
    getClickCount: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncrementClickUseCase,
        {
          provide: 'UrlPrismaRepository',
          useValue: mockUrlRepository,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    incrementClickUseCase = module.get<IncrementClickUseCase>(
      IncrementClickUseCase,
    );
  });

  it('should increment the click count and update the URL in the database', async () => {
    const shortUrl = 'aZbKq7';
    const url = { id: 1, fromUrl: 'https://example.com', shortUrl };
    const clickCount = 5;

    mockRedisService.incrementClickCount.mockResolvedValueOnce(undefined);
    mockRedisService.getClickCount.mockResolvedValueOnce(clickCount);
    mockUrlRepository.findByShortUrl.mockResolvedValueOnce(url);
    mockUrlRepository.updateClicks.mockResolvedValueOnce({});

    const result = await incrementClickUseCase.execute(shortUrl);

    expect(result).toEqual({
      fromUrl: 'https://example.com',
      shortUrl: 'aZbKq7',
      clicks: clickCount,
    });
    expect(mockRedisService.incrementClickCount).toHaveBeenCalledWith(shortUrl);
    expect(mockUrlRepository.findByShortUrl).toHaveBeenCalledWith(shortUrl);
    expect(mockUrlRepository.updateClicks).toHaveBeenCalledWith(
      url.id,
      clickCount,
    );
  });
});
