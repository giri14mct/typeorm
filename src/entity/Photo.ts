import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  isUpdated: boolean;
}
