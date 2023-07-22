import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("usuariotipo", { schema: "fithub" })
export class Usuariotipo {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  Id: number;

  @Column("varchar", { name: "Nome", nullable: true, length: 50 })
  Nome: string | null;

  @OneToMany(() => Usuario, (Usuario) => Usuario.Usuariotipo)
  Usuarios: Usuario[];
}
