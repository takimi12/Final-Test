1. Szybkość
Vitest: Jest znacznie szybszy niż Jest, ponieważ wykorzystuje Vite jako swój bundler i system uruchamiania testów. Dzięki temu testy są wykonywane szybciej, zwłaszcza w trybie watch.
Jest: Jest wolniejszy, ponieważ używa JSDOM i własnego bundlera, co może być kosztowne pod względem wydajności.


Środowisko testowe
Vitest: Domyślnie używa Node.js i oferuje możliwość konfiguracji JSDOM.
Jest: Domyślnie działa w środowisku JSDOM, co może być bardziej przydatne przy testowaniu aplikacji frontendowych.

5. Obsługa TypeScript
Vitest: Ma natywną obsługę TypeScript bez potrzeby dodatkowej konfiguracji.
Jest: Wymaga ts-jest lub babel-jest, aby dobrze działać z TypeScript.

6. Wsparcie dla ESM
Vitest: Ma lepszą obsługę ESM (ECMAScript Modules), co jest zgodne z nowoczesnymi standardami.
Jest: Nadal jest głównie oparty na CommonJS, chociaż obsługa ESM się poprawia.

7. 
✅ container jest przydatny, gdy chcesz manipulować strukturą DOM ręcznie, np. używać querySelector().
✅ screen (z React Testing Library) jest lepszy w testach dostępności i czytelności, np.:
logRoles(container) pochodzi z React Testing Library (@testing-library/dom) i służy do wyświetlenia w konsoli wszystkich ról dostępnościowych (ARIA roles), które posiadają elementy w container.

8. 
przykład utworzneia funkcji mokującej 
  const mockOnSubmit = vi.fn();
Jak działa mockClear()?
Metoda mockClear() jest częścią API dla funkcji mockujących (takich jak vi.fn() w Vitest lub jest.fn() w Jest) i jest stosowana do czyszczenia historii wywołań danej funkcji mockującej. Oznacza to, że po jej wywołaniu wszystkie informacje dotyczące poprzednich wywołań (takie jak liczba wywołań, argumenty przekazane do funkcji, wartości zwrócone itp.) zostaną usunięte, a funkcja będzie gotowa do ponownego śledzenia wywołań.

await user.selectOptions(ratingSelect, '5'); to wywołanie metody w kontekście testów, które służy do symulowania wyboru opcji w elemencie formularza (np. w select), przy użyciu biblioteki do testowania, takiej jak user-event. W tym przypadku jest to część procesu interakcji z formularzem lub interfejsem użytkownika w testach.

toBeInTheDocument() jest używane do sprawdzenia, czy dany element jest obecny w DOM (czyli, czy znajduje się na stronie po renderowaniu komponentu).
toHaveBeenCalled() jest używane do sprawdzania, czy funkcja została wywołana w trakcie testu.


Inicjalizacja obiektu user: userEvent.setup() zwraca obiekt, który umożliwia symulowanie akcji użytkownika w testach, takich jak:

selectOptions symuluje wybór opcji w elemencie <select>.

toHaveBeenCalled to matcher dostępny w Jest, używany do sprawdzania, czy dana funkcja (np. mockowana) została wywołana w trakcie testu.

vi.mock('../components/ItemCard', () => ({ default: () => <article>item card</article> }));
to funkcja mockująca (vi.mock) w Vitest, która zastępuje rzeczywistą implementację komponentu ItemCard prostym zamiennikiem.

-------------
## JSON Server

