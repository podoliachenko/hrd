import { SetMetadata } from '@nestjs/common';

export const Level = (needLevel: number) => SetMetadata('level', needLevel);
