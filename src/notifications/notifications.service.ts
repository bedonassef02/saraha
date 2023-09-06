import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Notification } from "./entities/notification.entity";
import { Model } from "mongoose";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>
  ) {
  }

  @OnEvent("message.receive")
  async create({ fromUser, userId }): Promise<void> {
    const message = `you received a new message from ${fromUser === "Unknown" ? "Unknown user" : fromUser}`;
    await this.notificationModel.create({ user: userId, message });
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
