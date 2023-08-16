import React from 'react';
import { render,  screen ,waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'


//only display the data that we want in 'Show' component
const mockShowData={
    name: "Stranger Things",
    summary:'summary test',
    seasons:[
        { id: 0, name: 'Season 1', episodes: [] },
        { id: 1, name: 'Season 2', episodes: [] },
    ]
       
}
test('renders without errors', () => { 
    render(<Show show={mockShowData} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />)
    const loading = screen.queryByText(/Fetching data.../i)
    expect(loading).toBeInTheDocument()
 });

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={mockShowData} selectedSeason={'none'} />)
    const items = screen.queryAllByTestId('season-option')
    expect(items).toHaveLength(2)
});

test('handleSelect is called when an season is selected', async () => { 
    //create a mock function ,just test click the option,this function will be called
    const handleSelect=jest.fn()
    render(<Show show={mockShowData} selectedSeason={'none'} handleSelect={handleSelect} />)
    const select = screen.getByLabelText(/Select A Season/i)
    //means to click the option '0'
    userEvent.selectOptions(select,['0'])
    
    await waitFor(() => expect(handleSelect).toBeCalled());
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender}=render(<Show show={mockShowData} selectedSeason={'none'} />)
    //if 'none',there is no related <div data-testid="episodes-container" ></div>
    expect(screen.queryByTestId('episodes-container')).not.toBeInTheDocument()
    rerender(<Show show={mockShowData} selectedSeason={1} />)
    expect(screen.queryByTestId('episodes-container')).toBeInTheDocument()                                                   
});



// request1:
//     Build an example data structure that contains the show data in the correct format.
//     A show should contain a name, a summary and an array of seasons,
//     each with a id, name and an(empty) list of episodes within them.
//     Use console.logs within the client code if you need to to verify the structure of show data.

// request2:
//     Test that the Show component renders when your test data is passed in through 
//     show prop and "none" is passed in through selectedSeason prop.

// request3:
//     Test that the Loading component displays when null is passed into the show prop
//     (look at the Loading component to see how to test for it's existence)

// request4:
//     Test that when your test data is passed through the show prop, the same number of season select
//     options appear as there are seasons within your test data.

// request5:
//     Test that when an item is selected, the handleSelect function is called.
//     Look at your code to see how to get access to the select DOM element and[userEvent reference materials]
//     (https://testing-library.com/docs/ecosystem-user-event/) to see how to trigger a selection.

// request6:
//     Test that the episode component DOES NOT render when the selectedSeason props is "none" and
//     DOES render the episode component when the selectedSeason prop has a valid season index.