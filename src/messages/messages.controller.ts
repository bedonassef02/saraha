import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { ReplaceSlugWithUserIdInterceptor } from './interceptors/replace-slug-with-user-id.interceptor';
import { ShowUserInterceptor } from './interceptors/show-user.interceptor';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { ReceiveMessageInterceptor } from "./interceptors/receive-message.interceptor";


@Controller({ version: '1', path: 'messages' })
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post(':id')
  @UseInterceptors(
    ReplaceSlugWithUserIdInterceptor,
    ShowUserInterceptor,
    ReceiveMessageInterceptor,
  )
  create(
    @Param('id') id: string,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll(@Req() request: any): Promise<Message[]> {
    const { id } = request.user;
    return this.messagesService.findAll(id);
  }

  @Get(':id')
  findOne(
    @Req() request: any,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<Message> {
    const userId = request.user.id;
    return this.messagesService.findOne(userId, id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    await this.messagesService.remove(id);
  }
}
