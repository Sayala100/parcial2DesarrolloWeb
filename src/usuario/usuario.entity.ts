import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RedsocialEntity } from '../redsocial/redsocial.entity';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
   fotos: FotoEntity[];

   @ManyToOne(() => RedsocialEntity, redsocial => redsocial.usuarios)
   redsocial: RedsocialEntity;
}
