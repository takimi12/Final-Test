import { logRoles, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import Sandbox from './Sandbox';



describe('04-user-interactions', () => {
    test('Screen debug', () => {
      render(<Sandbox />);
        screen.debug();
      const {container} = render(<Sandbox />);

      // dzięki temu w konsoli ponizej wyrenderowanego drzewa dom, pod kreską, pokazują się elementy
      // które mają aria-label
      logRoles(container)
    });
});
// Najważniejsze właściwości container:
// container.innerHTML

// Zwraca kod HTML zawarty w container jako string.
// Możesz użyć tego do sprawdzenia, co dokładnie zostało wyrenderowane.

// console.log(container.innerHTML);
// container.firstChild

// Zwraca pierwszy element potomny (dziecko) w container.
// Może to być np. główny element komponentu.
// console.log(container.firstChild); // <div> lub inny element
// container.querySelector(selector)

// Pozwala wyszukać element w container za pomocą selektora CSS.
// const button = container.querySelector('button');
// console.log(button); // <button>...</button>
// container.getElementsByClassName(className)

// Zwraca listę elementów z określoną klasą.
// const items = container.getElementsByClassName('list-item');
// console.log(items.length); // liczba znalezionych elementów
// container.getElementsByTagName(tagName)

// Pobiera elementy według nazwy znacznika (np. div, span).

// const divs = container.getElementsByTagName('div');
// console.log(divs.length); // liczba <div> w komponencie
// container.textContent

// Zwraca cały tekst zawarty w container, ignorując znaczniki HTML.

// console.log(container.textContent); // np. "Hello, world!"
// Kiedy container jest przydatny?
// Debugowanie → Możesz sprawdzić, co dokładnie wyrenderował komponent (console.log(container.innerHTML)).
// Testowanie dostępności → Możesz sprawdzić, jakie role ARIA są obecne (logRoles(container)).
// Pobieranie elementów → Możesz szukać elementów wewnątrz komponentu (container.querySelector(...)).
test('should increment and decrement count using fireEvent (legacy approach)', () => {
    render(<Sandbox />);

    const increaseButton = screen.getByRole('button', { name: /increase/i });
    const decreaseButton = screen.getByRole('button', { name: /decrease/i });

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

    fireEvent.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
test('should increment and decrement count using userEvent', async () => {
    render(<Sandbox />);
    const user = userEvent.setup();

    const increaseButton = screen.getByRole('button', { name: /increase/i });
    const decreaseButton = screen.getByRole('button', { name: /decrease/i });

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    await user.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

    await user.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
// Definiuje test, który sprawdza, czy po kliknięciu przycisku "unlike" zmienia się on na "like"
it('toggles between unlike and like buttons when clicked', async () => {

    // Tworzy instancję użytkownika symulującego interakcję z komponentem
    const user = userEvent.setup();

    // Renderuje komponent Sandbox w środowisku testowym
    render(<Sandbox />);

    // Wyszukuje w interfejsie przycisk "unlike button"
    const unlikeButton = screen.getByRole('button', { name: 'unlike button' });

    // Sprawdza, czy przycisk "unlike" jest obecny w dokumencie
    expect(unlikeButton).toBeInTheDocument();

    // Sprawdza, czy przycisk "like" nie istnieje w dokumencie (nie jest jeszcze widoczny)
  //  Metoda queryByRole z biblioteki @testing-library/react służy do wyszukiwania elementu w drzewie DOM na podstawie jego roli (np. button, textbox, heading itd.). Różni się ona od getByRole tym, że:
//✅ queryByRole zwraca:
//Element – jeśli istnieje w DOM
//null – jeśli element nie istnieje (nie powoduje błędu
//✅ getByRole → Kiedy element musi istnieć
//✅ queryByRole → Kiedy element może, ale nie musi istnieć (np. po ukryciu, usunięciu)
    expect(
      screen.queryByRole('button', { name: 'like button' })
    ).not.toBeInTheDocument();

    // Symuluje kliknięcie przycisku "unlike"
    await user.click(unlikeButton);

    // Wyszukuje w interfejsie nowy przycisk "like button", który powinien się pojawić po kliknięciu
    const likeButton = screen.getByRole('button', { name: 'like button' });

    // Sprawdza, czy przycisk "like" jest teraz obecny w dokumencie
    expect(likeButton).toBeInTheDocument();

    // Sprawdza, czy przycisk "unlike" już nie istnieje w dokumencie (został zastąpiony)
    expect(
      screen.queryByRole('button', { name: 'unlike button' })
    ).not.toBeInTheDocument();
});




  // do tych testów skonfigurowane jest srodowisko w vitest.setup.ts


// import { expect, afterEach } from 'vitest';
// import { cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import * as matchers from '@testing-library/jest-dom/matchers';
// expect – główna funkcja do asercji (sprawdzania warunków w testach).
// afterEach – funkcja uruchamiana po każdym teście, używana do czyszczenia środowiska testowego.
// cleanup – usuwa komponenty renderowane w testach, resetując środowisko DOM.
// @testing-library/jest-dom – rozszerza expect o dodatkowe metody do testowania DOM, np. toBeInTheDocument().
// matchers – importuje wszystkie matchery z jest-dom, aby ręcznie dodać je do expect.
// 2. Rozszerzenie expect o dodatkowe matchery



// expect.extend(matchers);
// extend(matchers) dodaje dodatkowe metody do expect, np.:



// expect(element).toBeInTheDocument();
// expect(button).toHaveTextContent('Click me');
// expect(input).toBeRequired();
// 3. Czyszczenie środowiska po każdym teście



// afterEach(() => {
//   cleanup();
// });
// afterEach(...) wykonuje cleanup() po każdym teście.
// cleanup() resetuje wirtualny DOM (jsdom), usuwając pozostałości po poprzednich testach.
// Zapobiega zanieczyszczaniu testów (test pollution), dzięki czemu każdy test zaczyna się w czystym środowisku.