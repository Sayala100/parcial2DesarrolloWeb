import internal from 'stream';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity()
export class FotoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    iso: number;

    @Column()
    valObturacion: number;

    @Column()
    apertura: number;

    @Column()
    fecha: Date;

    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
    usuario: UsuarioEntity;

}
