import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoldersModule } from './folders/folders.module';
import { database } from './config/databases';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [database] }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('db_config'),
      inject: [ConfigService],
    }),
    FoldersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
