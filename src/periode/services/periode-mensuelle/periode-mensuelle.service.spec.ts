import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePeriodeDto } from 'src/periode/dto/create-periode.dto';
import { UpdatePeriodeDto } from 'src/periode/dto/update-periode.dto';
import { PeriodeMensuelle } from 'src/periode/entities/PeriodeMensuelle.entity';
import { PeriodeMensuelleService } from './periode-mensuelle.service';

class PeriodeMensuelleMockRepository {
  create(periodeLike): PeriodeMensuelle {
    return new PeriodeMensuelle();
  }

  save(periode: PeriodeMensuelle): Promise<PeriodeMensuelle> {
    return Promise.resolve(periode);
  }

  find(): Promise<Array<PeriodeMensuelle>> {
    return Promise.resolve([]);
  }

  findOne(options): Promise<PeriodeMensuelle> {
    const periode = new PeriodeMensuelle();
    periode.id = options.id;
    return Promise.resolve(periode);
  }

  softRemove({ id }): Promise<PeriodeMensuelle> {
    const periode = new PeriodeMensuelle();
    periode.id = id;
    return Promise.resolve(periode);
  }
}

describe('MensuellePeriodeService', () => {
  let service: PeriodeMensuelleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeriodeMensuelleService,
        {
          provide: getRepositoryToken(PeriodeMensuelle),
          useClass: PeriodeMensuelleMockRepository,
        },
      ],
    }).compile();

    service = module.get<PeriodeMensuelleService>(PeriodeMensuelleService);
  });

  it('should call create method with expected params', () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreatePeriodeDto();
    service.create(dto);
    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('should call update method with expected params', () => {
    const updateSpy = jest.spyOn(service, 'update');
    const dto = new UpdatePeriodeDto();
    const id = 'PeriodeMensuelleID';
    service.update(id, dto);
    expect(updateSpy).toHaveBeenCalledWith(id,dto);
  });

  it('should call remove method with expected params', () => {
    const deletePeriodeSpy = jest.spyOn(service, 'remove');
    const periodeId = 'periodeId';
    service.remove(periodeId);
    expect(deletePeriodeSpy).toHaveBeenCalledWith(periodeId);
  });
});
