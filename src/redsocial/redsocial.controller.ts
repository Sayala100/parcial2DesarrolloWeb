import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RedsocialService } from './redsocial.service';
import { RedsocialDto } from './redsocial.dto';
import { plainToInstance } from 'class-transformer';
import { RedsocialEntity } from './redsocial.entity';

@Controller('redsocial')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedsocialController {
    constructor(private readonly redsocialService: RedsocialService){}

    @Post()
    async createRedsocial(@Body() redsocialDto: RedsocialDto) {
        const redsocial = plainToInstance(RedsocialEntity, redsocialDto);
        return await this.redsocialService.create(redsocial);
    }

}
