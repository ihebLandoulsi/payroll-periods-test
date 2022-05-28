import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeMensuelleService } from './periode-mensuelle.service';

describe('MensuellePeriodeService', () => {
  let service: PeriodeMensuelleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodeMensuelleService],
    }).compile();

    service = module.get<PeriodeMensuelleService>(PeriodeMensuelleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
