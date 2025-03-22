import {render, screen, within} from "@testing-library/react"
import UserList from "./UserList"


function renderComponent() {
    const users = [
        {name:'jane', email:'jane@jane.com'},
        {name:'sam', email:'sam@sam.com'}
    ]
 render(<UserList users={users} />)

 return{
    users
 }
}



function renderComponent1() {
    const users = [
        { name: 'jane', email: 'jane@jane.com' },
        { name: 'sam', email: 'sam@sam.com' }
    ];

    const { container } = render(<UserList users={users} />);

    return { container, users };
}


test(' render one row per user', () => {
    // Render the component

//     const users = [
//         {name:'jane', email:'jane@jane.com'},
//         {name:'sam', email:'sam@sam.com'}
//     ]
// //  const {container} =   render(<UserList users={users} />)
// const {container} = renderComponent();

const {container} = renderComponent1()

    // find all the rows in the table

    // 1 sposob
    // screen.logTestingPlaygroundURL();

    // 2 spsob
    // const rows = screen.getAllByRole('row');

    // 3 sposob
    const rows1 = within(screen.getByTestId('users')).getAllByRole('row')

    // 4 sposob

    const rows3 = container.querySelectorAll('tbody tr')
    

    //Assertion: correct number of rows in the table
    // expect(rows).toHaveLength(2)
    expect(rows1).toHaveLength(2)
    expect(rows3).toHaveLength(2)
})


test('render the email and name of each user', () => {

        // Render the component

    //     const users = [
    //         {name:'jane', email:'jane@jane.com'},
    //         {name:'sam', email:'sam@sam.com'}
    //     ]
    //  render(<UserList users={users} />)
    

        const {users} = renderComponent();


     for(let user of users) {
        const name = screen.getByRole('cell', {name: user.name})
        const email = screen.getByRole('cell', {name: user.email})

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
     }
})