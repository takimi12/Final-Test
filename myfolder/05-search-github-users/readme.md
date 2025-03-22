1. przechodząc z folderu o1-starter do folderu 02-frontend
trzeba w pliku .env dodać token w githuba
2. Trzeba dodać react testing library v2 i MSW
npm install msw

w folderze mocks

Plik handlers.ts

export const handlers = [];
Opis: Plik handlers.ts jest miejscem, w którym definiujesz konkretne przechwytywanie zapytań HTTP (handlerów) dla różnych endpointów w swojej aplikacji.
Czym są handlery? Handlery to funkcje, które "przechwytują" zapytania HTTP (np. GET, POST, PUT itp.) i zwracają zamockowane odpowiedzi. Na przykład, dla zapytania GET /api/user możesz zwrócić dane użytkownika, a dla zapytania POST /api/login - zasymulować odpowiedź z serwera, jakby użytkownik się zalogował.

W tym pliku powinny znajdować się definicje takich handlerów. 



Plik server.ts

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

export default server;
Opis: Plik server.ts jest odpowiedzialny za uruchomienie serwera MSW, który będzie nasłuchiwał zapytań HTTP w trakcie działania aplikacji w środowisku Node.js (np. podczas testów jednostkowych).

setupServer: Funkcja setupServer jest używana do konfiguracji serwera, który przechwytuje zapytania HTTP. Jako argumenty przyjmuje handlery (które są zaimportowane z pliku handlers.ts), a następnie uruchamia serwer nasłuchujący na te zapytania.

Co się dzieje w tym pliku?

handlers (z pliku handlers.ts) zawierają definicje tego, jak serwer MSW ma reagować na różne zapytania HTTP.
setupServer(...handlers) uruchamia serwer MSW, który nasłuchuje zapytań HTTP i reaguje na nie zgodnie z wcześniej zdefiniowanymi handlerami.
server to instancja tego serwera, która jest eksportowana, by można było ją używać w różnych częściach aplikacji (np. do uruchomienia w testach).
Podsumowanie: Plik server.ts odpowiada za konfigurację i uruchomienie serwera MSW, który nasłuchuje na zapytania HTTP w trakcie działania aplikacji (lub testów), korzystając z handlerów zdefiniowanych w handlers.ts


Jak to współpracuje?
handlers.ts - Definiujesz w nim, jakie zapytania mają być przechwytywane i jakie odpowiedzi mają być zwracane (symulowanie API).

server.ts - Tworzysz serwer, który nasłuchuje na te zapytania przy użyciu handlerów z handlers.ts i uruchamiasz go w aplikacji (np. w testach).


potem ustawiamy vitest.setup.ts


W pliku vitest.setup.ts konfigurujesz środowisko testowe w kontekście używania MSW oraz Vitest. Ten plik pełni ważną rolę, aby odpowiednio ustawić mockowanie zapytań HTTP i zapewnić, że testy będą przeprowadzane w izolacji. Oto szczegółowe wyjaśnienie poszczególnych kroków, które wykonujesz w tym pliku:

1. Rozszerzenie expect o matchery z @testing-library/jest-dom

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
Co się dzieje?: Dzięki temu rozszerzeniu możesz używać dodatkowych matcherów w swoich testach. @testing-library/jest-dom oferuje rozszerzenie dla jest/vitest, które pozwala na bardziej wygodne asercje w testach, takie jak toBeInTheDocument(), toHaveTextContent(), toHaveClass() itd.
2. Czyszczenie komponentów po każdym teście
typescript
Kopiuj
Edytuj
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
cleanup(): Funkcja ta pochodzi z Testing Library i zapewnia, że po każdym teście, wszystkie zamockowane komponenty (np. renderowane w DOM) są usuwane, co zapewnia czystość środowiska testowego.
server.resetHandlers(): Ta funkcja z MSW służy do resetowania handlerów po każdym teście. Dzięki temu, możesz zmieniać zachowanie mocków między testami, jeśli to konieczne, np. dla różnych warunków testowych (możesz dodać dodatkowe mocki lub zmieniać odpowiedzi w zależności od testu).
3. Nasłuchiwanie na zapytania HTTP przed wszystkimi testami

