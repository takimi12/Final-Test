import {render, screen} from "@testing-library/react"
import user from "@testing-library/user-event"
import ss from "@testing-library/jest-dom"
import UserForm from "./UserForm"


test('it shows two inputs and a button', () => {
    // 1. render the componet 
    render(<UserForm />);
    // 2. Manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');
    // 3. Assertion - make sure the component is doing
    expect(inputs).toHaveLength(2)
    expect(button).toBeInTheDocument();
    // 4. what we expect it to do
})


// sposob 1
test("it calls onUserAdd when the form is submitted", () => {
    const argList = [];
    const callback = (...args) => {
    argList.push(args)
    }
    const mock = jest.fn()
    // Try to render my component
    render(<UserForm onUserAdd={() =>{}} />)
     // Find the two inputs
    const [nameInput, emailInput] = screen.getAllByRole('textbox')
    // Simulate typing in a name
    user.click(nameInput);
    user.keyboard('jane')

    //Simulate typing in an email
    user.click(emailInput)
    user.keyboard('jane@jane.com')

    //Find the buuton 
    const button = screen.getByRole('button')

    //Simulate clicking the button
    user.click(button)
    user.keyboard('jane')

    //Assertion
     expect(argList).toHaveLength(1)
     expect(argList[0][0]).toEqual({name: 'jane', email:'jane@jane.com'})


})
// 2 sposob

test("it calls onUserAdd when the form is submitted", () => {


    const mock = jest.fn()
    // Try to render my component

    // // 2 sposob

    render(<UserForm onUserAdd={callbakc} />)

  
    
         // Find the two inputs
        const nameInput = screen.getByRole('textbox', {
        name: /name/i
    })

    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    })

    //////////////////////////////

    // Simulate typing in a name

    user.click(nameInput);
    user.keyboard('jane')

    //Simulate typing in an email
    user.click(emailInput)
    user.keyboard('jane@jane.com')

    //Find the buuton 
    const button = screen.getByRole('button')

    //Simulate clicking the button
    user.click(button)
    user.keyboard('jane')
    //Assertion


    // 2 sposob

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name: 'jane', email:'jane@jane.com'})
})


// 3 sposob 
test("it calls onUserAdd when the form is submitted", () => {


    const mock = jest.fn()
    // Try to render my component


    // 3 sposob
    render(<UserForm onUserAdd={mock} />)
         ////////////////////////////////////
    
    
         // Find the two inputs
    // 2 sposob
    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    })

    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    })

    //////////////////////////////

    // Simulate typing in a name

    user.click(nameInput);
    user.keyboard('jane')

    //Simulate typing in an email
    user.click(emailInput)
    user.keyboard('jane@jane.com')

    //Find the buuton 
    const button = screen.getByRole('button')

    //Simulate clicking the button
    user.click(button)
    user.keyboard('jane')

    //Assertion
    // 2 sposob

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name: 'jane', email:'jane@jane.com'})
})

test('empties the two inputs when form is submited', () => {
    render(<UserForm onUserAdd={()=> {}} />)

    const nameInput = screen.getByRole('textbox', {name: /name/i})
    const emailInput = screen.getByRole('textbox', {name:/email/i})
    const button = screen.getByRole('button')

    user.click(nameInput)
    user.keyboard('jane');
    user.click(emailInput);
    user.keyboard('jane@jane.com')

    user.click(button)

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
})

test('empties the two inputs when form is submitted', async () => {
    render(<UserForm onUserAdd={()=> {}} />)

    const nameInput = screen.getByRole('textbox', {name: /name/i});
    const emailInput = screen.getByRole('textbox', {name:/email/i});
    const button = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard('jane');
    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    await user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
});

