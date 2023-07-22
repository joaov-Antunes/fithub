import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exerciciotipo } from "./Exerciciotipo";

@Index("ExercicioTipoId", ["ExercicioTipoId"], {})
@Entity("exercicio", { schema: "fithub" })
export class Exercicio {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  Id: number;

  @Column("varchar", { name: "Nome", nullable: true, length: 50 })
  Nome: string | null;

  @Column("int", { name: "ExercicioTipoId", nullable: true })
  ExercicioTipoId: number | null;

  @ManyToOne(() => Exerciciotipo, (Exerciciotipo) => Exerciciotipo.Exercicios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ExercicioTipoId", referencedColumnName: "Id" }])
  ExercicioTipo: Exerciciotipo;
}