beforeAll(() => {
  server.listen();
});
server.listen(): Uruchamia serwer MSW, który zaczyna przechwytywać zapytania HTTP, gdy testy się rozpoczynają. Dzięki temu zapytania, które są wykonywane przez aplikację w testach, będą mogły być przechwycone przez MSW, a odpowiedzi będą symulowane zgodnie z wcześniej zdefiniowanymi handlerami.
4. Zamykanie serwera MSW po wszystkich testach

afterAll(() => {
  server.close();
});
server.close(): Po zakończeniu wszystkich testów, wywołanie tej funkcji zatrzymuje serwer MSW. Dzięki temu nie będzie on już nasłuchiwał na zapytania po zakończeniu testów, co pozwala na czystość i wydajność testów.
Podsumowanie działania vitest.setup.ts:
Rozszerzanie expect o matchery: Umożliwia wygodniejsze asercje w testach przy użyciu @testing-library/jest-dom.
Czyszczenie: Po każdym teście czyści DOM i resetuje handlery MSW, zapewniając, że każdy test ma czyste środowisko.
Uruchamianie MSW: Przed wszystkimi testami uruchamiasz serwer MSW, który zaczyna nasłuchiwać zapytań HTTP i reagować na nie zgodnie z wcześniej zdefiniowanymi handlerami.
Zamykanie MSW: Po zakończeniu wszystkich testów zatrzymujesz serwer, aby zapewnić, że nie będzie już przechwytywał zapytań po zakończeniu testów.
Dlaczego to ważne?
Izolacja testów: Dzięki temu każde zapytanie HTTP jest przechwytywane przez MSW i testy są wykonywane w kontrolowanym środowisku, bez kontaktu z prawdziwym backendem.
Elastyczność i kontrola: Możesz łatwo zmieniać zachowanie mocków między testami, testując różne scenariusze odpowiedzi od serwera, takie jak błędy, opóźnienia, różne dane.
Tak skonfigurowany plik vitest.setup.ts zapewnia płynne działanie testów z symulacją zapytań HTTP przy pomocy MSW, co pozwala na skuteczne testowanie komponentów front-endowych w izolacji od rzeczywistego backendu.

-----------------------------
tworzymy folder

__tests__
1. tworzymy test utils.test.ts odnosnie oliku utils.ts


estowanie funkcji calculateMostForkedRepos
Ta funkcja oblicza 5 najczęściej forkowanych repozytoriów.

Przypadek brzegowy (Edge Case):
Test "powinna zwrócić pustą tablicę dla pustego wejścia": Sprawdzamy, czy funkcja poprawnie zwraca pustą tablicę, jeśli nie ma żadnych repozytoriów do analizy.
Test główny:
Test "powinna zwrócić 5 najczęściej forkowanych repozytoriów": Sprawdzamy, czy funkcja poprawnie sortuje repozytoria według liczby forków w porządku malejącym i zwraca 5 repozytoriów z najwyższą liczbą forków.
Test weryfikacyjny:
Test "powinna sortować repozytoria według liczby forków w porządku malejącym": Upewniamy się, że repozytoria są posortowane prawidłowo, czyli repozytoria z większą liczbą forków pojawiają się przed repozytoriami z mniejszą liczbą forków.
2. Testowanie funkcji calculatePopularLanguages
Ta funkcja oblicza 5 najczęściej używanych języków programowania wśród repozytoriów.

Przypadek brzegowy (Edge Case):

Test "powinna zwrócić pustą tablicę dla pustego wejścia": Sprawdzamy, czy funkcja zwróci pustą tablicę, gdy nie podamy żadnych repozytoriów.
Test dla repozytoriów bez języków:

Test "powinna zwrócić pustą tablicę, gdy repozytoria nie zawierają języków": Upewniamy się, że funkcja zwróci pustą tablicę, jeśli repozytoria nie mają przypisanych żadnych języków.
Test główny:

Test "powinna zwrócić 5 najczęściej używanych języków": Sprawdzamy, czy funkcja poprawnie zlicza wystąpienia języków w repozytoriach i zwraca 5 najpopularniejszych.
Test weryfikacyjny:

Test "powinna poprawnie zliczyć liczbę wystąpień języka": Upewniamy się, że język JavaScript pojawia się dokładnie 2 razy, co potwierdza poprawność zliczania wystąpień.
3. Testowanie funkcji calculateMostStarredRepos
Ta funkcja oblicza 5 repozytoriów z największą liczbą gwiazdek (stars).

Przypadek brzegowy (Edge Case):

