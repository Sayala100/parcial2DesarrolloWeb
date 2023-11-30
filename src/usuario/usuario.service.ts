import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
   constructor(
       @InjectRepository(UsuarioEntity)
       private readonly usuarioRepository: Repository<UsuarioEntity>
   ){}

   async findAllUsuarios(): Promise<UsuarioEntity[]> {
       return await this.usuarioRepository.find({ relations: ["fotos", "redsocial"] });
   }

   async findUsuarioById(id: string): Promise<UsuarioEntity> {
       const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["fotos", "redsocial"] } );
       if (!usuario)
         throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
  
       return usuario;
   }
  
   async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
       
         if (usuario.telefono.length != 10)
            throw new BusinessLogicException("The usuario telefono is not correct", BusinessError.PRECONDITION_FAILED);

            return await this.usuarioRepository.save(usuario);
   }


}
/* archivo: src/usuario/usuario.service.ts */
