import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderEntity } from './entities/folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create_folder.dto';

@Injectable()
export class FoldersService {
    constructor(@InjectRepository(FolderEntity) private repo: Repository<FolderEntity>) {}

    private async populateChildren(folder: FolderEntity) {
        const children = await this.repo.find({ where: { parent_id: folder.id } });

        return {
          id: folder.id,
          name: folder.name,
          children: await Promise.all(children.map(child => this.populateChildren(child)))
        };
    }

    async findAllRoots() {
        const roots = await this.repo
        .createQueryBuilder('folders')
        .where('folders.parent_id IS NULL')
        .getMany();

        return Promise.all(roots.map((folder) => this.populateChildren(folder)));
    }

    async findChildren(id: string) {
        const roots = await this.repo.find({ where: { parent_id: id } });
        return Promise.all(roots.map((folder) => this.populateChildren(folder)));
    }

    async createFolder(dto: CreateFolderDto) {
        const folder = new FolderEntity();
        folder.name = dto.name;
        folder.parent_id = dto.parent_id;
      
        if (dto.parent_id == "") {
          folder.parent_id = null
        } 
      
        return this.repo.save(folder);
    }
}
