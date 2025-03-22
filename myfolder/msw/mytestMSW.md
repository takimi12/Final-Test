01-msw-starter - to folder z którego zaczynam
02-msw-starter - to folder w którym po kolei przerabiami sobie zagadnienia 
-----------------------------------------------
1.do folderu 01-msw-starter robimy npm i



Let's continue our journey by building a posts manager app where we'll not only test our current knowledge but also learn how to use Mock Service Worker to mock our API requests. Yes, this project will include HTTP requests!

For the core functionality, we'll create a form to create posts, a list to display them, and each post will have like and delete buttons.

This project has two starting points, so let's discuss the options:

1. If you want to build the entire project from scratch, including the front-end, start with the `01-starter` folder.
2. If you're only interested in the testing challenges and Mock Service Worker implementation, use the `02-front-end` folder which comes with the front-end already implemented.

I recommend watching the setup videos to understand how to configure the server for HTTP requests, though you can always adjust the video speed to skip familiar content.

The `03-final` folder contains the complete project with Mock Service Worker implemented, which you can use as a reference. Now that we understand our options, let's begin - I'll be starting with the `01-starter` folder.

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

## Rest Client Extension

- install the extension
- create a new posts.http file

posts.http

```
### Get all posts

GET http://localhost:4000/posts

### Get a single post

GET http://localhost:4000/posts/1

### Create a post

POST http://localhost:4000/posts
content-type: application/json

{
  "title": "new post",
  "likes": 0
}

### Update a post

PUT http://localhost:4000/posts/1
content-type: application/json

{
  "title": "updated post"
}

### Delete a post

DELETE http://localhost:4000/posts/1

```
----------------------------
2. zrobić hooka usePosts tak jak w msw-starter-final
3. zrobić kod app.tsx tak jak w 01-msw-starter-final
4. zrobic kod form.tsx tak jak w 01-msw-starter-final
5. zrobić kod list.tsx tak jak w 01-msw-starter-fina
6. zrobić kod item.tsx tak jak w 01-msw-starter-fina
------------------------------

## Form Tests

And once we have a working application, let's work on our tests.
If you did not build the project from scratch, please get a hold of the `02-front-end` folder and run:

- `npm install` to install dependencies
- `npm run server` to start the JSON Server
- `npm run dev` to start the React application

Also, this is a good opportunity to practice your current knowledge. Below you can find a list of steps that you can follow to create the tests for all three components. Form, List and Item. If you are interested in such challenge, pause the video and give it a try.

- create `src/__tests__/Form.test.tsx` file

* Import necessary dependencies:

  - @testing-library/react for render and screen
  - vitest for testing utilities (describe, test, expect, vi)
  - @testing-library/user-event for simulating user interactions
  - Form component from your components directory

* Create a getFormElements helper function:

  - Export a function that returns an object
  - Use screen.getByRole to find form elements:
    - Find input using 'textbox' role with name matching /title/i
    - Find submit button using 'button' role with name matching /add post/i

* Set up the basic test structure:

  - Create a describe block for 'Form'
  - Create mock function for onSubmit using vi.fn()
  - Declare userEvent variable

* Create beforeEach setup:

  - Initialize userEvent
  - Clear mock function
  - Render Form component with mock onSubmit prop

* Write test case for initial rendering:

  - Create test block named 'renders correctly'
  - Get form elements using helper function
  - Assert that input has empty value
  - Assert that submit button is in the document

* Write test case for input changes:

  - Create test block named 'updates input value on change'
  - Get input element using helper function
  - Simulate typing 'Test Post' using userEvent
  - Assert that input value matches typed text

* Write test case for form validation:

  - Create test block named 'requires title input before submission'
  - Get submit button using helper function
  - Simulate clicking submit button without input
  - Assert that onSubmit mock was not called

* Write test case for successful form submission:

  - Create test block named 'submits the form with correct data'
  - Get both input and submit button
  - Simulate typing 'Test Post'
  - Simulate clicking submit button
  - Assert that onSubmit was called with correct data object (title and likes)

