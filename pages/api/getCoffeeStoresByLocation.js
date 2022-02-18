import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {

    // config latlong and limit
    try {
        const { latlong, limit } = req.query;

        const response = await fetchCoffeeStores(latlong, limit);

        res.status(200);
        res.json(response);
    } catch (err) {
        console.log('There is an error: ', err);
        res.status(500);
        res.json({message: 'Smth went wrong: ', err})
    }
    //return smth
}

export default getCoffeeStoresByLocation;