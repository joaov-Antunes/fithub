import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercicio } from "./Exercicio";

@Entity("exerciciotipo", { schema: "fithub" })
export class Exerciciotipo {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  Id: number;

  @Column("varchar", { name: "Nome", nullable: true, length: 50 })
  Nome: string | null;

  @OneToMany(() => Exercicio, (Exercicio) => Exercicio.ExercicioTipo)
  Exercicios: Exercicio[];
}