* Write test case for form reset after submission:
  - Create test block named 'clears input after submission'
  - Get both input and submit button
  - Simulate typing and submitting form
  - Assert that input value is empty after submission



  1. tworzę folder __tests__
  2. tworzę plik form.test.tsx - nie ma tu nic z mock service worker, a jedynie, mockowanie funkcji

Symuluje lokalne funkcje przekazywane jako propsy lub importowane moduły.
Jest używane, gdy testujemy, czy dana funkcja została wywołana i z jakimi argumentami.
Nie symuluje żądań sieciowych – działa tylko w ramach komponentu/testu.
Interceptuje rzeczywiste żądania sieciowe (fetch, axios itp.).
Jest używane do symulowania backendu w testach.
Przydatne, gdy testowany kod wysyła zapytania do API i oczekuje odpowiedzi.
Mockuje tylko sieć, a nie funkcje przekazywane jako propsy.

3. twore plik list.test.tsx - nie ma tu nic z mock service worker, a jedynie mockowanie funkcji
4. tworze plik item.test.tsx - nie ma tu nic z mock service worker
----------------------------------
## Mock Service Worker

Once we have the other tests in place, it's time to set up integration tests for our App component. Here's the key point: in this application, we work with a server. Just as we mocked our list data, functions, and item props, we also want to mock APIs. Here's why:

- **Faster Tests**: Mocking APIs allows tests to run quickly without waiting for real network requests.
- **Increased Reliability**: Tests remain consistent and aren't affected by external API availability or performance.
- **Cost Savings**: Avoiding real API calls during testing reduces costs, especially with usage-based APIs.
- **Edge Case Simulation**: Mocking APIs makes it easy to create various response scenarios, including errors, for thorough testing.
- **Resilience**: This approach helps ensure the application can handle different situations effectively.

