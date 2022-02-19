import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const records = await findRecordByFilter(id)
            if (records.length !== 0) {
                res.json(records);
            } else {
                res.status(400);
                res.json({ message: "id could not be found" });
            }
        } else {
            res.status(400);
            res.json({ message: "id could not be found" });
        }

    } catch (err) {
        res.status(500);
        res.json({ message: "Smth went wrong", error })
    }
}

export default getCoffeeStoreById;