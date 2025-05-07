import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create_folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get('tree')
  getAllTree() {
    return this.foldersService.findAllRoots();
  }

  @Get(':id/children')
  getChildren(@Param('id') id: string) {
    return this.foldersService.findChildren(id);
  }

  @Post()
  create(@Body() dto: CreateFolderDto) {
    return this.foldersService.createFolder(dto);
  }
}
