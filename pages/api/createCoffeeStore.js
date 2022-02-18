import { getMinifiedRecords, table } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
    //find a record
    if (req.method === 'POST') {

        const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
        try {
            if (id) {
                const findCoffeeStoreRecords = await table.select({
                    filterByFormula: `id=${id}`
                }).firstPage();

                if (findCoffeeStoreRecords.length !== 0) {
                    
                    const records = getMinifiedRecords(findCoffeeStoreRecords);

                    res.json(records)
                } else {
                    //create a record
                    if (name) {
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    address,
                                    neighbourhood,
                                    voting,
                                    imgUrl
                                }
                            }
                        ]);
                        const records = getMinifiedRecords(createRecords);

                        res.json({ records });
                    }
                    else {
                        res.status(400);
                        res.json({ message: "missing id or name" });
                    }

                }
            } else {
                res.status(400);
                res.json({ message: "missing id" });
            }
        } catch (err) {
            res.status(500);
            res.json({ message: 'Error creating or finding record', err });
        }
    }
}

export default createCoffeeStore;