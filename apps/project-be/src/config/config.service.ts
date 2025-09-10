// import { Transport } from '@nestjs/microservices';
// import { ConfigService as Config } from '@nestjs/config'

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = {};

  constructor(/* private config: Config, */) {
    this.envConfig.service = {
      // transport: Transport.TCP,
      options: {
        host: process.env.MS_HOST as string,
        port: process.env.MS_PORT ?? 3000,
      },
    } as const;
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
