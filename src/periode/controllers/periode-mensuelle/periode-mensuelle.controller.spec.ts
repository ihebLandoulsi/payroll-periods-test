import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeMensuelleController } from './periode-mensuelle.controller';

describe('PeriodeMensuelleController', () => {
  let controller: PeriodeMensuelleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodeMensuelleController],
    }).compile();

    controller = module.get<PeriodeMensuelleController>(PeriodeMensuelleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
