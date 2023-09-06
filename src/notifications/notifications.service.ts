import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Notification } from "./entities/notification.entity";
import { Model } from "mongoose";
import { UsersService } from "../users/users.service";
import { PaginationFeature } from "../common/features/pagination.feature";
import { paginationDetails } from "../common/helpers/pagination-details";
import { PaginationResult } from "../common/types/pagination-result";
import { Pagination } from "../common/interfaces/pagination";
import { FindAllNotificationsResponse } from "./types/find-all-notifications.response";

@Injectable()
export class NotificationsService implements Pagination {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    private readonly usersService: UsersService
  ) {
  }

  @OnEvent("email.signIn")
  async handleSignInEvent({ email }): Promise<void> {
    const user: any = await this.usersService.findByEmail(email);
    const message =
      "Someone has logged into your saraha account. If this was not you, please change your password immediately.";
    await this.notificationModel.create({ user: user._id, message });
  }

  @OnEvent("message.receive")
  async create({ fromUser, userId }): Promise<void> {
    const message = `you received a new message from ${
      fromUser === "Unknown" ? "Unknown user" : fromUser
    }`;
    await this.notificationModel.create({ user: userId, message });
  }

  async findAll(
    user: string,
    paginationFeature: PaginationFeature
  ): Promise<FindAllNotificationsResponse> {
    const notifications: Notification[] = await this.notificationModel
      .find({ user })
      .skip(paginationFeature.skip)
      .limit(paginationFeature.limit);

    const pagination: PaginationResult = await this.pagination({
      user,
      page: paginationFeature.page,
      limit: paginationFeature.limit
    });
    return { pagination, notifications };
  }

  async pagination({ user, page, limit }): Promise<PaginationResult> {
    const count: number = await this.notificationModel.countDocuments({ user });
    const pagination: PaginationResult = paginationDetails({
      count,
      page,
      limit
    });
    return pagination;
  }

  async remove(id: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(id);
  }
}
