import { Injectable, Logger } from '@nestjs/common';
import * as redis from 'redis';

@Injectable()
export class RedisService {
  private readonly redisClient: redis.RedisClientType;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

    // Cria o cliente Redis
    this.redisClient = redis.createClient({ url: redisUrl });

    // Conectar ao Redis
    this.redisClient
      .connect()
      .then(() => {
        this.logger.log('Conectado ao Redis com sucesso!');
      })
      .catch((err) => {
        this.logger.error('Erro ao conectar ao Redis', err);
      });
  }

  // Incrementa o contador de cliques
  async incrementClickCount(shortUrl: string): Promise<void> {
    await this.redisClient.incr(shortUrl);
    this.logger.log(`Contador de cliques para ${shortUrl} incrementado.`);
  }

  // Obtém o contador de cliques armazenado no Redis
  async getClickCount(shortUrl: string): Promise<number> {
    const count = await this.redisClient.get(shortUrl);
    return count ? parseInt(count, 10) : 0;
  }

  // Define o contador de cliques (se necessário)
  async setClickCount(shortUrl: string, count: number): Promise<void> {
    await this.redisClient.set(shortUrl, count);
  }

  // Verifica se o cliente está conectado ao Redis
  async isConnected(): Promise<boolean> {
    return this.redisClient.isOpen;
  }
}
