// import { createZodDto } from 'nestjs-zod/dto';
// import z from 'zod';

// // ----------------------------------------------------------------------
// // Base Schemas & Common Validations
// // ----------------------------------------------------------------------

// const BaseEntitySchema = z.object({
//   id: z.number().positive(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// const PaginationSchema = z.object({
//   page: z
//     .string()
//     .optional()
//     .transform((val) => (val ? Math.max(1, parseInt(val)) : 1)),
//   limit: z
//     .string()
//     .optional()
//     .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val))) : 10)),
// });

// const SearchSchema = z.object({
//   search: z.string().optional(),
// });

// // ----------------------------------------------------------------------
// // Food Specific Schemas
// // ----------------------------------------------------------------------

// const FoodBaseSchema = z.object({
//   name: z.string().min(1, '음식 이름을 입력해주세요').max(100),
//   description: z.string().min(1, '음식 설명을 입력해주세요').max(500),
//   imageUrl: z.string().url('올바른 이미지 URL을 입력해주세요'),
//   ingredientId: z.number().positive('올바른 재료 ID를 입력해주세요'),
//   utensilId: z.number().positive('올바른 도구 ID를 입력해주세요'),
// });

// const FoodCreateSchema = FoodBaseSchema;
// const FoodUpdateSchema = FoodBaseSchema.partial().extend({
//   id: z.number().positive('올바른 음식 ID를 입력해주세요'),
// });
// const FoodResponseSchema = FoodBaseSchema.extend(BaseEntitySchema.shape);

// const FoodListQuerySchema = PaginationSchema.merge(SearchSchema).extend({
//   ingredientId: z
//     .string()
//     .optional()
//     .transform((val) => (val ? parseInt(val) : undefined)),
//   utensilId: z
//     .string()
//     .optional()
//     .transform((val) => (val ? parseInt(val) : undefined)),
//   sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('createdAt'),
//   sortOrder: z.enum(['asc', 'desc']).default('desc'),
// });

// // ----------------------------------------------------------------------
// // Base DTO Class with Common Methods
// // ----------------------------------------------------------------------

// abstract class BaseDto {
//   static validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
//     return schema.parse(data);
//   }

//   static safeParse<T>(schema: z.ZodSchema<T>, data: unknown) {
//     return schema.safeParse(data);
//   }

//   static getErrors<T>(schema: z.ZodSchema<T>, data: unknown) {
//     const result = schema.safeParse(data);
//     return result.success ? null : result.error.issues;
//   }
// }

// // ----------------------------------------------------------------------
// // Food DTO Namespace
// // ----------------------------------------------------------------------

// export namespace Food {
//   // Create DTO
//   export class CreateDto extends createZodDto(FoodCreateSchema) {
//     static readonly schema = FoodCreateSchema;

//     static validate(data: unknown) {
//       return BaseDto.validate(this.schema, data);
//     }

//     static safeParse(data: unknown) {
//       return BaseDto.safeParse(this.schema, data);
//     }

//     // 비즈니스 로직 메서드
//     static hasValidImage(dto: z.infer<typeof FoodCreateSchema>): boolean {
//       return dto.imageUrl.startsWith('https://');
//     }

//     static createSlug(dto: z.infer<typeof FoodCreateSchema>): string {
//       return dto.name
//         .toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^a-z0-9-]/g, '');
//     }
//   }

//   // Update DTO
//   export class UpdateDto extends createZodDto(FoodUpdateSchema) {
//     static readonly schema = FoodUpdateSchema;

//     static validate(data: unknown) {
//       return BaseDto.validate(this.schema, data);
//     }

//     static partialUpdate(id: number, updates: Partial<z.infer<typeof FoodBaseSchema>>) {
//       return this.validate({ id, ...updates });
//     }
//   }

//   // Response DTO
//   export class ResponseDto extends createZodDto(FoodResponseSchema) {
//     static readonly schema = FoodResponseSchema;

//     static from(data: unknown) {
//       return BaseDto.validate(this.schema, data);
//     }

//     static fromArray(dataArray: unknown[]) {
//       return dataArray.map((data) => this.from(data));
//     }

//     static toSummary(dto: z.infer<typeof FoodResponseSchema>) {
//       return {
//         id: dto.id,
//         name: dto.name,
//         imageUrl: dto.imageUrl,
//       };
//     }
//   }

//   // List Query DTO
//   export class ListQueryDto extends createZodDto(FoodListQuerySchema) {
//     static readonly schema = FoodListQuerySchema;

//     static validate(data: unknown) {
//       return BaseDto.validate(this.schema, data);
//     }

//     static getOffset(dto: z.infer<typeof FoodListQuerySchema>) {
//       return (dto.page - 1) * dto.limit;
//     }

//     static hasFilters(dto: z.infer<typeof FoodListQuerySchema>) {
//       return !!(dto.search || dto.ingredientId || dto.utensilId);
//     }
//   }

//   // Types
//   export type Create = z.infer<typeof FoodCreateSchema>;
//   export type Update = z.infer<typeof FoodUpdateSchema>;
//   export type Response = z.infer<typeof FoodResponseSchema>;
//   export type ListQuery = z.infer<typeof FoodListQuerySchema>;
// }

