import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    coffeeStores: [],
    latlong: ''
})

export {useGlobalState, setGlobalState}