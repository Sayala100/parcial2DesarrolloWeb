import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class UsuarioDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;

}
