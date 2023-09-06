import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationFeature {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;

  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
