import { Controller } from '@nestjs/common';
import { PeriodeCongesService } from 'src/periode/services/periode-conges/periode-conges.service';
import { PeriodeController } from '../periode.controller';

@Controller('periode/conges')
export class PeriodeCongesController extends PeriodeController {
  constructor(service: PeriodeCongesService) {
    super(service);
  }
}
