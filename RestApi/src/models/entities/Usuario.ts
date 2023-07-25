import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuariotipo } from "./Usuariotipo";

@Index("UsuariotipoId", ["UsuariotipoId"], {})
@Entity("usuario", { schema: "fithub" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  Id: number;

  @Column("varchar", { name: "Nome", nullable: true, length: 100 })
  Nome: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  Email: string | null;

  @Column("varchar", { name: "Senha", nullable: true, length: 150 })
  Senha: string | null;

  @Column("int", { name: "UsuariotipoId", nullable: true })
  UsuariotipoId: number | null;

  @ManyToOne(() => Usuariotipo, (Usuariotipo) => Usuariotipo.Usuarios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "UsuariotipoId", referencedColumnName: "Id" }])
  Usuariotipo: Usuariotipo;

  IdEnc: string;
}
