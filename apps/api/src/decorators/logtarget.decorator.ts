import { ReflectMetadata } from '@nestjs/common';

export const LogTarget = (target: Function) => ReflectMetadata('logTarget', target);
