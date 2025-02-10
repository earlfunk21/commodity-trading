import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  private pendingCachePromises: Map<string, Promise<any>> = new Map();
  private logger = new Logger(CachingService.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly configService: ConfigService,
  ) {}

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async get<T>(key: string): Promise<T | null> {
    return this.cache.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async fetch<T>(
    key: string,
    ttl: number,
    fetchFn: () => Promise<T>,
  ): Promise<T> {
    // Check if there is a pending promise for the same key
    if (this.pendingCachePromises.has(key)) {
      return this.pendingCachePromises.get(key) as Promise<T>;
    }

    const ENV = this.configService.getOrThrow('ENV');

    // Check if data is already cached
    const cachedValue = await this.cache.get<T>(key);
    if (cachedValue) {
      if (ENV === 'development') {
        this.logger.log('Cache hit for key: ', key);
      }
      return cachedValue;
    }

    // Fetch data and cache it
    const fetchPromise = fetchFn()
      .then(async (result) => {
        if (ENV === 'development') {
          this.logger.log('Cache miss for key: ', key);
        }
        if (result) {
          await this.cache.set(key, result, ttl);
        }
        this.pendingCachePromises.delete(key);
        return result;
      })
      .catch((error) => {
        this.pendingCachePromises.delete(key);
        throw error;
      });

    // Store the fetch promise in the map
    this.pendingCachePromises.set(key, fetchPromise);
    return fetchPromise;
  }
}
