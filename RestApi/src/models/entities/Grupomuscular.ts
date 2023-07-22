import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("grupomuscular", { schema: "fithub" })
export class Grupomuscular {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  Id: number;

  @Column("varchar", { name: "Nome", nullable: true, length: 50 })
  Nome: string | null;
}
