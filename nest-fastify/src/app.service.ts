import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService
  ) { 
    this.redisService.getClient().set('counter', 1)
   }

  async getRedis(): Promise<string> {
    const client = this.redisService.getClient();
    const value = await client.get("counter");
    return value;
  }

  getStatic() {
    return { ok: true };
  }

  fibo(n: number) {
    if (n < 2) return 1;
    else return this.fibo(n - 2) + this.fibo(n - 1);
  }
}
