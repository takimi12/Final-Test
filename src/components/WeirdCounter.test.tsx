import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WeirdCounter } from "./WeirdCounter";
//2. uzycie spy to drugi sposob
import * as randomHook from "../hooks/useRandomValue";

const fireEvent = userEvent.setup();

type RandomHookModule = {
  useRandomValue: () => () => number;  
};

///1. mockowanie to 1 sposob
vi.mock("../hooks/useRandomValue", async (importOriginal) => {
    const originalModule: RandomHookModule = await importOriginal();
    return {
        ...originalModule,
        useRandomValue: () => () => 999,
    };
});

describe("WeirdCounter", () => {
    it("initial value should be rendered", () => {
        render(<WeirdCounter />);
        const counterElement = screen.getByTestId("counter-value");

        expect(counterElement).toHaveTextContent(/^0$/);
    });

    it("should set random counter value after clicking the button", async () => {
        vi.spyOn(randomHook, 'useRandomValue').mockReturnValueOnce(() => 999);
        
        render(<WeirdCounter />);

        const counterElement = screen.getByTestId("counter-value");
        const buttonElement = screen.getByTestId("counter-button");

        await fireEvent.click(buttonElement);

        expect(counterElement).toHaveTextContent(/^999$/);
    });
});
