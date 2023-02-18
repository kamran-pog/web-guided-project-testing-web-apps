import { render, screen, waitFor } from "@testing-library/react"
import React from "react"
import AnimalForm from "../AnimalForm"
import userEvent from "@testing-library/user-event"

test("renders without error", () => {
    render(<AnimalForm/>)
})

test("when user fills all fields and submits, species appears in list", async () => {
    // arrange:
    render(<AnimalForm/>);
    const species = "feline";
    // act:
    const speciesInput = screen.getByLabelText(/species:/i);
    userEvent.type(speciesInput, species);

    const ageInput = screen.getByLabelText(/age:/i)
    userEvent.type(ageInput, "9");

    const notesInput = screen.getByLabelText(/notes:/i)
    userEvent.type(notesInput, 'whatever I want');

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    // assert:
    await waitFor(() =>{
        const speciesFeedback = screen.queryByText(species);
        expect(speciesFeedback).toBeInTheDocument();
    })
})