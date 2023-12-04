import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';
import { plainToInstance } from 'class-transformer';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';


@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
        constructor(private readonly albumService: AlbumService){}

    @Get(':id')
    async findAlbumById(@Param('id') id: string) {
        return await this.albumService.findAlbumById(id);
    }

    @Post()
    async createAlbum(@Body() albumDto: AlbumDto) {
        const album = plainToInstance(AlbumEntity, albumDto);
        return await this.albumService.createAlbum(album);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteAlbum(@Param('id') id: string) {
        return await this.albumService.deleteAlbum(id);
    }

    @Put(':id')
    async addPhotoToAlbum(@Param('id') id: string, @Body() foto: FotoEntity) {
        const album = await this.albumService.findAlbumById(id);
        return await this.albumService.addPhotoToAlbum(album, foto);
    }
    


}
