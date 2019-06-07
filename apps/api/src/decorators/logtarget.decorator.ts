import { SetMetadata } from '@nestjs/common';

export const LogTarget = (target: Function) => SetMetadata('logTarget', target);
