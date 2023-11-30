/* eslint-disable prettier/prettier */
/* archivo: src/foto/foto.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';

@Injectable()
export class fotoService {
   constructor(
       @InjectRepository(FotoEntity)
       private readonly fotoRepository: Repository<FotoEntity>
   ){}

   async findAllFotos(): Promise<FotoEntity[]> {
       return await this.fotoRepository.find({ relations: ["usuario", "album"] });
   }

   async findFotoByID(id: string): Promise<FotoEntity> {
       const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["usuario", "album"] } );
       if (!foto)
         throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
  
       return foto;
   }
  
   async create(foto: FotoEntity): Promise<FotoEntity> {
       
         if (foto.iso < 100 || foto.iso > 6400)
            throw new BusinessLogicException("The foto iso is wrong", BusinessError.PRECONDITION_FAILED);

        
        if (foto.valObturacion < 2 || foto.valObturacion > 250)
            throw new BusinessLogicException("The foto valObturacion is wrong", BusinessError.PRECONDITION_FAILED);
       
        if (foto.apertura < 1 || foto.iso > 32)
            throw new BusinessLogicException("The foto apertura is wrong", BusinessError.PRECONDITION_FAILED);
        
        const medioiso = (100+6400)/2;
        const medioobt = (2+250)/2;
        const medioap = (1+32)/2;

        if (foto.iso > medioiso && foto.valObturacion > medioobt && foto.apertura > medioap)
            throw new BusinessLogicException("The foto values are wrong", BusinessError.PRECONDITION_FAILED);

        return await this.fotoRepository.save(foto);
   }


   async deleteFoto(id: string) {
       const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
       if (!foto)
         throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
    
       await this.fotoRepository.remove(foto);
   }
}
/* archivo: src/foto/foto.service.ts */
