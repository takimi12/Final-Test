import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';  // Zmienione na userEvent
import { expect, test } from 'vitest';
import App from './App';

test('can receive a new user and show it on a list', async () => {  // Dodano async, ponieważ używamy asynchronicznych metod użytkownika
  render(<App />);

  const nameInput = screen.getByRole('textbox', {
    name: /name/i
  });

  const emailInput = screen.getByRole('textbox', {
    name: /email/i
  });

  const button = screen.getByRole('button');

  // Zainicjowanie interakcji za pomocą userEvent
  const user = userEvent.setup();  // Inicjalizowanie usera

  await user.click(nameInput);  // Kliknięcie na pole input
  await user.keyboard('jane');  // Wpisanie 'jane' w pole
  await user.click(emailInput);  // Kliknięcie na pole input email
  await user.keyboard('jane@jane.com');  // Wpisanie adresu e-mail

  await user.click(button);  // Kliknięcie na przycisk

  screen.debug();

  const name = screen.getByRole('cell', { name: 'jane' });
  const email = screen.getByRole('cell', { name: 'jane@jane.com' });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
