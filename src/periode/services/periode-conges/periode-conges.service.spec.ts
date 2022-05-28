import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeCongesService } from './periode-conges.service';

describe('PeriodeCongesService', () => {
  let service: PeriodeCongesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodeCongesService],
    }).compile();

    service = module.get<PeriodeCongesService>(PeriodeCongesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