[JSON Server](https://www.npmjs.com/package/json-server)

```bash
npm install json-server

```

create a db.json file

db.json

```json
"posts": [
    {
      "id": "1",
      "title": "testing library",
      "likes": 10
    },
    {
      "id": "2",
      "title": "node ts course",
      "likes": 8
    }
  ]
```

default port is 3000

```bash
npx json-server db.json --port 4000
```

package.json

```json
"scripts": {
  "server": "json-server db.json --port 4000"
}
```

`http://localhost:4000/posts`

GET /posts
GET /posts/:id
POST /posts
PUT /posts/:id
PATCH /posts/:id
DELETE /posts/:id

----------------------------------

ChatGPT powiedział:
Mock Service Worker (MSW) to biblioteka do przechwytywania i symulowania żądań HTTP w aplikacjach frontendowych i backendowych. Jest szczególnie popularna w testowaniu aplikacji React, ale działa również z innymi frameworkami.

Główne cechy MSW:
Przechwytywanie żądań HTTP – zamiast wysyłać żądania do prawdziwego API, MSW przechwytuje je i zwraca symulowane odpowiedzi.
Działa w przeglądarce i Node.js – w przeglądarce wykorzystuje Service Workera, a w środowisku Node.js działa przez interceptory HTTP.
Realistyczne symulacje API – pozwala odwzorować różne scenariusze, np. błędy serwera, opóźnienia czy odpowiedzi zwracające określone statusy.
Łatwiejsze testowanie – zamiast mockować poszczególne funkcje fetch lub axios, MSW działa na poziomie rzeczywistych żądań.


📌 Podstawowe narzędzie do testowania:
vitest – silnik testów (podobny do Jest), który działa dobrze z Vite i Reactem.
📌 Biblioteki do testowania komponentów Reacta:
@testing-library/react – główna biblioteka do testowania komponentów Reacta, umożliwia renderowanie komponentów w testach.
@testing-library/jest-dom – dodaje niestandardowe asercje do jest/vitest, np. expect(element).toBeVisible().
@testing-library/user-event – symuluje interakcje użytkownika, np. kliknięcia, wpisywanie tekstu.
📌 Środowisko testowe dla DOM:
jsdom – symuluje przeglądarkę w środowisku Node.js, dzięki czemu testy mogą działać bez rzeczywistego okna przeglądarki.
📌 Mockowanie API:
msw (Mock Service Worker) – pozwala na symulowanie żądań API w testach jednostkowych i integracyjnych.
Czy wszystkie są wymagane?
✅ Minimalny zestaw do testowania komponentów Reacta to:

vitest
@testing-library/react
@testing-library/jest-dom
✅ Jeśli chcesz testować interakcje użytkownika, dodaj:

@testing-library/user-event
✅ Jeśli Twoje komponenty pobierają dane z API, przydatne będzie:

msw (do mockowania zapytań HTTP)
✅ Jeśli testujesz w środowisku Node.js (bez rzeczywistej przeglądarki), jsdom jest potrzebne.

Jeśli planujesz tylko podstawowe testy komponentów, możesz zacząć od vitest, @testing-library/react i @testing-library/jest-dom, a resztę dodać w razie potrzeby. 


--
folder mocks

 Plik handlers.ts
export const handlers = [];
To plik, w którym definiuje się "handler'y" do przechwytywania i mockowania zapytań sieciowych (np. do API).

 Plik server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

export default server;
setupServer(...handlers) – tworzy serwer testowy, który przechwytuje żądania zgodnie z regułami z handlers.ts.
export default server; – eksportuje ten serwer, aby można było go użyć w testach.
Normalnie w testach (np. w setupTests.ts) dodajesz coś takiego:

import server from './mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

beforeAll(() => server.listen());  // Uruchamia przechwytywanie żądań przed testami
afterEach(() => server.resetHandlers());  // Resetuje zmiany w handlerach po każdym teście
afterAll(() => server.close());  // Wyłącza serwer po zakończeniu testów
Dzięki temu testy nie wykonują prawdziwych zapytań HTTP, tylko dostają symulowane odpowiedzi.
----
Plik vitest.setup.ts zawiera konfigurację dla testów w Vitest i zapewnia odpowiednie środowisko do testowania komponentów React oraz mockowania API. Oto co robi poszczególne linie kodu:

 Importowanie potrzebnych funkcji

import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import server from './mocks/server';
expect – służy do asercji w testach (np. expect(element).toBeVisible()).
afterEach – wykonuje kod po każdym teście.
beforeAll / afterAll – kod uruchamiany przed wszystkimi testami i po nich.
cleanup – usuwa elementy testowe ze środowiska, aby nie wpływały na kolejne testy.
matchers – dodaje dodatkowe asercje z @testing-library/jest-dom (np. toBeVisible()).
server – importuje msw serwer mockujący API.
----------
vite.config.ts

Plik vite.config.ts to konfiguracja dla Vite, która definiuje ustawienia dla budowania aplikacji oraz testowania w Vitest. Oto, co robi ten kod:


mportowanie modułów

import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
path – wbudowany moduł Node.js do obsługi ścieżek plików.
react() – plugin dla Vite, który dodaje wsparcie dla Reacta.
defineConfig() – funkcja Vitest/Vite, która pomaga w definicji konfiguracji.


///////////////////////////
✅ it → Jeśli piszesz testy w stylu BDD (Behavior Driven Development), ponieważ it lepiej oddaje intencję.
✅ test → Jeśli chcesz być bardziej neutralny i trzymać się konwencji test().
🤝 Nie ma technicznych różnic, możesz używać ich zamiennie.

👉 Rekomendacja: W projektach React/Frontend zazwyczaj preferuje się it, bo jest bardziej czytelne
7. wewnatrz asercjji mozna robic operacje
expect(2*2).toBe(4)


## Vitest

In your command line, create a new Vite project and choose the React with TypeScript option.

```bash
npm create vite@latest
```

Next, open up the integrated terminal and install Vitest.

```bash
npm install vitest --save-dev
```

Add the test script to your package.json:

```json
"scripts": {
    "test": "vitest"
  },
```

Create a test file, e.g., random.test.ts, in your project. Make sure you add the suffix "test" — in my case, I will do it in the src directory.

```ts

## React Testing Library

Since we want to test our React components, we need to install React Testing Library and other dependencies. Stop the test by pressing Ctrl + C and install the following dependencies:

```bash
# Core testing utilities for React components
npm install @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event --save-dev
```

`@testing-library/react` - Core testing utilities for React components
`@testing-library/jest-dom` - Custom matchers to simplify assertions
`jsdom` - Simulates a browser-like environment for tests to run in Node.js
`@testing-library/user-event` - Simulates user interactions (clicks, typing, etc.) in tests

Add the test object to vite.config.ts:


```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
```

If you have red squiggly lines in your vite.config.ts file, no worries — it’s because we are using TypeScript, and we will fix it very soon.

After that, we want to create a setup file. In the root directory, create vitest.setup.ts and add the following code:

src/vitest.setup.ts

```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

Make some changes in the vite.config.ts file:

```ts
// Import defineConfig from vitest/config
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Enable global variables for testing
    globals: true,
    // Use jsdom as the environment
    environment: 'jsdom',
    // Path to the setup file
    setupFiles: './src/vitest.setup.ts',
  },
});
```

We also need to add the following code to our tsconfig.app.json file, which allows us to use Vitest's global functions like describe, it, and expect without needing to import them explicitly. If you’re wondering about the @testing-library/jest-dom, it’s because we want to use the custom matchers provided by the library globally as well.

tsconfig.app.json

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```


React Testing Library Query Methods

When testing your components, quite often you will need to query the DOM to find specific elements. One of the most commonly used options is search based on text content. Another option is search based on the role of the element, which we will cover later.

getByText, queryByText, findByText, getAllByText, queryAllByText, findAllByText

Here are the key differences between these React Testing Library query methods:

Get vs Query vs Find

- getBy...

  - Throws error if element not found
  - Returns single element
  - Use when element should exist

- queryBy...

  - Returns null if element not found
  - Returns single element
  - Use when testing element should NOT exist

- findBy...

  - Returns Promise
  - Retries until element found or timeout
  - Use for async elements

Single vs All

- Single Element Methods

  - getByText, queryByText, findByText
  - Returns single element
  - Throws if multiple matches found

- Multiple Element Methods

  - getAllByText, queryAllByText, findAllByText
  - Returns array of elements
  - Use when expecting multiple matches

- create test file
  ./src/tutorial/01-search-by-text/Sandbox.test.tsx

  - test whether heading renders correctly
  - use `getByText` to find exact match "React Testing Library Examples"
  - verify heading exists in document

- test whether paragraph with phone number renders correctly
  - use `getByText` with regex pattern `/\d{3}-\d{3}-\d{4}/`
  - verify phone number text exists in document
- test whether error message is initially absent
  - use `queryByText` to check for "Error message"
  - verify element does not exist in document
- test whether multiple list items render correctly
  - use `getAllByText` to find all elements with text "Item 1"
  - verify exactly 3 items are present
- test whether async message appears after delay
  - use `findByText` to wait for "Async message" to appear
  - verify message exists in document after async operation


  W Jest (framework testowy dla JavaScript), matcher .toHaveLength() służy do sprawdzania, czy długość tablicy, łańcucha znaków lub innego obiektu z właściwością length jest zgodna z oczekiwaną wartością.

//////////////////
test driven development
To, co opisujesz, to klasyczny przykład TDD (Test-Driven Development) w praktyce – piszemy testy przed napisaniem kodu.

🔍 Jak działa ten proces?
1️⃣ Piszesz test, który powinien sprawdzać określoną funkcjonalność

Tworzymy plik testowy Sandbox.test.tsx, który testuje, czy w komponencie znajduje się nagłówek (h1).
Wykorzystujemy React Testing Library do renderowania komponentu i wyszukiwania tekstu.
Test musi początkowo się nie powieść (RED), ponieważ komponent jeszcze nie istnieje lub nie spełnia założeń.


import { render, screen } from '@testing-library/react';
import Sandbox from './Sandbox';

describe('02-tdd-example', () => {
  test('should render header', () => {
    render(<Sandbox />);
    const heading = screen.getByText(/testing/i);
    expect(heading).toBeInTheDocument();
  });
});

 Tworzysz minimalny kod, aby test przeszedł

Tworzymy komponent Sandbox.tsx, ale nie dodajemy jeszcze nagłówka.
Test nadal powinien się nie powieść (RED), bo nagłówka h1 nadal nie ma.


function Sandbox() {
  return <div>Sandbox</div>;
}
export default Sandbox;



Dodajesz brakujący kod, aby test przeszedł (GREEN)

Teraz dodajemy nagłówek h1 do komponentu.
Test powinien teraz przejść (GREEN), bo warunek jest spełniony.

function Sandbox() {
  return (
    <div>
      <h1>React Testing Library Examples</h1>
    </div>
  );
}
export default Sandbox;

 Podsumowanie – cykl TDD
1️⃣ RED – Napisz test, który początkowo się nie powiedzie.
2️⃣ GREEN – Napisz minimalny kod, aby test przeszedł.
3️⃣ REFACTOR – Popraw kod, zachowując przechodzące testy.

TDD to świetna praktyka w React + TypeScript, bo pomaga tworzyć solidne i dobrze przetestowane komponenty. 🚀


/////////////////////////////////

So far we have learned about search by text content methods, which find elements by their visible content, just like users would read them but there is another option, often superior, which is search by role. I will discuss why search by role is superior in a moment for now let's learn about the different query methods.

getByRole and getByText are widely used because they closely mirror how users interact with your application. getByText is intuitive as it finds elements by their visible content, just like users would read them. However, getByRole is often superior because it ensures your app is accessible - it works with the same ARIA roles that screen readers use.

In short queryByRole is superior to queryByText because it ensures your app is accessible.
If you

getByRole, queryByRole, findByRole, getAllByRole, queryAllByRole, findAllByRole

### 1. getBy... Methods

```typescript
const button = screen.getByRole('button');
```

- Returns a single element
- Throws an error immediately if no element is found
- Throws if multiple elements match
- Use when you expect the element to be in the DOM

### 2. queryBy... Methods

```typescript
const button = screen.queryByRole('button');
```

- Returns a single element
- Returns `null` if no element is found (doesn't throw)
- Throws if multiple elements match
- Best for asserting elements are NOT present

### 3. findBy... Methods

```typescript
const button = await screen.findByRole('button');
```

- Returns a Promise that resolves to a single element
- Retries the query until element is found or timeout (default 1000ms)
- Rejects if no element found after timeout
- Perfect for testing async elements

### 4. getAllBy... Methods

```typescript
const buttons = screen.getAllByRole('button');
```

- Returns an array of elements
- Throws if no elements found
- Can return multiple elements
- Use when expecting multiple matching elements

### 5. queryAllBy... Methods

```typescript
const buttons = screen.queryAllByRole('button');
```

- Returns an array of elements
- Returns empty array if no elements found
- Can return multiple elements
- Good for checking elements don't exist

### 6. findAllBy... Methods

```typescript
const buttons = await screen.findAllByRole('button');
```

- Returns a Promise that resolves to an array of elements
- Retries until elements found or timeout
- Rejects if no elements found after timeout
- Use for async elements when expecting multiple matches




expect(screen.getByRole('link', {name: 'Home'}))

<a href="/" aria-label="Home">🏠</a>

 Bez { name: 'Home' } – getByRole('link') znajdzie pierwszy element <a> na stronie, ale jeśli masz wiele <a>, nie wiadomo, który zostanie wybrany.
🔹 Z { name: 'Home' } – getByRole('link', { name: 'Home' }) znajdzie konkretny link, którego tekst dostępnościowy to 'Home'.


<h1>Main Heading</h1>  {/* Nagłówek h1 */}
<h2>Subheading</h2>    {/* Nagłówek h2 */}

expect(screen.getbyRole('heading', {name:'Main Heading'}))
expect(screen.getbyRole('heading', {name:'Subheading'}))


<img src="example.jpg" alt="example" />
expect(screen.getbyRole('img', {name:'example'}))

 <button>Submit</button>
  <button>Cancel</button>
  <button>Reset</button>

const buttons = screen.getAllByRole('button');
 // Sprawdzenie liczby przycisków
    expect(buttons).toHaveLength(3);

    // Sprawdzenie tekstów przycisków
    expect(buttons[0]).toHaveTextContent('Submit');
    expect(buttons[1]).toHaveTextContent('Cancel');
    expect(buttons[2]).toHaveTextContent('Reset');





      <button aria-label="submit">Submit</button> {/* Przycisk z aria-label */}
      <button aria-label="cancel">Cancel</button> {/* Przycisk z aria-label */}

const buttons = screen.getAllByRole('button', {name:'submit});

///////////////////
## User Interactions

Alright, once we know how to query elements, we can start learning how to test user interactions - things like clicking, typing, selecting options, etc. We will start slowly with simple button clicks, and in the following chapter we will build a more complex example where we will test interactions like typing into input fields and other cool features. During this chapter I will introduce you to both options we have for user interactions: `userEvent` and `fireEvent` but in general `userEvent` is the best option.You can read more about the difference between `userEvent` and `fireEvent` below or utilize [this url](https://testing-library.com/docs/user-event/intro/#differences-with-fireevent)

### Why `userEvent` is Better Than `fireEvent`

While both `userEvent` and `fireEvent` can simulate user interactions in tests, `userEvent` is the better choice for a few key reasons:

1. **More Realistic**: `userEvent` simulates how real users interact with your app. For example, when a user types, they first click the input, then press keys one by one. `userEvent` follows this same pattern, while `fireEvent` just changes the value directly.

2. **Catches More Issues**: Because `userEvent` is more realistic, it can find bugs that `fireEvent` might miss. For instance, `userEvent` will fail if a button is covered by another element, just like a real user couldn't click it.

3. **Simpler to Use**: `userEvent` has clearer method names that match what users actually do, like `click()`, `type()`, and `selectOptions()`. This makes tests easier to read and write.

4. **More Complete**: `userEvent` handles many small details automatically. When you click with `userEvent`, it triggers focus events, mouse events, and more - just like a real browser would.

It's worth noting that `userEvent` is actually built on top of `fireEvent`. While `userEvent` covers most testing needs, there are some special cases where we still need to use `fireEvent` directly (like testing some specific browser events). But for most day-to-day testing, `userEvent` is the way to go.



const {container} = render(<Sandbox />)
logRoles(container)

1. const { container } = render(<Sandbox />);
render(<Sandbox />): Funkcja render renderuje komponent Sandbox w wirtualnym środowisku (tzw. virtual DOM), co pozwala na testowanie, jak komponent zachowuje się w "symulowanym" środowisku przeglądarki.

Destrukturalizacja { container }: Funkcja render zwraca obiekt, który zawiera różne właściwości. Jedną z nich jest container, która reprezentuje najwyższy element DOM komponentu Sandbox w teście. Jest to najczęściej <div> lub inny element, który jest opakowaniem dla renderowanego komponentu.

Tak więc container zawiera pełną strukturę DOM renderowanego komponentu i pozwala na manipulację lub sprawdzenie jego zawartości.

2. logRoles(container)
logRoles: Jest to funkcja z biblioteki @testing-library/react (a dokładniej, z pakietu @testing-library/user-event), która pozwala na wypisanie wszystkich ról dostępnych w danym kontenerze DOM. Funkcja ta jest bardzo pomocna, gdy chcesz zobaczyć, jakie role (np. button, link, heading, itd.) są przypisane do elementów w renderowanym komponencie.

Dlaczego używamy container: Przekazujemy container do logRoles, ponieważ ta funkcja skanuje wszystkie elementy wewnątrz kontenera DOM i wypisuje, jakie role dostępnościowe są przypisane do elementów w tym kontenerze. To jest szczególnie przydatne, gdy chcemy upewnić się, że nasze elementy mają odpowiednie role dostępnościowe.

function Sandbox() {
  return (
    <div>
      <h1>Main Heading</h1>
      <button>Click Me</button>
      <a href="#">Link</a>
    </div>
  );
}

export default Sandbox;

import { render } from '@testing-library/react';
import { logRoles } from '@testing-library/react';
import Sandbox from './Sandbox';

test('log roles in Sandbox component', () => {
  const { container } = render(<Sandbox />);
  logRoles(container);
});


fireEvent.click

import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

test('clicking the button changes the text', () => {
  render(<MyComponent />);

  // Znajdowanie przycisku w komponencie
  const button = screen.getByRole('button', { name: /click me/i });

  // Klikanie w przycisk
  fireEvent.click(button);

  // Sprawdzenie, czy tekst został zmieniony po kliknięciu
  const message = screen.getByText(/you clicked the button/i);
  expect(message).toBeInTheDocument();
});
Jak działa fireEvent.click?
screen.getByRole: Znajduje przycisk na stronie (z pomocą roli i nazwy dostępności).
fireEvent.click(button): Symuluje kliknięcie na tym przycisku.
screen.getByText: Sprawdza, czy po kliknięciu na przycisk tekst zmienił się na "You clicked the button".
Główne funkcje fireEvent
fireEvent udostępnia różne typy zdarzeń, które możemy zasymulować:

fireEvent.click – symuluje kliknięcie w element.
fireEvent.change – symuluje zmianę wartości w formularzu (np. w inputach).
fireEvent.submit – symuluje wysłanie formularza.
fireEvent.keyDown, fireEvent.keyUp, fireEvent.keyPress – symuluje wciśnięcie klawiszy na klawiaturze.


Co robi userEvent.setup()?
W skrócie, userEvent.setup() wykonuje przygotowanie, które sprawia, że symulowanie interakcji użytkownika działa zgodnie z rzeczywistością i pozwala na wywołanie akcji, które są bardziej wierne rzeczywistemu zachowaniu użytkowników.

Kiedy należy używać userEvent.setup()?
Funkcja setup() jest zalecana w przypadkach, gdy używasz React Testing Library razem z @testing-library/user-event, aby poprawić interakcje użytkownika w testach.

Zanim zaczniesz używać metod z userEvent, takich jak:

userEvent.click()
userEvent.type()
userEvent.selectOptions()
userEvent.hover()
...powinieneś wywołać userEvent.setup(). To zapewnia, że te interakcje są bardziej realistyczne i dostosowane do standardów testowania w RTL.

fireEvent
Co to jest?: fireEvent to bardziej podstawowa funkcja do symulowania zdarzeń w DOM. Umożliwia symulowanie różnych interakcji z elementami DOM, takich jak kliknięcia, zmiany wartości w formularzach, itp.

Zalety:

Prosta i szybka w użyciu.
Działa bez dodatkowych ustawień, więc jest idealna do prostych testów.
Wady:

Brakuje realizmu w symulowaniu interakcji użytkownika. Na przykład, fireEvent.click() symuluje kliknięcie bez opóźnienia, a fireEvent.type() nie naśladuje realistycznego wpisywania tekstu.



 userEvent
Co to jest?: userEvent to bardziej zaawansowane podejście do symulowania interakcji użytkownika. Funkcje w userEvent są bardziej realistyczne, ponieważ symulują rzeczywiste działania użytkownika w sposób bardziej naturalny.

Zalety:

Działa w sposób bardziej podobny do rzeczywistych interakcji użytkownika, np. opóźnia kliknięcia, wpisywanie tekstu, czy wybieranie opcji.
Lepiej odwzorowuje sposób, w jaki użytkownicy wchodzą w interakcje z aplikacjami.
Obsługuje asynchroniczne interakcje i umożliwia łatwiejsze testowanie komponentów wymagających dynamicznych zmian.
Wady:

Wymaga wywołania userEvent.setup(), co może wprowadzać dodatkową konfigurację w bardziej zaawansowanych testach

| **Cecha**               | **`fireEvent`**                                 | **`userEvent`**                                    |
|-------------------------|-------------------------------------------------|----------------------------------------------------|
| **Realizm interakcji**   | Brak realizmu (symuluje zdarzenia natychmiastowo) | Bardziej realistyczne (symuluje rzeczywiste zachowanie użytkownika, np. opóźnienia) |
| **Łatwość użycia**       | Prostsze, mniejsze ustawienia                   | Wymaga dodatkowej konfiguracji, np. `userEvent.setup()` |
| **Asynchroniczność**     | Nie obsługuje asynchronicznego działania        | Obsługuje asynchroniczne interakcje (np. opóźnienia wpisywania tekstu) |
| **Przykłady użycia**     | `fireEvent.click()`, `fireEvent.change()`       | `userEvent.click()`, `userEvent.type()`, `userEvent.selectOptions()` |
| **Zastosowanie**         | Idealne do prostych testów, bez potrzeby realizmu | Zalecane w bardziej zaawansowanych testach z realistycznymi interakcjami |



userEvent.setup() should be called before render() to make sure all the fake mouse and keyboard stuff is ready before your component appears, just like in a real browser.

Here's why this order matters:

1. `userEvent.setup()` initializes the user event utilities and prepares them for use
2. `render()` renders the component into the testing environment
3. Having setup first ensures the user event utilities are ready when the component renders

While the code might still work with userEvent.setup() after render(), following this order ensures the most reliable test behavior and follows established testing patterns in the React community.



Common use cases for each hook:

1. beforeAll:

   - Database connections
   - Setting up test servers
   - Loading shared test data
   - One-time expensive setup operations

2. afterAll:

   - Closing database connections
   - Shutting down test servers
   - Cleaning up test files/data
   - Final cleanup operations

3. beforeEach:

   - Resetting test state
   - Setting up fresh test data
   - Initializing component renders
   - Setting up new mock implementations

4. afterEach:
   - Clearing mocks
   - Cleaning up DOM
   - Resetting component state
   - Clearing temporary test data


   
   |  | **Test jednostkowy (Unit Test)** | **Test integracyjny (Integration Test)** |
|---|------------------------|---------------------------|
| **Zakres** | Pojedyncza funkcja, metoda lub komponent | Kilka komponentów lub modułów współpracujących |
| **Izolacja** | Pełna – używa **mocków** do odcinania zależności | Minimalna – sprawdza, jak różne części systemu działają razem |
| **Szybkość** | Bardzo szybki – testuje tylko mały fragment kodu | Wolniejszy – testuje całą interakcję |
| **Cel** | Sprawdzenie, czy **pojedyncza jednostka działa poprawnie** | Sprawdzenie, czy **kilka jednostek współpracuje poprawnie** |
| **Zależności** | Brak – izolowany test | Może używać rzeczywistych API, baz danych lub state management |
| **Przykład w React** | Testowanie pojedynczego komponentu `<Button>` | Testowanie `<Form>` + `<Input>` + API |
----------------------

# Konfiguracja Vitest i MSW

Poniżej znajdziesz szczegóły na temat konfiguracji Vitest oraz MSW w projektach TypeScript.

## 1. Gdzie umieścić setup?

Jeśli chcesz, aby konfiguracja (np. `beforeAll`, `afterEach`, `afterAll`) była globalna dla wszystkich testów, powinieneś dodać plik `vitest.setup.ts` i wskazać go w `setupFiles` w pliku `vitest.config.ts`.

### Przykład pliku `vitest.setup.ts`:
```ts
import { setupServer } from 'msw/node';
import { beforeAll, afterEach, afterAll } from 'vitest';
import handlers from './mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Konfiguracja w `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './vitest.setup.ts', // Ładuje plik setup przed testami
  },
});
```

## 2. Importowanie konfiguracji w testach

Jeśli testy nie widzą mockowanego serwera, upewnij się, że `setupFiles` jest poprawnie skonfigurowane. Możesz również jawnie zaimportować serwer w testach:

### Przykład:
```ts
import { server } from '../vitest.setup.ts';
```

## 3. Obsługa błędów i dynamiczne mocki

MSW umożliwia dynamiczne zarządzanie mockami w trakcie testów. Dzięki temu możesz symulować różne odpowiedzi API w jednym teście.

### Przykład dynamicznego mocka:
```ts
import { rest } from 'msw';

