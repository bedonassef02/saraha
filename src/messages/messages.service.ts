import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { PaginationFeature } from '../common/features/pagination.feature';
import { PaginationResult } from '../common/types/pagination-result';
import { paginationDetails } from '../common/helpers/pagination-details';
import { FindAllMessagesResponse } from './types/find-all-messages.response';
import { Pagination } from '../common/interfaces/pagination';

@Injectable()
export class MessagesService implements Pagination {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    console.log(createMessageDto);
    return this.messageModel.create(createMessageDto);
  }

  async findAll(
    toUser: string,
    paginationFeature: PaginationFeature,
  ): Promise<FindAllMessagesResponse> {
    const messages: Message[] = await this.messageModel
      .find({ toUser })
      .skip(paginationFeature.skip)
      .limit(paginationFeature.limit);
    const pagination: PaginationResult = await this.pagination({
      toUser,
      page: paginationFeature.page,
      limit: paginationFeature.limit,
    });
    return { pagination, messages };
  }

  async pagination({ toUser, page, limit }): Promise<PaginationResult> {
    const count: number = await this.messageModel.countDocuments({ toUser });
    const pagination: PaginationResult = paginationDetails({
      count,
      page,
      limit,
    });
    return pagination;
  }

  async findOne(toUser: string, _id: string): Promise<Message> {
    const message = await this.messageModel.findOne({ toUser, _id });
    if (!message) throw new NotFoundException(`message not found`);
    return message;
  }

  async remove(id: string): Promise<void> {
    await this.messageModel.findByIdAndDelete(id);
  }
}
