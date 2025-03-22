// Importujemy funkcje z biblioteki testing-library oraz komponent, który będziemy testować.
import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

// Funkcja pomocnicza renderująca komponent z danymi użytkowników.
function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' }
  ];
  render(<UserList users={users} />);

  return {
    users // Zwracamy dane użytkowników, żeby można było je później użyć w testach.
  };
}

// Funkcja pomocnicza renderująca komponent z danymi użytkowników i zwracająca kontener.
function renderComponent1() {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' }
  ];

  const { container } = render(<UserList users={users} />); // Renderowanie komponentu

  return { container, users }; // Zwracamy kontener i dane użytkowników
}

// Test sprawdzający, czy komponent renderuje poprawną liczbę wierszy dla użytkowników.
test('render one row per user', () => {
  const { container } = renderComponent1(); // Używamy naszej funkcji renderComponent1 do renderowania komponentu.

  // Zbieramy wszystkie wiersze użytkowników na podstawie różnych metod.
  const rows1 = within(screen.getByTestId('users')).getAllByRole('row'); // Metoda z użyciem `screen`
  const rows3 = container.querySelectorAll('tbody tr'); // Metoda z użyciem `container`

  // Sprawdzamy, czy liczba wierszy odpowiada liczbie użytkowników.
  expect(rows1).toHaveLength(2); // Oczekujemy, że będą 2 wiersze (po jednym na użytkownika)
  expect(rows3).toHaveLength(2); // Oczekujemy, że będą 2 wiersze (po jednym na użytkownika)
});

// Test sprawdzający, czy dla każdego użytkownika renderowane są jego imię i email.
test('render the email and name of each user', () => {
  const { users } = renderComponent(); // Używamy funkcji renderComponent, by uzyskać dane użytkowników.

  // Dla każdego użytkownika sprawdzamy, czy jego imię i email są wyświetlane w tabeli.
  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name }); // Sprawdzamy, czy imię użytkownika jest wyświetlane
    const email = screen.getByRole('cell', { name: user.email }); // Sprawdzamy, czy email użytkownika jest wyświetlany

    // Oczekujemy, że zarówno imię, jak i email będą obecne w dokumencie
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
