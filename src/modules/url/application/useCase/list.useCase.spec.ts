import { Test, TestingModule } from '@nestjs/testing';
import { ListUrlsUseCase } from './list.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { UrlMapper } from '../mappers/url.mapper';
import { ListUrlResponseDto } from '../../infra/dto/list/response.dto';

describe('ListUrlsUseCase', () => {
  let listUrlsUseCase: ListUrlsUseCase;

  const mockUrlRepository = {
    findAllByUserId: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  const mockUrls = [
    { id: 1, fromUrl: 'https://example.com', shortUrl: 'aZbKq7' },
    { id: 2, fromUrl: 'https://another.com', shortUrl: 'bCdF8' },
  ];

  const mockListResponseDto = [
    { fromUrl: 'https://example.com', shortUrl: 'aZbKq7', clicks: 10 },
    { fromUrl: 'https://another.com', shortUrl: 'bCdF8', clicks: 5 },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUrlsUseCase,
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

    listUrlsUseCase = module.get<ListUrlsUseCase>(ListUrlsUseCase);
  });

  it('should return a list of URLs for the user', async () => {
    const userId = 1;
    mockUrlRepository.findAllByUserId.mockResolvedValueOnce(mockUrls);
    jest
      .spyOn(UrlMapper, 'toListResponseDto')
      .mockReturnValue(mockListResponseDto as ListUrlResponseDto[]);

    await listUrlsUseCase.execute(userId);

    expect(mockUrlRepository.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(UrlMapper.toListResponseDto).toHaveBeenCalledWith(mockUrls);
  });
});
