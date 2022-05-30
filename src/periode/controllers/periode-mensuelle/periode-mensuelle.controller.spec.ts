import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeMensuelleService } from 'src/periode/services/periode-mensuelle/periode-mensuelle.service';
import { PeriodeMensuelleController } from './periode-mensuelle.controller';

describe('PeriodeMensuelleController', () => {
  let controller: PeriodeMensuelleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodeMensuelleController],
      providers: [
        PeriodeMensuelleService,
        { provide: PeriodeMensuelleService, useValue: {} },
      ],
    }).compile();

    controller = module.get<PeriodeMensuelleController>(PeriodeMensuelleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
