import { PaginationResult } from '../../common/types/pagination-result';
import { Notification } from '../entities/notification.entity';

export type FindAllNotificationsResponse = {
  pagination: PaginationResult;
  notifications: Notification[];
};
