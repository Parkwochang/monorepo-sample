import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CaseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Request: camelCase → snake_case
    if (request.body) {
      request.body = this.camelToSnake(request.body);
    }
    if (request.query) {
      request.query = this.camelToSnake(request.query);
    }
    if (request.params) {
      request.params = this.camelToSnake(request.params);
    }

    return next.handle().pipe(
      // Response: snake_case → camelCase (선택사항)
      map((data) => {
        if (data && typeof data === 'object') {
          return this.snakeToCamel(data);
        }
        return data;
      }),
    );
  }

  private camelToSnake(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.camelToSnake(item));
    }

    if (typeof obj === 'object' && obj.constructor === Object) {
      const result: any = {};

      Object.keys(obj).forEach((key) => {
        const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        result[snakeKey] = this.camelToSnake(obj[key]);
      });

      return result;
    }

    return obj;
  }

  private snakeToCamel(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.snakeToCamel(item));
    }

    if (typeof obj === 'object' && obj.constructor === Object) {
      const result: any = {};

      Object.keys(obj).forEach((key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelKey] = this.snakeToCamel(obj[key]);
      });

      return result;
    }

    return obj;
  }
}
