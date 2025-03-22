import { render, screen } from "@testing-library/react"; // Do renderowania komponentów w testach
import { setupServer } from "msw/node"; // Do przechwytywania zapytań HTTP
import { rest } from "msw"; // Do definiowania odpowiedzi dla przechwyconych zapytań


export const handlers = [
    rest.get("/api/repositories", (req, res, ctx) => {
      const query = req.url.searchParams.get("q"); // Pobranie parametru zapytania
      console.log("Intercepted query:", query); // Debugowanie
  
      return res(
        ctx.json({
          items: [
            { id: 1, full_name: "Test Repo 1" },
            { id: 2, full_name: "Test Repo 2" }
          ]
        })
      );
    })
  ];

const server = setupServer(...handlers);

beforeAll(() => server.listen()); // Uruchomienie MSW przed testami
afterEach(() => server.resetHandlers()); // Resetowanie handlerów po każdym teście
afterAll(() => server.close()); // Zamknięcie MSW po zakończeniu wszystkich testów