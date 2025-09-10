import { createParamDecorator, ExecutionContext, Injectable, Logger, SetMetadata } from '@nestjs/common';
import { camelCase, snakeCase } from 'es-toolkit/compat';

interface DataObj {
  [key: string]: any;
}

type Arg = DataObj | DataObj[] | string | number | boolean | null | undefined;

@Injectable()
export class CaseTransformService {
  private readonly logger = new Logger(CaseTransformService.name);

  toSnakeCase(data: Arg) {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.toSnakeCase(item));
    }

    if (typeof data === 'object' && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          acc[snakeCase(key)] = this.toSnakeCase(data[key]);
        } else {
          acc[snakeCase(key)] = data[key];
        }

        return acc;
      }, {});
    }

    return data;
  }

  toCamelCase(data: Arg) {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.toCamelCase(item));
    }

    if (typeof data === 'object' && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          acc[camelCase(key)] = this.toCamelCase(data[key]);
        } else {
          acc[camelCase(key)] = data[key];
        }

        return acc;
      }, {});
    }

    return data;
  }

  logTransformation(methodName: string, before: any, after: any) {
    this.logger.debug(`[${methodName}] Transformed:`, {
      before: JSON.stringify(before).substring(0, 100),
      after: JSON.stringify(after).substring(0, 100),
    });
  }
}

// 클래스형 데코레이터 팩토리
// export function TransformToSnakeCase(options?: { logTransform?: boolean }) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     const transformService = new CaseTransformService();

//     descriptor.value = function (...args: any[]) {
//       // 첫 번째 인자를 snake_case로 변환 (보통 body 데이터)
//       const transformedArgs = args.map((arg, index) => {
//         if (index === 0 && arg && typeof arg === 'object') {
//           const transformed = transformService.toSnakeCase(arg);

//           if (options?.logTransform) {
//             transformService.logTransformation(propertyKey, arg, transformed);
//           }

//           return transformed;
//         }
//         return arg;
//       });

//       return originalMethod.apply(this, transformedArgs);
//     };

//     return descriptor;
//   };
// }

// 간단한 함수형 버전도 제공
export const TransformToSnakeCase = (data: any): any => {
  const service = new CaseTransformService();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    SetMetadata('request', data);
    // console.log('test', indices);
    return service.toSnakeCase(data);
  };
};

export const BodySnakeCase = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const body = request.body;
  const query = request.query;
  console.log('asdasdasdasdasdasd', body, query);

  if (body && typeof body === 'object') {
    const caseTransform = new CaseTransformService();
    return caseTransform.toSnakeCase(body);
  }

  if (query && typeof query === 'object') {
    const caseTransform = new CaseTransformService();
    return caseTransform.toSnakeCase(query);
  }

  return body;
});

export const TransformToCamelCase = (data: any): any => {
  const service = new CaseTransformService();
  return service.toCamelCase(data);
};
