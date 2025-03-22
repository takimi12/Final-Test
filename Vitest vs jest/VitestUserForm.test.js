import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect, vi } from 'vitest'; // Zmiana z 'jest' na 'vitest' i dodanie 'vi' do importów
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
    // 1. render the component
    render(<UserForm />);
    
    // 2. Manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');
    
    // 3. Assertion - make sure the component is doing
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
    // 4. what we expect it to do
});

// Sposób 1
test('it calls onUserAdd when the form is submitted', () => {
    const argList = [];
    const callback = (...args) => {
        argList.push(args);
    };

    const mock = vi.fn(); // Zmiana z 'jest.fn' na 'vi.fn' (w Vitest używamy 'vi' zamiast 'jest')
    
    // Try to render my component
    render(<UserForm onUserAdd={callback} />);
    
    // Find the two inputs
    const [nameInput, emailInput] = screen.getAllByRole('textbox');
    
    // Simulate typing in a name
    user.click(nameInput);
    user.keyboard('jane');
    
    // Simulate typing in an email
    user.click(emailInput);
    user.keyboard('jane@jane.com');
    
    // Find the button 
    const button = screen.getByRole('button');
    
    // Simulate clicking the button
    user.click(button);
    user.keyboard('jane');
    
    // Assertion
    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({ name: 'jane', email: 'jane@jane.com' });
});

// Sposób 2
test('it calls onUserAdd when the form is submitted', () => {
    const mock = vi.fn(); // Zmiana z 'jest.fn' na 'vi.fn'
    
    // Try to render my component
    render(<UserForm onUserAdd={mock} />);
    
    // Find the two inputs
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    
    // Simulate typing in a name
    user.click(nameInput);
    user.keyboard('jane');
    
    // Simulate typing in an email
    user.click(emailInput);
    user.keyboard('jane@jane.com');
    
    // Find the button 
    const button = screen.getByRole('button');
    
    // Simulate clicking the button
    user.click(button);
    user.keyboard('jane');
    
    // Assertion
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' });
});

// Sposób 3
test('it calls onUserAdd when the form is submitted', () => {
    const mock = vi.fn(); // Zmiana z 'jest.fn' na 'vi.fn'
    
    // Try to render my component
    render(<UserForm onUserAdd={mock} />);
    
    // Find the two inputs
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    
    // Simulate typing in a name
    user.click(nameInput);
    user.keyboard('jane');
    
    // Simulate typing in an email
    user.click(emailInput);
    user.keyboard('jane@jane.com');
    
    // Find the button 
    const button = screen.getByRole('button');
    
    // Simulate clicking the button
    user.click(button);
    user.keyboard('jane');
    
    // Assertion
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' });
});

test('empties the two inputs when form is submitted', () => {
    render(<UserForm onUserAdd={() => {}} />);
    
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button');
    
    user.click(nameInput);
    user.keyboard('jane');
    user.click(emailInput);
    user.keyboard('jane@jane.com');
    
    user.click(button);
    
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
});

test('empties the two inputs when form is submitted (async)', async () => {
    render(<UserForm onUserAdd={() => {}} />);
    
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button');
    
    await user.click(nameInput);
    await user.keyboard('jane');
    await user.click(emailInput);
    await user.keyboard('jane@jane.com');
    
    await user.click(button);
    
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
});
