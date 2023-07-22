import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("treino", { schema: "fithub" })
export class Treino {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  Id: number;

  @Column("int", { name: "GrupoMuscularId", nullable: true })
  GrupoMuscularId: number | null;

  @Column("int", { name: "UsuarioId", nullable: true })
  UsuarioId: number | null;
}
