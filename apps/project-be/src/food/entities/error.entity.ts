export class NamdoApiErrorEntity {
  static id: string;
  static method: string;
  static statusCode: number;
  static requestIp: string;
  static origin: string;
  static destination: string;
  static environment: "development" | "production" | "local";
  static createdAt: Date;
  static updatedAt: Date;

  constructor(partial: Partial<NamdoApiErrorEntity>) {
    Object.assign(this, partial);
  }
  static fromPrisma(data: any): NamdoApiErrorEntity {
    return new NamdoApiErrorEntity({
      id: data.id,
      method: data.method,
      statusCode: data.statusCode,
      requestIp: data.requestIp,
      origin: data.origin,
      destination: data.destination,
      environment: data.environment,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
