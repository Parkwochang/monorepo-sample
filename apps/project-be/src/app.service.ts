import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_CONFIG } from "./config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello() {
    // const host = this.configService.get<string>("MS_HOST");
    // const port = this.configService.get<number>("MS_PORT", 3000);
    return {
      host: APP_CONFIG().host,
      port: APP_CONFIG().port,
    };
  }
}
