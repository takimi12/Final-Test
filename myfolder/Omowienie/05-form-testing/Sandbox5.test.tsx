import { render, screen, logRoles } from '@testing-library/react';
import Sandbox from '../../tutorial/05-form-testing/Sandbox';
import userEvent, { UserEvent } from '@testing-library/user-event';


const getFormElements = () => {
  const elements = {
        emailInputElement: screen.getByRole('textbox', {name:/email/i}),
        passwordInputElement:screen.getByLabelText('Password'),
        confirmpasswordInputElement:screen.getByLabelText(/confirm password/i),
        submitButton: screen.getByRole('button', {name:/submit/i})
  }
  return elements
}




describe("05-form-testingn", () => {
//W tym kodzie, beforeEach jest używane, aby ustawić stan przed każdym 
//testem, co pozwala na unikanie duplikowania kodu. Dzięki temu nie trzeba renderować komponentu
// Sandbox w każdym teście osobno, co upraszcza kod.

let user: UserEvent;


// Jest to metoda, która przygotowuje "symulowanego użytkownika" do interakcji z aplikacją. userEvent.setup() 
// jest funkcją dostarczoną przez bibliotekę @testing-library/user-event, która konfiguruje środowisko do
// przeprowadzania interakcji z komponentem, jak np. klikanie, pisanie w formularzu, wybieranie opcji z listy rozwijanej itp.
// Zmienna user jest przypisywana do tej instancji "symulowanego użytkownika", dzięki czemu w testach możesz korzystać z tej instancji, 
// by symulować zachowanie użytkownika, np. w testach możesz używać user.type(), user.click() itp.

  beforeEach(() => {
    user = userEvent.setup()
    render(<Sandbox />)
  })
  

  /// przed refaktorem
  test('inputs should be initialy empty', ()=> {
    const {container} = render(<Sandbox />)
    screen.debug();
    logRoles(container)


    // odniesienie się do etykiety label
    const emailInputElement = screen.getByRole('textbox', {name:/email/i})
    expect(emailInputElement).toHaveValue('')

    const passwordInputElement = screen.getByLabelText('Password')
    expect(passwordInputElement).toHaveValue('')

    const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)
    expect(confirmPasswordInputElement).toHaveValue('')
  })
  // po refaktorze
  test('inputs should be initialy empty', ()=> {



    // przed uzyciem beforeEach
    // const {container} = render(<Sandbox />)
    // screen.debug();
    // logRoles(container)

    const {emailInputElement, passwordInputElement, confirmpasswordInputElement} = getFormElements()

    expect(emailInputElement).toHaveValue('')

    expect(passwordInputElement).toHaveValue('')

    expect(confirmpasswordInputElement).toHaveValue('')
  })


  // przef refaktorem
  test('should be able to type in the input', async()=> {
    // tworzymy instancję użytkownika symulującego interakcje w teście. Pozwala to na bardziej realistyczne testowanie 
    // zachowań użytkownika, takich jak wpisywanie tekstu, klikanie, przeciąganie elementów itp.
    const user = userEvent.setup();

    const emailInputElement = screen.getByRole('textbox', {name:/email/i})
    await user.type(emailInputElement, 'test@test.com')
    expect(emailInputElement).toHaveValue('test@test.com')


    const passwordInputElement = screen.getByLabelText('Password')
    await user.type(passwordInputElement, 'secret');
    expect(passwordInputElement).toHaveValue('secret')


    const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)
    await user.type(confirmPasswordInputElement, 'secret')
    expect(confirmPasswordInputElement).toHaveValue('secret')
  })

  // po refaktorze
 
   test('should be able to type in the input', async()=> {
    // tworzymy instancję użytkownika symulującego interakcje w teście. Pozwala to na bardziej realistyczne testowanie 
    // zachowań użytkownika, takich jak wpisywanie tekstu, klikanie, przeciąganie elementów itp.

// usuwamy to po dodac w beforeEach
//    const user = userEvent.setup();

    const {emailInputElement, passwordInputElement, confirmpasswordInputElement} = getFormElements()


    await user.type(emailInputElement, 'test@test.com')
    expect(emailInputElement).toHaveValue('test@test.com')


    await user.type(passwordInputElement, 'secret');
    expect(passwordInputElement).toHaveValue('secret')


    await user.type(confirmpasswordInputElement, 'secret')
    expect(confirmpasswordInputElement).toHaveValue('secret')
  })

  test("should show email error if email is invalid", async () =>{
    const {emailInputElement,submitButton} = getFormElements();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

    await user.type(emailInputElement, 'invalid')
    await user.click(submitButton)

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })
  test('should show password error if password is less than 5 characters', async () => {
    const { emailInputElement, passwordInputElement, submitButton } =
      getFormElements();

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, 'test@test.com');
    await user.type(passwordInputElement, 'abcd');
    await user.click(submitButton);

    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  test('should show error if passwords do not match', async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmpasswordInputElement,
      submitButton,
    } = getFormElements();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, 'test@test.com');
    await user.type(passwordInputElement, 'secret');
    await user.type(confirmpasswordInputElement, 'notsecret');
    await user.click(submitButton);

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test('valid inputs show no errors and clear fields', async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmpasswordInputElement,
      submitButton,
    } = getFormElements();
    await user.type(emailInputElement, 'test@test.com');
    await user.type(passwordInputElement, 'secret');
    await user.type(confirmpasswordInputElement, 'secret');
    await user.click(submitButton);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();
    expect(emailInputElement).toHaveValue('');
    expect(passwordInputElement).toHaveValue('');
    expect(confirmpasswordInputElement).toHaveValue('');
  });

})



