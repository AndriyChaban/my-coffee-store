import { getMinifiedRecords, table, findRecordByFilter } from '../../lib/airtable';


const favoriteCoffeeStoreById = async (req, res) => {
    if (req.method === 'PUT') {
        try {
            const { id } = req.body;
            if (id) {
                const records = await findRecordByFilter(id);
                if (records.length !== 0) {
                    let { voting } = records[0];
                    voting = parseInt(voting) + 1;
                    const updateRecord = table.update([{
                        id: records[0].recordId,
                        fields: {
                            voting: voting
                        }}]
                    );
                    if (updateRecord) {
                        // const minifiedRecords = getMinifiedRecords(updateRecord)
                        res.json({records});
                    }
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
            res.json({ message: "Smth went wrong", err })
        }
    }
}

export default favoriteCoffeeStoreById;