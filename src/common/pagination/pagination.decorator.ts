import { PaginationPipe } from '@/common/pagination/pagination.pipe';
import { applyDecorators, UsePipes } from '@nestjs/common';

export function Pagination() {
  return applyDecorators(UsePipes(PaginationPipe));
}
