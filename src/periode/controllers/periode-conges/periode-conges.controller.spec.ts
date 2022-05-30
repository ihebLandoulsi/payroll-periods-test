import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeCongesService } from 'src/periode/services/periode-conges/periode-conges.service';
import { PeriodeCongesController } from './periode-conges.controller';

describe('PeriodeCongesController', () => {
  let controller: PeriodeCongesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodeCongesController],
      providers: [
        PeriodeCongesService,
        { provide: PeriodeCongesService, useValue: {} },
      ],
    }).compile();

    controller = module.get<PeriodeCongesController>(PeriodeCongesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