Test "powinna zwrócić pustą tablicę dla pustego wejścia": Sprawdzamy, czy funkcja zwraca pustą tablicę, gdy lista repozytoriów jest pusta.
Test główny:

Test "powinna zwrócić 5 najczęściej ocenianych repozytoriów": Sprawdzamy, czy funkcja poprawnie sortuje repozytoria według liczby gwiazdek w porządku malejącym i zwraca 5 repozytoriów z największą liczbą gwiazdek.
Test weryfikacyjny:

Test "powinna sortować repozytoria według liczby gwiazdek w porządku malejącym": Upewniamy się, że repozytoria są posortowane w taki sposób, że te z większą liczbą gwiazdek znajdują się na początku listy.
-------------------
mockowanie odpoweidzi graphql
1. zrobienie pliku handlers.ts - na podstawie queries.ts
2. zrobienie pliku server.ts


-------------------

Sekcja 7
Do napisania samemu testów takich jak:

1.StatsCard.text.tsx --- wszystko zrobione bez wątpliwości
2.StatsContainer.test.tsx 
3.UserCard.test.tsx
4.SearchFormText.test.tsx--- zrobione 3/5 - do tych 2 niezrobionych wrócić w przyszlosci
5.ForkedRepos.test.tsx
--------------------
6.odcinekk 70 - mockgraphqlresponse zrobic z nagraniem zeby zrozumiec o co chodzi,


Zawartość: Plik utils.ts zawiera funkcje pomocnicze, takie jak calculateMostForkedRepos, calculateMostStarredRepos, i calculatePopularLanguages, które są częścią logiki aplikacji. Te funkcje służą do wykonywania różnych obliczeń na repozytoriach. Ponieważ ten plik zawiera kod produkcyjny, a nie testowy, jego rozszerzenie to .ts.

Oddzielanie kodu produkcyjnego od testów: Zgodnie z najlepszymi praktykami, kod, który implementuje logikę (np. funkcje obliczeniowe w utils.ts), trzymamy w osobnych plikach, a pliki testowe (z rozszerzeniem .test.ts lub .spec.ts) używamy do testowania tego kodu. W tym przypadku, testy dla funkcji z utils.ts znajdują się w pliku w folderze __tests__ i mają rozszerzenie .test.ts.


Dlaczego plik utils.ts jest importowany do handlera?
Plik utils.ts jest importowany do pliku handlera, ponieważ te funkcje są wykorzystywane do generowania danych, które mają być zwrócone w odpowiedzi na zapytania GraphQL w ramach symulacji (np. w testach przy użyciu msw).

W pliku handlers z użyciem msw (Mock Service Worker) definiujesz różne mockowane odpowiedzi na zapytania GraphQL. Na przykład, zapytanie GetUser może zwrócić dane użytkownika, w tym jego repozytoria, które są reprezentowane przez mockRepositories. Funkcje z pliku utils.ts mogą być wykorzystywane do przygotowania odpowiednich danych, przetworzenia ich lub obliczenia różnych statystyk (np. liczbę gwiazdek, forków, popularność języków) przed odesłaniem odpowiedzi na zapytanie GraphQL.

Przykład: W handlers masz zapytanie GraphQL GetUser, które w odpowiedzi zwraca dane o użytkowniku i jego repozytoriach. Aby odpowiedź była bardziej realistyczna, funkcje z utils.ts mogą być użyte do obliczenia statystyk, takich jak "najwięcej gwiazdek" lub "najwięcej forków", które są następnie dodawane do odpowiedzi, kiedy mockujesz zapytanie.

Podsumowanie:
utils.ts ma rozszerzenie .ts, ponieważ zawiera logikę aplikacji, a nie kod testowy.
Jest importowany w handlerze, ponieważ funkcje w nim zawarte są używane do przetwarzania danych, które będą zwrócone w odpowiedzi na zapytania GraphQL w ramach symulacji (np. w testach).
Pliki z testami powinny mieć rozszerzenie .test.ts i znajdować się w folderze __tests__, ale same pliki z logiką aplikacji (takie jak utils.ts) nie mają końcówki .test.ts.


# Jak działa wykorzystywanie `handlers.ts` w testach z MSW (Mock Service Worker)

`handlers.ts` jest wykorzystywany w procesie testowania, nawet jeśli jest importowany tylko w plikach takich jak `vitest.setup.ts` i `server.ts`. Zrozumienie tego, jak działa ten mechanizm, jest kluczowe, zwłaszcza w kontekście MSW (Mock Service Worker) oraz procesu testowania.

