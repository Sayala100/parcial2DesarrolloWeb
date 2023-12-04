import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from '../foto/foto.entity';
import { FotoService } from '../foto/foto.service';

describe('AlbumService', () => {
  let service: AlbumService;
  let service1: FotoService;
  let repository: Repository<AlbumEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingConfig()
      ],
      providers: [AlbumService, FotoService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    service1 = module.get<FotoService>(FotoService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create album ', async () => {
    const album: AlbumEntity  = new AlbumEntity();
    album.fechaInicio = new Date();
    album.fechaFin = new Date();
    album.titulo = "si";
    album.fotos = []
    const savedAlbum: AlbumEntity = await service.createAlbum(album);
    expect(savedAlbum).not.toBeNull

  });

  it('should throw an exception for an invalid album', async () => {
    const album: AlbumEntity  = new AlbumEntity();
    album.fechaInicio = new Date();
    album.fechaFin = new Date();
    album.titulo = "";
    album.fotos = []
    await expect(() => service.createAlbum(album)).rejects.toHaveProperty("message", "The album cannot have empty title")
  });

  it('should find album by id', async () => {
    const album: AlbumEntity  = new AlbumEntity();
    album.fechaInicio = new Date();
    album.fechaFin = new Date();
    album.titulo = "si";
    album.fotos = []
    const savedAlbum: AlbumEntity = await service.createAlbum(album);
    const foundAlbum: AlbumEntity = await service.findAlbumById(album.id);
    expect(foundAlbum).toEqual(savedAlbum);
  });

  it('should throw an exception for an invalid album id', async () => {
    await expect(() => service.findAlbumById("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });

  it ('should add photo to album', async () => {
    const album: AlbumEntity  = new AlbumEntity();
    album.fechaInicio = new Date();
    album.fechaFin = new Date();
    album.titulo = "si";
    album.fotos = []
    const savedAlbum: AlbumEntity = await service.createAlbum(album);
    const foto: FotoEntity  = new FotoEntity();
    foto.iso = 101;
    foto.valObturacion = 200;
    foto.apertura = 5;
    foto.fecha = new Date();
    foto.album = null;
    foto.usuario = null;
    const savedFoto: FotoEntity = await service1.create(foto);
    const albumWithPhoto: AlbumEntity = await service.addPhotoToAlbum(savedAlbum, savedFoto);
    expect(albumWithPhoto.fotos).toContain(savedFoto);
  }
  );

  it('should throw an exception for an invalid photo', async () => {
    const album: AlbumEntity  = new AlbumEntity();
    album.fechaInicio = new Date();
    album.fechaFin = new Date();
    album.titulo = "si";
    album.fotos = []
    const savedAlbum: AlbumEntity = await service.createAlbum(album);
    await expect(() => service.addPhotoToAlbum(savedAlbum, null)).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });



  it('delete should remove a album', async () => {
    const album: AlbumEntity  = new AlbumEntity();
    album.fechaInicio = new Date();
    album.fechaFin = new Date();
    album.titulo = "si";
    album.fotos = []
    const savedAlbum: AlbumEntity = await service.createAlbum(album);
    await service.deleteAlbum(album.id);
  
    const deleted: AlbumEntity = await repository.findOne({ where: { id: album.id } })
    expect(deleted).toBeNull();
  });
  
  it('delete should throw an exception for an invalid album', async () => {
    const album: AlbumEntity  = new AlbumEntity();
    album.fechaInicio = new Date();
    album.fechaFin = new Date();
    album.titulo = "si";
    album.fotos = []
    const savedAlbum: AlbumEntity = await service.createAlbum(album);

    await service.deleteAlbum(album.id);
    await expect(() => service.deleteAlbum("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });
  


});
