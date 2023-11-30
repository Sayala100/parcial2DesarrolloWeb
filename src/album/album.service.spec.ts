import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingConfig()
      ],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
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
