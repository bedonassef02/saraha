import { Controller, Get, Param, Delete, Req, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { PaginationFeature } from '../common/features/pagination.feature';

@Controller({ version: '1', path: 'notifications' })
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAll(
    @Req() request: any,
    @Query() paginationFeature: PaginationFeature,
  ): Promise<any> {
    const { id } = request.user;
    return this.notificationsService.findAll(id, paginationFeature);
  }

  @Delete(':id')
  async remove(@Req() request: any, @Param('id') id: string): Promise<void> {
    await this.notificationsService.remove(id);
  }
}