## Rola `handlers.ts` i jego wykorzystywanie w testach

`handlers.ts` zawiera definicje odpowiedzi na zapytania GraphQL (np. zapytanie `GetUser`). Te odpowiedzi symulują dane, które mogłyby pochodzić z prawdziwego serwera.

### 1. `vitest.setup.ts`:
- Jest to plik, który konfiguruje środowisko testowe przed rozpoczęciem wykonywania testów.
- Importując `handlers.ts` w tym pliku, zapewniasz, że odpowiedzi MSW (Mock Service Worker) będą dostępne w całym teście.
- Dzięki temu, podczas wykonywania testów, MSW będzie przechwytywał zapytania i zwracał odpowiedzi zdefiniowane w `handlers.ts`.

### 2. `server.ts`:
- Ten plik jest odpowiedzialny za uruchomienie i konfigurację serwera MSW, który przechwytuje zapytania HTTP (np. zapytania GraphQL) wysyłane przez aplikację w trakcie testów.
- Importując `handlers.ts` w tym pliku, zapewniasz, że serwer będzie korzystał z odpowiednich definicji odpowiedzi na zapytania.
- Uruchamianie serwera MSW jest kluczowe, ponieważ to on przechwytuje zapytania i zwraca odpowiedzi zdefiniowane w `handlers.ts`.

## Jak to działa w praktyce

### Symulacja zapytań i odpowiedzi:
Kiedy aplikacja wysyła zapytanie GraphQL (np. `GetUser`), MSW przechwytuje to zapytanie i sprawdza, czy jest zdefiniowane w `handlers.ts`. Jeśli tak, zwraca odpowiedź zdefiniowaną w tym pliku.

`handlers.ts` nie musi być importowany w każdym pliku testowym, ponieważ raz zaimportowany w `vitest.setup.ts` i `server.ts` zapewnia, że odpowiedzi zdefiniowane w tym pliku będą dostępne globalnie w czasie trwania testów. W ten sposób symulowanie odpowiedzi działa na poziomie całego środowiska testowego.

### Przykład działania

#### `vitest.setup.ts` (konfiguracja środowiska testowego):
```ts
import { server } from './server';  // Import serwera MSW
import '@testing-library/jest-dom';  // Dodatkowe biblioteki testowe

// Uruchamiamy serwer MSW przed wszystkimi testami
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); // Resetowanie handlerów po każdym teście
afterAll(() => server.close()); // Zamykanie serwera po testach

### Konfiguracja serwera MSW i użycie `handlers.ts`

### 1. `server.ts` (konfiguracja serwera MSW)
import { setupServer } from 'msw/node';  // Tworzymy serwer MSW
import { handlers } from './handlers';  // Importujemy handlerów

// Tworzymy serwer MSW z danymi zdefiniowanymi w handlers.ts
export const server = setupServer(...handlers);
# Definicje zapytań GraphQL i odpowiedzi - `handlers.ts`

### Plik `handlers.ts` zawiera definicje zapytań GraphQL i odpowiedzi, które są używane do mockowania danych w środowisku testowym.

import { graphql, HttpResponse } from 'msw';
import { mockRepositories } from '@/__tests__/utils';

export const handlers = [
  graphql.query('GetUser', ({ query, variables }) => {
    const { login } = variables;
    
    if (login === 'request-error') {
      return HttpResponse.json({
        errors: [{ message: 'there was an error' }],
      });
    }

    return HttpResponse.json({
      data: {
        user: {
          name: login,
          avatarUrl: `https://github.com/images/${login}.jpg`,
          repositories: {
            totalCount: 45,
            nodes: mockRepositories,
          },
        },
      },
    });
  }),
];
handlers.ts jest wykorzystywany, ale nie musisz go importować w każdym pliku testowym.
W praktyce, handlers.ts jest importowany w vitest.setup.ts i server.ts po to, aby skonfigurować mockowanie odpowiedzi GraphQL w całym środowisku testowym.
Dzięki temu, podczas testowania, kiedy aplikacja wykonuje zapytania, MSW przechwytuje je i zwraca odpowiedzi zdefiniowane w handlers.ts, a cały ten proces działa bez potrzeby zaimportowania handlers.ts w każdym pojedynczym pliku testowym.