import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedsocialModule } from './redsocial/redsocial.module';
import { AlbumModule } from './album/album.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [RedsocialModule, AlbumModule, FotoModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

