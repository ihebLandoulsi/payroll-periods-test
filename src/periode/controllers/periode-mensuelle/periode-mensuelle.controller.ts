import { Controller } from '@nestjs/common';
import { PeriodeMensuelleService } from 'src/periode/services/periode-mensuelle/periode-mensuelle.service';
import { PeriodeController } from '../periode.controller';

@Controller('periode/mensuelle')
export class PeriodeMensuelleController extends PeriodeController {
  constructor(service: PeriodeMensuelleService) {
    super(service);
  }
}
