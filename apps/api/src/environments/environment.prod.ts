import * as npm from '../../../../package.json';

export const environment = {
  production: true,
  mongodb: 'mongodb://localhost/hrd_prod',
  version: npm.version
};
