// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as npm from '../../../../package.json';

export const environment = {
  production: false,
  mongodb: 'mongodb://localhost/hrd',
  version: npm.version
};
