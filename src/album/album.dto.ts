import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class AlbumDto {

    @IsNotEmpty()
    fechaInicio: Date;

    @IsNotEmpty()
    fechaFin: Date;

    @IsNotEmpty()
    @IsString()
    titulo: string;
}
