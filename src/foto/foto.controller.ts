import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { FotoService } from './foto.service';
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto.entity';
import { plainToInstance } from 'class-transformer';


@Controller('foto')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
    constructor(private readonly fotoService: FotoService){}

    @Get(':id')
    async findFotoById(@Param('id') id: string) {
        return await this.fotoService.findFotoByID(id);
    }

    @Post()
    async createFoto(@Body() fotoDto: FotoDto) {
        const foto = plainToInstance(FotoEntity, fotoDto);
        return await this.fotoService.create(foto);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteFoto(@Param('id') id: string) {
        return await this.fotoService.deleteFoto(id);
    }

    @Get()
    async findAllFotos() {
        return await this.fotoService.findAllFotos();
    }
}
