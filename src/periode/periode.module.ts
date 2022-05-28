import { Module } from '@nestjs/common';
import { PeriodeMensuelleService } from './services/periode-mensuelle/periode-mensuelle.service';
import { PeriodeCongesService } from './services/periode-conges/periode-conges.service';
import { PeriodeCongesController } from './controllers/periode-conges/periode-conges.controller';
import { PeriodeMensuelleController } from './controllers/periode-mensuelle/periode-mensuelle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodeMensuelle } from './entities/PeriodeMensuelle.entity';
import { PeriodeConges } from './entities/periodeConges.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodeMensuelle, PeriodeConges])],
  controllers: [PeriodeCongesController, PeriodeMensuelleController],
  providers: [PeriodeMensuelleService, PeriodeCongesService],
})
export class PeriodeModule {}