test('dynamiczny mock', async () => {
  server.use(
    rest.get('/api/user', (req, res, ctx) => {
      return res(ctx.json({ name: 'Test User' }));
    })
  );

  // Test sprawdzający nową odpowiedź API
});
```

## 4. Asynchroniczne testy i cleanup

Pamiętaj o `await` oraz wykonaniu odpowiedniego cleanupu po testach, zwłaszcza gdy testy są asynchroniczne.

### Przykład:
```ts
afterEach(async () => {
  await someCleanupFunction(); // np. usunięcie danych testowych
});
```

## 5. Testowanie efektów ubocznych (np. Timery, Fetch)

Jeśli testujesz `setTimeout` lub inne operacje, które mają efekt uboczny w czasie, użyj `vi.useFakeTimers()` do mockowania timerów. W przypadku `fetch`, upewnij się, że odpowiednie mocki są dostępne w MSW.

### Mockowanie timerów:
```ts
import { vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});
```

### Mockowanie `fetch` w MSW:
```ts
import { rest } from 'msw';

server.use(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'Test User' }));
  })
);
```

## Podsumowanie:

- `vitest.setup.ts` → idealne miejsce na `beforeAll`, `afterEach`, `afterAll`.
- `setupFiles` w `vitest.config.ts` zapewnia automatyczne ładowanie setupu.
- `server.use(...)` pozwala na dynamiczne zmienianie mocków w trakcie testów.
- Zadbaj o poprawne oczekiwanie na asynchroniczne funkcje i wykonanie cleanupu po testach.
- Do testowania timerów używaj `vi.useFakeTimers()`, a do mockowania `fetch` – MSW.
