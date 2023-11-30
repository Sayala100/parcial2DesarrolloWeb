/* eslint-disable prettier/prettier */
/* archivo: src/album/album.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
   constructor(
       @InjectRepository(AlbumEntity)
       private readonly albumRepository: Repository<AlbumEntity>
   ){}

   async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
       
    if (album.titulo == "")
       throw new BusinessLogicException("The album cannot have empty title", BusinessError.PRECONDITION_FAILED);

       return await this.albumRepository.save(album);
}

    async findAlbumById(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"] } );
        if (!album)
        throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        return album;
}

    // async addPhotoToAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {
    //     const foto: FotoEntity = await this.
    // }


   async delete(id: string) {
       const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
    
       await this.albumRepository.remove(album);
   }
}
/* archivo: src/album/album.service.ts */