The most popular tool for mocking API calls is [Mock Service Worker](https://mswjs.io/), which we will implement in the following sections.

```bash
npm install msw@latest --save-dev
```

- create `src/mocks/handlers.ts` file
- create `src/mocks/server.ts` file


handlers.ts

# Definiowanie API i danych

Najpierw musimy określić, jak nasze API będzie wyglądać. W pliku `handlers.ts` tworzymy listę przykładowych postów oraz definiujemy URL, który będzie symulował backend:

```ts
const url = 'http://localhost:4000/posts';

export let posts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    likes: 5,
  },
  {
    id: '2',
    title: 'Second Post',
    likes: 10,
  },
];
```

- `url` – adres, pod którym dostępne są posty.
- `posts` – przykładowe dane, które będą zwracane przez API.

# Tworzenie handlerów (mockowanie API)

Teraz definiujemy obsługę zapytań HTTP (`GET`, `POST`, `PUT`, `DELETE`).

## Pobieranie postów (GET)

```ts
http.get(url, async () => {
  return HttpResponse.json(posts);
}),
```

Gdy klient wysyła zapytanie `GET`, zwracamy listę postów w formacie JSON.

W tym momencie przechodzimy do pliku server.ts


# Plik server.ts – Konfiguracja serwera mockującego API

## 1. Importowanie potrzebnych modułów

```ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
```

- `setupServer` pochodzi z `msw/node` i jest używane do uruchamiania mockowanego serwera w środowisku Node.js (np. w testach).
- `handlers` to lista handlerów z pliku `handlers.ts`, które definiują odpowiedzi na żądania HTTP (GET, POST, PUT, DELETE itp.).

## 2. Tworzenie instancji serwera

```ts
const server = setupServer(...handlers);
```

- `setupServer(...handlers)` inicjalizuje serwer mockujący i przekazuje mu wszystkie zdefiniowane handlery.
- `...handlers` oznacza, że rozpakowujemy tablicę handlerów i przekazujemy je jako argumenty.

## 3. Eksport serwera

```ts
export default server;
```

- Eksportujemy skonfigurowany serwer, aby można go było używać w innych plikach (np. w testach jednostkowych).



------------------ następnie przechodzimy do  vitest.setup.ts------------------
zmieniamy z takiego stanu:
i## Zmiana konfiguracji w pliku `vitest.setup.ts`

### Przed zmianą:
```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### Po zmianie:
```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import server from "./mocks/server"

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

afterEach(() => {
  server.resetHandlers()
})
```

### Opis zmian

Nowa konfiguracja dodaje obsługę **Mock Service Worker (MSW)**, co pozwala na mockowanie żądań sieciowych w testach.

#### Nowe elementy:
1. **Import serwera mocków:**
   ```ts
   import server from "./mocks/server"
   ```
   - Importuje serwer mocków, który przechwyci i obsłuży żądania HTTP w testach.

2. **Hooki do zarządzania serwerem:**
   - `beforeAll(() => { server.listen() })` – Uruchamia serwer przed rozpoczęciem testów.
   - `afterAll(() => { server.close() })` – Zamyka serwer po zakończeniu testów.
   - `afterEach(() => { server.resetHandlers() })` – Resetuje handlerów po każdym teście, zapewniając izolację testów.

Dzięki tym zmianom testy działają bardziej niezależnie i stabilnie.


następnie kontrynuujemy pisanie hodu w handlers.ts

## Dodawanie posta (POST)

```ts
http.post(url, async ({ request }) => {
  const newPost = (await request.json()) as Post;
  newPost.id = Date.now().toString();
  posts.push(newPost);
  return HttpResponse.json(newPost, { status: 201 });
}),
```

1. Pobieramy dane nowego posta z żądania.
2. Generujemy dla niego unikalne `id` na podstawie aktualnego czasu.
3. Dodajemy go do listy `posts`.
4. Zwracamy nowo utworzony post z kodem `201 Created`.

## Aktualizacja posta (PUT)

```ts
http.put(`${url}/:id`, async ({ params, request }) => {
  const { id } = params;
  const updatedPost = (await request.json()) as Post;
  const index = posts.findIndex((post) => post.id === id);
  posts[index] = updatedPost;
  return HttpResponse.json(updatedPost, { status: 200 });
}),
```

1. Pobieramy `id` posta z URL-a.
2. Odszukujemy posta w `posts` i aktualizujemy go nowymi danymi.
3. Zwracamy zaktualizowany post z kodem `200 OK`.

## Usuwanie posta (DELETE)

```ts
http.delete(`${url}/:id`, async ({ params }) => {
  const { id } = params;
  posts = posts.filter((post) => post.id !== id);
  return HttpResponse.json(null, { status: 200 });
}),
```

1. Pobieramy `id` posta z URL-a.
2. Filtrujemy tablicę `posts`, usuwając wskazany post.
3. Zwracamy `null` z kodem `200 OK`.


i na koniec robimy tę część kodu w pliku handlers.ts




# Obsługa błędów

Tworzymy osobne handlery, które symulują różne błędy API.

## Błąd pobierania postów (GET)

```ts
export const getErrorHandler = [
  http.get(url, () => {
    return HttpResponse.json(
      { message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }),
];
```

API zwróci `500 Internal Server Error` i komunikat _"Failed to fetch posts"_.

## Błąd tworzenia posta (POST)

```ts
export const createErrorHandler = [
  http.post(url, () => {
    return HttpResponse.json(
      { message: 'Failed to create post' },
      { status: 400 }
    );
  }),
];


API zwróci `400 Bad Request` i komunikat _"Failed to create post"_.


export const updateErrorHandler = [
  http.put(`${url}/:id`, () => {
    return HttpResponse.json(
      { message: 'Failed to update post' },
      { status: 400 }
    );
  }),
];

export const deleteErrorHandler = [
  http.delete(`${url}/:id`, () => {
    return HttpResponse.json(
      { message: 'Failed to delete post' },
      { status: 400 }
    );
  }),
];
```

teraz przechodzimy do pliku __tests__/steps/App.test.tsx

i zaczynamy tworzyć testy korzystajać z msw
