import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
      imports: [
        ...TypeOrmTestingConfig()
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create usuario ', async () => {
    const usuario: UsuarioEntity  = new UsuarioEntity();
    usuario.nombre = "si";
    usuario.telefono = "1234567890";
    usuario.fotos = []
    usuario.redsocial = null;
    const savedUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(savedUsuario).not.toBeNull

  });

  it('should throw an exception for an invalid usuario', async () => {
    const usuario: UsuarioEntity  = new UsuarioEntity();
    usuario.nombre = "";
    usuario.telefono = "";
    usuario.fotos = []
    usuario.redsocial = null;
    await expect(() => service.createUsuario(usuario)).rejects.toHaveProperty("message", "The usuario telefono is not correct")
  });

  it('should find usuario by id', async () => {
    const usuario: UsuarioEntity  = new UsuarioEntity();
    usuario.nombre = "si";
    usuario.telefono = "1234567890";
    usuario.fotos = []
    usuario.redsocial = null;
    const savedUsuario: UsuarioEntity = await service.createUsuario(usuario);
    const foundUsuario: UsuarioEntity = await service.findUsuarioById(usuario.id);

    expect(foundUsuario).not.toBeNull
  });

  it('should throw an exception for an invalid usuario id', async () => {
    await expect(() => service.findUsuarioById("")).rejects.toHaveProperty("message", "The usuario with the given id was not found")
  });

  it ('should find all usuarios', async () => {
    const usuario: UsuarioEntity  = new UsuarioEntity();
    usuario.nombre = "si";
    usuario.telefono = "1234567890";
    usuario.fotos = []
    usuario.redsocial = null;
    const savedUsuario: UsuarioEntity = await service.createUsuario(usuario);
    const foundUsuarios: UsuarioEntity[] = await service.findAllUsuarios();

    expect(foundUsuarios).not.toBeNull
  }
  );

});
