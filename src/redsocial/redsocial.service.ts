/* eslint-disable prettier/prettier */
/* archivo: src/redsocial/redsocial.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RedsocialEntity } from './redsocial.entity';

@Injectable()
export class RedsocialService {
   constructor(
       @InjectRepository(RedsocialEntity)
       private readonly redsocialRepository: Repository<RedsocialEntity>
   ){}
  
   async create(redsocial: RedsocialEntity): Promise<RedsocialEntity> {
       
         if (redsocial.slogan == "")
            throw new BusinessLogicException("The redsocial cannot have empty slogan", BusinessError.PRECONDITION_FAILED);


        
        if (redsocial.slogan.length < 20)
            throw new BusinessLogicException("The redsocial slogan is to small", BusinessError.PRECONDITION_FAILED);
       
            return await this.redsocialRepository.save(redsocial);
   }

}
/* archivo: src/redsocial/redsocial.service.ts */
