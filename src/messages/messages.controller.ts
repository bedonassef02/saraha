import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Req
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message } from "./entities/message.entity";
import { ReplaceSlugWithUserIdInterceptor } from "./interceptors/replace-slug-with-user-id.interceptor";
import { ShowUserInterceptor } from "./interceptors/show-user.interceptor";
import { Request } from "express";
import { ParseMongoIdPipe } from "../common/pipes/parse-mongo-id.pipe";

@Controller({ version: "1", path: "messages" })
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  @Post(":id")
  @UseInterceptors(ReplaceSlugWithUserIdInterceptor, ShowUserInterceptor)
  create(@Param("id") id: string, @Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll(@Req() request: any): Promise<Message[]> {
    const { id } = request.user;
    return this.messagesService.findAll(id);
  }

  @Get(":id")
  findOne(@Req() request: any, @Param("id", ParseMongoIdPipe) id: string) {
    const userId = request.user.id;
    return this.messagesService.findOne(userId, id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.messagesService.remove(+id);
  }
}
