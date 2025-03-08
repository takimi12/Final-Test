1. npm create vite@latest
2. enter
3. starter (enter)
4. react + typescript
5. cd starter
6. npm i
6. npm install vitest --save-dev
7. w package json script    "test":"vitest"
8. npm i @testing-library/react @testing-library/jest-dom --save-dev
9. npm i jsdom @testing-library/user-event --save-dev
10. plik vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    envionment: 'jsdom',
  }
})
11. tworzymy plik vitest.setup.ts
import {expect,afterEach} from 'vitest'
import {cleanup} from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'


expect.extend(matchers);

afterEach(() => {
    cleanup()
})
12. poprawiamy vite.config.ts

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals:true,
    environment: 'jsdom',
    setupFiles:'./src/vitest.setup.ts',
  }
})
13. tsconfig.app.json 
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "incremental": true, 
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
14. tsconfig.node.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "incremental": true,
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

