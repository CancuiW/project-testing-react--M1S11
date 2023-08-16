import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

// ----- EXAMPLE EPISODE TEST OBJECT -----
const exampleEpisodeData = {
    airdate: "2016-07-15",
    airstamp: "2016-07-15T12:00:00+00:00",
    airtime: "",
    id: 553946,
    image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
    name: "Chapter One: The Vanishing of Will Byers",
    number: 1,
    rating: { average: 8.2 },
    runtime: 49,
    season: 1,
    summary:"test summary",
    type: "regular",
    url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
};

const testWithoutImage= {
    airdate: "2016-07-15",
    airstamp: "2016-07-15T12:00:00+00:00",
    airtime: "",
    id: 553946,
    image: null,
    name: "Chapter One: The Vanishing of Will Byers",
    number: 1,
    rating: { average: 8.2 },
    runtime: 49,
    season: 1,
    summary: "test summary",
    type: "regular",
    url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
};


test("renders without error", () => {
    render(<Episode key={exampleEpisodeData.id} episode={exampleEpisodeData} />)
});



test("renders the summary test passed as prop", () => {
    render(<Episode key={exampleEpisodeData.id} episode={exampleEpisodeData} />)
    const contentTest = screen.queryByText(/test summary/i)
    expect(contentTest).toBeInTheDocument()
    expect(contentTest).toBeTruthy()
    expect(contentTest).toHaveTextContent(/test summary/i)
});

test("renders default image when image is not defined", () => {
    render(<Episode key={exampleEpisodeData.id} episode={testWithoutImage} />)
    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    expect(image).toBeInTheDocument()

});




// Request1:
//     Complete a test that shows the Episode component renders.
//     Pass in the provided example episode data as a test prop.

// Request2:
//     Modify the test data to display a specific summary statement.
//     Complete a test that shows that the summary value passed in to the Episode component displays as expected.
//     ** Use at least then 3 different types of expect statements to test the the existence of the summary value.**

// Request3:
//     The episode component displays a default value('https://i.ibb.co/2FsfXqM/stranger-things.png') when a image url is not provided.
//     Create a new piece of test data with the image property set to`null`.
//     Test that the alt tag of the image displayed is set to './stranger_things.png'.
