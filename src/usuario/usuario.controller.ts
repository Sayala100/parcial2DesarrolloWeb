import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { plainToInstance } from 'class-transformer';

@Controller('usuario')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}

    @Get(':id')
    async findUsuarioById(@Param('id') id: string) {
        return await this.usuarioService.findUsuarioById(id);
    }

    @Post()
    async createUsuario(@Body() usuarioDto: UsuarioDto) {
        const usuario = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.usuarioService.createUsuario(usuario);
    }

    @Get()
    async findAllUsuarios() {
        return await this.usuarioService.findAllUsuarios();
    }
}
