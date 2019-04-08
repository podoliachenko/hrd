import { ReflectMetadata } from '@nestjs/common';

export const Level = (needLevel: number) => ReflectMetadata('level', needLevel);
