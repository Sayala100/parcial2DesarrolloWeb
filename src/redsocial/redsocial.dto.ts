import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class RedsocialDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    slogan: string;

}