// // ----------------------------------------------------------------------
// // Food Option DTO (별도 네임스페이스)
// // ----------------------------------------------------------------------

// const FoodOptionSchema = z.object({
//   foodId: z.number().positive(),
//   origin: z.string().min(1, '원산지를 입력해주세요'),
//   name: z.string().min(1, '옵션 이름을 입력해주세요'),
//   reason: z.string().min(1, '사유를 입력해주세요'),
//   cause: z.string().min(1, '원인을 입력해주세요'),
//   environment: z.enum(['development', 'production', 'local']),
//   price: z.number().min(0, '가격은 0 이상이어야 합니다').optional(),
//   isActive: z.boolean().default(true),
// });

// export namespace FoodOption {
//   export class CreateDto extends createZodDto(FoodOptionSchema) {
//     static readonly schema = FoodOptionSchema;

//     static validate(data: unknown) {
//       return BaseDto.validate(this.schema, data);
//     }

//     static isProduction(dto: z.infer<typeof FoodOptionSchema>) {
//       return dto.environment === 'production';
//     }

//     static calculateTotalPrice(dto: z.infer<typeof FoodOptionSchema>, basePrice: number) {
//       return basePrice + (dto.price || 0);
//     }

//     static formatForDisplay(dto: z.infer<typeof FoodOptionSchema>) {
//       return {
//         title: `${dto.name} (${dto.origin})`,
//         description: `${dto.reason} - ${dto.cause}`,
//         environment: dto.environment.toUpperCase(),
//         status: dto.isActive ? 'ACTIVE' : 'INACTIVE',
//         pricing: dto.price ? `+$${dto.price}` : 'Free',
//       };
//     }
//   }

//   export type Create = z.infer<typeof FoodOptionSchema>;
// }

// // ----------------------------------------------------------------------
// // Composition DTO (여러 DTO 조합)
// // ----------------------------------------------------------------------

// const FoodWithOptionsSchema = FoodResponseSchema.extend({
//   options: z.array(FoodOptionSchema.extend(BaseEntitySchema.shape)),
// });

// export namespace FoodWithOptions {
//   export class ResponseDto extends createZodDto(FoodWithOptionsSchema) {
//     static readonly schema = FoodWithOptionsSchema;

//     static from(data: unknown) {
//       return BaseDto.validate(this.schema, data);
//     }

//     static getActiveOptions(dto: z.infer<typeof FoodWithOptionsSchema>) {
//       return dto.options.filter((option) => option.isActive);
//     }

//     static getTotalPrice(dto: z.infer<typeof FoodWithOptionsSchema>, basePrice: number) {
//       const optionsPrice = dto.options
//         .filter((option) => option.isActive)
//         .reduce((sum, option) => sum + (option.price || 0), 0);
//       return basePrice + optionsPrice;
//     }
//   }

//   export type Response = z.infer<typeof FoodWithOptionsSchema>;
// }

// // ----------------------------------------------------------------------
// // 사용 예시
// // ----------------------------------------------------------------------

// /*
// // 1. Controller에서 사용
// @Controller('foods')
// export class FoodController {
//   @Post()
//   async create(@Body() dto: Food.CreateDto) {
//     const validated = Food.CreateDto.validate(dto);

//     if (!Food.CreateDto.hasValidImage(validated)) {
//       throw new BadRequestException('HTTPS 이미지 URL이 필요합니다');
//     }

//     const slug = Food.CreateDto.createSlug(validated);
//     return this.foodService.create(validated, slug);
//   }

//   @Get()
//   async findAll(@Query() query: Food.ListQueryDto) {
//     const validated = Food.ListQueryDto.validate(query);
//     const offset = Food.ListQueryDto.getOffset(validated);

//     return this.foodService.findAll(validated, offset);
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() updates: Partial<Food.Create>) {
//     const validated = Food.UpdateDto.partialUpdate(+id, updates);
//     return this.foodService.update(validated);
//   }

//   @Post(':id/options')
//   async addOption(@Param('id') id: string, @Body() dto: FoodOption.CreateDto) {
//     const validated = FoodOption.CreateDto.validate({ ...dto, foodId: +id });

//     if (FoodOption.CreateDto.isProduction(validated)) {
//       // 프로덕션 환경 검증 로직
//     }

//     return this.foodService.addOption(validated);
//   }
// }

// // 2. Service에서 사용
// @Injectable()
// export class FoodService {
//   async create(data: Food.Create, slug: string): Promise<Food.Response> {
//     const created = await this.repository.create({ ...data, slug });
//     return Food.ResponseDto.from(created);
//   }

//   async findWithOptions(id: number): Promise<FoodWithOptions.Response> {
//     const food = await this.repository.findWithOptions(id);
//     const result = FoodWithOptions.ResponseDto.from(food);

//     const activeOptions = FoodWithOptions.ResponseDto.getActiveOptions(result);
//     const totalPrice = FoodWithOptions.ResponseDto.getTotalPrice(result, 10000);

//     return { ...result, activeOptionsCount: activeOptions.length, totalPrice };
//   }
// }
// */
