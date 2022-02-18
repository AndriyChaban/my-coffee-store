import { createContext, useReducer } from 'react'

export const StoreContext = createContext();

export const ACTION_TYPES = {
    SET_LATLONG: 'SET_LATLONG',
    SET_COFFEESTORES: 'SET_COFFEESTORES'
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LATLONG: {
            return { ...state, latlong: action.payload.latlong }
        }
        case ACTION_TYPES.SET_COFFEESTORES: {
            return { ...state, coffeeStores: action.payload.coffeeStores }
        }
        default: throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const StoreProvider = ({ children }) => {
    const initialState = {
        latlong: "",
        coffeeStores: []
    };
    const [state, dispatch] = useReducer(storeReducer, initialState);

    return <StoreContext.Provider value={{ state, dispatch }}>
        {children}
    </StoreContext.Provider>
}

export default StoreProvider;