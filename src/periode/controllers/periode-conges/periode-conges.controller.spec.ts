import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeCongesController } from './periode-conges.controller';

describe('PeriodeCongesController', () => {
  let controller: PeriodeCongesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodeCongesController],
    }).compile();

    controller = module.get<PeriodeCongesController>(PeriodeCongesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
