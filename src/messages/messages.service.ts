import { Injectable } from '@nestjs/common';
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

  findOne(toUser: string, _id: string) {
    return this.messageModel.findOne({ toUser, _id });
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
