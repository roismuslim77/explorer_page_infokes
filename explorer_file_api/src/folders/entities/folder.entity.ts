import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('folders')
export class FolderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  parent_id: string;
}
