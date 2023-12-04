import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingConfig()
      ],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a foto', async () => {
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 101;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    const savedFoto: FotoEntity = await service.create(foto);
    expect(savedFoto).not.toBeNull

  });

  it('should not create a foto', async () => {
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 0;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    await expect(()=> service.create(foto)).rejects.toHaveProperty('message', 'The foto iso is wrong');


  });

  it('delete should remove a foto', async () => {
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 101;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    const savedFoto: FotoEntity = await service.create(foto);
    await service.deleteFoto(foto.id);
  
    const deleted: FotoEntity = await repository.findOne({ where: { id: foto.id } })
    expect(deleted).toBeNull();
  });
  
  it('delete should throw an exception for an invalid foto', async () => {
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 101;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    const savedFoto: FotoEntity = await service.create(foto);

    await service.deleteFoto(foto.id);
    await expect(() => service.deleteFoto("0")).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });

  it('should find all fotos', async () => {
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 101;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    const savedFoto: FotoEntity = await service.create(foto);
    const fotos: FotoEntity[] = await service.findAllFotos();
    let tamano = fotos.length;
    expect(tamano).toBeGreaterThan(0);
  });

  it('should find a foto by id', async () => {
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 101;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    const savedFoto: FotoEntity = await service.create(foto);
    const fotoById: FotoEntity = await service.findFotoByID(savedFoto.id);
    expect(fotoById).toEqual(savedFoto);
  });

  it('should throw an exception for an invalid foto', async () => {
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 101;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    const savedFoto: FotoEntity = await service.create(foto);
    await expect(() => service.findFotoByID("0")).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });




  

});
