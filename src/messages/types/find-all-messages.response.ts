import { PaginationResult } from '../../common/types/pagination-result';
import { Message } from '../entities/message.entity';

export type FindAllMessagesResponse = {
  pagination: PaginationResult;
  messages: Message[];
};
