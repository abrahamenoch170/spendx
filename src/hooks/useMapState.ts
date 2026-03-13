import { useEffect, useReducer } from 'react';

const initialState = {};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return { ...state, ...action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const useMapState = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Add any side effects or subscriptions if necessary
        return () => {
            // Cleanup on unmount
        };
    }, []);

    return [state, dispatch];
};