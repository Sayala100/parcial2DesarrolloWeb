import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class FotoDto {

    @IsNotEmpty()
    iso: number;

    @IsNotEmpty()
    valObturacion: number;

    @IsNotEmpty()
    apertura: number;

    @IsNotEmpty()
    fecha: Date;

}
