import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FolderEntity } from './entities/folder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FolderEntity]),
  ],
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
