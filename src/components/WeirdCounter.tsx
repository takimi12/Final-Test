import {useState} from "react";

export type WeirdCounterProps = {
    initialValue?:number;
}

export const WeirdCounter = ({initialValue}: WeirdCounterProps) => {
    const [counter, setCounter] = useState(initialValue || 0)

    const randomize = () => {
        setCounter(Math.round(Math.random() * 10000));
    }

    return (
        <div>
            <h1 data-testid='counter-value'>{counter}</h1>
            <button data-testid='conter-button' onClick={randomize}>+1</button>
        </div>
    )
}