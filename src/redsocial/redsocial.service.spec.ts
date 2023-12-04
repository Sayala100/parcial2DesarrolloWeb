import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialService } from './redsocial.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { RedsocialEntity } from './redsocial.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RedsocialService', () => {
  let service: RedsocialService;
  let repository: Repository<RedsocialEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedsocialService],
      imports: [
        ...TypeOrmTestingConfig()
      ],
    }).compile();

    service = module.get<RedsocialService>(RedsocialService);
    repository = module.get<Repository<RedsocialEntity>>(getRepositoryToken(RedsocialEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create redsocial ', async () => {
    const redsocial: RedsocialEntity  = new RedsocialEntity();
    redsocial.nombre = "si";
    redsocial.slogan = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
    const savedRedsocial: RedsocialEntity = await service.create(redsocial);
    expect(savedRedsocial).not.toBeNull

  });

  it('should throw an exception for an invalid redsocial', async () => {
    const redsocial: RedsocialEntity  = new RedsocialEntity();
    redsocial.nombre = "";
    redsocial.slogan = "";
    await expect(() => service.create(redsocial)).rejects.toHaveProperty("message", "The redsocial cannot have empty slogan")
  });

});
