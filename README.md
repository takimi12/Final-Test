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



📌 Kiedy używać it, a kiedy test?
it jest bardziej naturalne, gdy piszesz testy w stylu BDD (Behavior-Driven Development), np.:


it("renders the button correctly", () => {
  render(<Button />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
Można to czytać jak zdanie: It renders the button correctly.

test jest bardziej ogólne i często używane w standardowych testach jednostkowych:


test("renders the button correctly", () => {
  render(<Button />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
-------------------------------------------

Omówienie materiału:
1. myfolder/Omowienie
2. TDD - opisanie koncpecji tworzenia testów według test driven development

pisanie testów:
1. myfolder/05-search-github-users/02-front-end/__tests__/ ---- wszystko gotowe tylko sobie cwiczyc jak to dziala
2. Auth - przerobienie z omówienie testowania logowania ---- wszystko gotowe tylko sobie cwiczyc jak to dziala
3. handling data fetching - przerobienie z omówieniem działania mock service worker pod kątem wirtualnego api (handlery i server) ---- wszystko gotowe tylko sobie cwiczyc jak to dziala



Pozostało do przerobienia:
1. myfolde/msw Opisanie krok po kroku jak działa mock service worker --- ?????????wrócić tu ???????????? - smilda
apollo client
1. 52 graphql
2. apollo client
3. 54 query
4. 58 o co tu chodzi
5. poćwiczyć wykorzystanie shadcuin

-------------
1. dokladnie przeanalizowac odcinek 94
1. ogarnąć dzialanie hooka useUser
2. ogarnąć jak działa SWR w połączeniu z axiosem
2. myfolder/msw ------ ??????????? przeobić i opisać ??????????????
--------------
podstawowe pytanie czym jest serwer i jak sie go tworzy"
ogarnąć hooka useRepositories z folderu handling-data-fetching
konfiguracja jest i vitest - jakie pliki i gdzie lepiej umieszczac after i before# Final-Test
