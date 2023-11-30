import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedsocialModule } from './redsocial/redsocial.module';
import { AlbumModule } from './album/album.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album/album.entity';
import { FotoEntity } from './foto/foto.entity';
import { RedsocialEntity } from './redsocial/redsocial.entity';
import { UsuarioEntity } from './usuario/usuario.entity';

@Module({
  imports: [RedsocialModule, AlbumModule, FotoModule, UsuarioModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database:'music',
    entities: [AlbumEntity, FotoEntity, UsuarioEntity, RedsocialEntity],
    synchronize: true,
    dropSchema: true,
    keepConnectionAlive: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

