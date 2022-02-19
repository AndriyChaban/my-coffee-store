import { useContext, useState } from "react";
import { StoreContext } from "../context/store-context";
import { ACTION_TYPES } from "../context/store-context";
import { useGlobalState } from "../context/global-state";


const useTrackLocation = () => {

    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    // const [latlong, setLatLong] = useState('');
    const [isFindingLoc, setIsFindingLoc] = useState(false);

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const { dispatch } = useContext(StoreContext);

    const [latlong, setLatlong] = useGlobalState('latlong');

    function success(pos) {
        setIsFindingLoc(false);
        var crd = pos.coords;
        const lat = crd.latitude;
        const long = crd.longitude;
        // setLatLong(`${lat.toFixed(2)}%2C${long.toFixed(2)}`);
        // dispatch({ type: ACTION_TYPES.SET_LATLONG, payload: { latlong: `${lat.toFixed(2)}%2C${long.toFixed(2)}`}})
        // dispatch({ type: ACTION_TYPES.SET_LATLONG, payload: { latlong: `40.70%2C-73.90`}})
        setLatlong(`40.70%2C-73.90`)
    }

    function error(err) {
        // console.warn(`ERROR(${err.code}): ${err.message}`);
        setLocationErrorMsg(`ERROR(${err.code}): ${err.message}`);
    }
    const handleTrackLocation = () => {
        setIsFindingLoc(true);
        navigator.geolocation.getCurrentPosition(success, error, options);
    }


    return {
        // latlong,
        handleTrackLocation,
        locationErrorMsg,
        isFindingLoc
    }
}

export default useTrackLocation;