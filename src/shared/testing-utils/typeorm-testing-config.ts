import {TypeOrmModule} from '@nestjs/typeorm';
import { AlbumEntity } from '../../album/album.entity';
import { FotoEntity } from '../../foto/foto.entity';
import { RedsocialEntity } from '../../redsocial/redsocial.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [AlbumEntity, FotoEntity, UsuarioEntity, RedsocialEntity],
    synchronize: true,
    dropSchema: true,
    keepConnectionAlive: true
}),
TypeOrmModule.forFeature([AlbumEntity, FotoEntity, UsuarioEntity, RedsocialEntity])
];