import {render,screen} from '@testing-library/react';
import SearchForm from '@/components/form/SearchForm';
import userEvent from '@testing-library/user-event';


const mockToast = vi.fn();


vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));


// 1.renders the search form correctly ---- zrobione
// 2.displays empty input when userName is empty --- zrobione
// 3.updates input value on change ----- zrobione
// 4.shows toast when submitting empty input ---- zrobione [ niesamodzielnie]
// 5.calls setUserName on valid form submission --- zrobione [niewiedzialemo co chodzi]

describe('SearchFormText1', () => {
    const user = userEvent.setup();

    test('renders the search form correctly', () => {
        const setUserName = vi.fn();
        render(<SearchForm userName='john_doe' setUserName={setUserName}/>)

    const input = screen.getByRole('textbox', { name: /search/i });
    const button = screen.getByRole('button');

    expect(input).toHaveValue()
    expect(button).toBeInTheDocument()
    })

    test('displays empty input when userName is empty', () => {
        const setUserName = vi.fn();
        render(<SearchForm userName='' setUserName={setUserName}/>)

        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('')
        expect(input).toBeInTheDocument()
    })
    test('updates inpput value on change', async () => {
        const setUserName = vi.fn();
        render(<SearchForm userName='' setUserName={setUserName}/>)

        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('')

      // Symulacja wpisania tekstu
      
      await user.type(input, 'john_doe');

      // Sprawdzenie, czy wartość inputa została zmieniona
      expect(input).toHaveValue('john_doe');
    })
    test('shows toast when submitting empty input', async () => {
        const setUserName = vi.fn();

        render(<SearchForm userName='' setUserName={setUserName} />);
    
        const button = screen.getByRole('button');
        await user.click(button);
    
        expect(mockToast).toHaveBeenCalledWith({
          description: 'Please enter a valid username',
        });
      });
      
      test('calls setUserName on valid form submission', async () => {
        const setUserName = vi.fn();  // Tworzymy funkcję mock
        render(<SearchForm userName='' setUserName={setUserName} />);
      
        // Znajdujemy input i przycisk
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        
        // Symulujemy wpisanie tekstu do inputa
        await userEvent.type(input, 'validUserName');
      
        // Symulujemy kliknięcie w przycisk
        await userEvent.click(button);
      
        // Sprawdzamy, czy funkcja setUserName została wywołana z poprawnym argumentem
        expect(setUserName).toHaveBeenCalledWith('validUserName');
      });

})
