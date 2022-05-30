import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePeriodeDto } from 'src/periode/dto/create-periode.dto';
import { UpdatePeriodeDto } from 'src/periode/dto/update-periode.dto';
import { PeriodeConges } from 'src/periode/entities/periodeConges.entity';
import { PeriodeMensuelle } from 'src/periode/entities/PeriodeMensuelle.entity';
import { CustomDateOperations } from 'src/utils/customDateOperations';
import { PeriodeCongesService } from './periode-conges.service';

class PeriodeCongesMockRepository {
  create(periodeLike): PeriodeConges {
    return new PeriodeConges();
  }

  save(periode: PeriodeConges | PeriodeConges[]): Promise<PeriodeConges | PeriodeConges[]> {
    return Promise.resolve(periode);
  }

  find(): Promise<Array<PeriodeConges>> {
    return Promise.resolve([]);
  }

  findOne(options): Promise<PeriodeConges> {
    const periode = new PeriodeConges();
    periode.id = options.id;
    return Promise.resolve(periode);
  }

  remove({ id }): Promise<PeriodeConges> {
    const periode = new PeriodeConges();
    periode.id = id;
    return Promise.resolve(periode);
  }
}

describe('PeriodeCongesService', () => {
  let service: PeriodeCongesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeriodeCongesService,
        {
          provide: getRepositoryToken(PeriodeConges),
          useClass: PeriodeCongesMockRepository,
        },
      ],
    }).compile();

    service = module.get<PeriodeCongesService>(PeriodeCongesService);
  });

  it('should call create method with expected params', () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreatePeriodeDto();
    service.create(dto);
    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('should call bulk method with expected params', () => {
    const bulkSpy = jest.spyOn(service, 'bulk');
    const dto = new CreatePeriodeDto();
    service.create(dto);
    expect(bulkSpy).toHaveBeenCalledWith(dto);
  });

  it('should call update method with expected params', () => {
    const updateSpy = jest.spyOn(service, 'update');
    const dto = new UpdatePeriodeDto();
    const id = 'periodeCongesID';
    service.update(id, dto);
    expect(updateSpy).toHaveBeenCalledWith(dto);
  });

  it('should call remove method with expected params', () => {
    const deletePeriodeSpy = jest.spyOn(service, 'remove');
    const periodeId = 'periodeId';
    service.remove(periodeId);
    expect(deletePeriodeSpy).toHaveBeenCalledWith(periodeId);
  });

  describe('when calling checkPeriodeCongesInsideMensuelle', () => {
    let periodeMensuelle: PeriodeMensuelle;
    let periodeConges: PeriodeConges;
    const year = 2022;
    const month = 4;
    beforeEach(() => {
      periodeMensuelle = new PeriodeMensuelle();
      periodeMensuelle.startDate = new Date(year, month);
      periodeMensuelle.endDate = CustomDateOperations.lastDayOfThatMonth(
        periodeMensuelle.startDate,
      );
      periodeConges = new PeriodeConges();
    });
    describe('and periodeConges is not entirely inside periode mensuelle', () => {
      it('should return true', () => {
        periodeConges.startDate = new Date(year, month, 12);
        periodeConges.endDate = new Date(year, month + 2, 5);
        expect(
          service.checkPeriodeCongesInsideMensuelle(
            periodeConges,
            periodeMensuelle,
          ),
        ).toBe(false);
      });
    });
    describe('and periodeConges is entirely inside periode mensuelle', () => {
      it('should return false', () => {
        periodeConges.startDate = new Date(year, month, 12);
        periodeConges.endDate = new Date(year, month, 16);
        expect(
          service.checkPeriodeCongesInsideMensuelle(
            periodeConges,
            periodeMensuelle,
          ),
        ).toBe(true);
      });
    });
  });

  it('should call generateCongesPeriodePerMensuelle and return list of periods', () => {
    const periodeConges = new PeriodeConges();
    periodeConges.startDate = new Date();
    periodeConges.endDate = new Date(
      new Date().setMonth(new Date().getMonth() + 2),
    );
    const generatedPeriodes =
      service.generatePeriodeCongesPerMensuelle(periodeConges);
    expect(Array.isArray(generatedPeriodes)).toBe(true);
    expect(generatedPeriodes).toHaveLength(3);
  });
});
