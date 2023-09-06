import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageModel.create(createMessageDto);
  }

  async findAll(toUser: string): Promise<Message[]> {
    return this.messageModel.find({ toUser });
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
