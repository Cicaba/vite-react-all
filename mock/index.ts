import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import common from './common/index'

export function setupProdMockServer(): void {
  createProdMockServer([...common])
}