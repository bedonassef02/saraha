import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { configSchemaValidation } from "./common/validation/config-schema.validation";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ expandVariables: true, validationSchema: configSchemaValidation }),
    DatabaseModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
