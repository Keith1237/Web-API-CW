const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'test';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('stations');

        const documents = [
            { "name": "Boossa", "coordinates": [80.1610723, 6.0738123], "stationNumber": "S001" },
            { "name": "Kumarakanda", "coordinates": [80.124281, 6.1123699], "stationNumber": "S002" },
            { "name": "Piyathigama", "coordinates": [80.1908071, 6.0537103], "stationNumber": "S003" },
            { "name": "Thiranagama", "coordinates": [80.1144287, 6.1223772], "stationNumber": "S004" },
            { "name": "Ginthota", "coordinates": [80.1792993, 6.0608932], "stationNumber": "S005" },
            { "name": "Panadura", "coordinates": [79.9044746, 6.7124685], "stationNumber": "S006" },
            { "name": "Kalutara North", "coordinates": [79.9542714, 6.6011889], "stationNumber": "S007" },
            { "name": "Kalutara South", "coordinates": [79.9588324, 6.5841279], "stationNumber": "S008" },
            { "name": "Payagala", "coordinates": [79.9787243, 6.5220483], "stationNumber": "S009" },
            { "name": "Dodanduwa", "coordinates": [80.1329228, 6.0982524], "stationNumber": "S010" },
            { "name": "Hikkaduwa", "coordinates": [80.1001719, 6.1420637], "stationNumber": "S011" },
            { "name": "Seenigama", "coordinates": [80.0948251, 6.1587486], "stationNumber": "S012" },
            { "name": "Kahawe", "coordinates": [80.0740547, 6.1832231], "stationNumber": "S013" },
            { "name": "Madampagama", "coordinates": [80.0613096, 6.2122502], "stationNumber": "S014" },
            { "name": "Ambalangoda", "coordinates": [80.0550417, 6.2353149], "stationNumber": "S015" },
            { "name": "Balapititya", "coordinates": [80.0433629, 6.2764091], "stationNumber": "S016" },
            { "name": "Ahungalla", "coordinates": [80.0376852, 6.3127647], "stationNumber": "S017" },
            { "name": "Kosgoda", "coordinates": [80.0294246, 6.3385525], "stationNumber": "S018" },
            { "name": "Richmond Hill", "coordinates": [80.2047937, 6.0538956], "stationNumber": "S019" },
            { "name": "Malapalla", "coordinates": [79.9750349, 6.8440633], "stationNumber": "S020" },
            { "name": "Cotta Road", "coordinates": [79.8845653, 6.9133515], "stationNumber": "S021" },
            { "name": "Kirulapona", "coordinates": [79.8829669, 6.8830434], "stationNumber": "S022" },
            { "name": "Homagama Hospital", "coordinates": [79.9924059, 6.8456887], "stationNumber": "S023" },
            { "name": "Nawinna", "coordinates": [79.9179181, 6.8528528], "stationNumber": "S024" },
            { "name": "Homagama", "coordinates": [80.0042444, 6.8456359], "stationNumber": "S025" },
            { "name": "Maharagama", "coordinates": [79.9272033, 6.8480421], "stationNumber": "S026" },
            { "name": "Narahenpita", "coordinates": [79.8779218, 6.8969082], "stationNumber": "S027" },
            { "name": "Watareka", "coordinates": [80.0598725, 6.8432048], "stationNumber": "S028" },
            { "name": "Waga", "coordinates": [80.1276029, 6.9014119], "stationNumber": "S029" },
            { "name": "Udahamulla", "coordinates": [79.9087405, 6.8622404], "stationNumber": "S030" },
            { "name": "Pannipitiya", "coordinates": [79.948894, 6.847409], "stationNumber": "S031" },
            { "name": "Padukka", "coordinates": [80.0912099, 6.8426782], "stationNumber": "S032" },
            { "name": "Baseline Road", "coordinates": [79.8785165, 6.9263756], "stationNumber": "S033" },
            { "name": "Pinwatta", "coordinates": [79.916064, 6.6859877], "stationNumber": "S034" },
            { "name": "Katukurunda", "coordinates": [79.9659991, 6.5601827], "stationNumber": "S035" },
            { "name": "Induruwa", "coordinates": [80.0087108, 6.3874272], "stationNumber": "S036" },
            { "name": "Mahainduruwa", "coordinates": [80.0140488, 6.3644608], "stationNumber": "S037" },
            { "name": "Maggona", "coordinates": [79.9814557, 6.5048663], "stationNumber": "S038" },
            { "name": "Kandegoda", "coordinates": [80.0529491, 6.250272], "stationNumber": "S039" },
            { "name": "Beruwala", "coordinates": [79.9836883, 6.4768931], "stationNumber": "S040" },
            { "name": "Payagala North", "coordinates": [79.9749255, 6.5316754], "stationNumber": "S041" },
            { "name": "Akurala", "coordinates": [80.0648773, 6.1921065], "stationNumber": "S042" },
            { "name": "Rathgama", "coordinates": [80.1400164, 6.0933353], "stationNumber": "S043" },
            { "name": "Telwatte", "coordinates": [80.0889326, 6.1691433], "stationNumber": "S044" },
            { "name": "Aluthgama", "coordinates": [80.0002675, 6.4323352], "stationNumber": "S045" },
            { "name": "Pinnawala", "coordinates": [80.1173281, 6.8692902], "stationNumber": "S046" },
            { "name": "Egoda Uyana", "coordinates": [79.8916572, 6.7429318], "stationNumber": "S047" },
            { "name": "Moratuwa", "coordinates": [79.8817806, 6.7743504], "stationNumber": "S048" },
            { "name": "Pathagama Railway Station", "coordinates": [80.0423357, 6.293837], "stationNumber": "S049" },
            { "name": "Andadola", "coordinates": [80.046979, 6.2663183], "stationNumber": "S050" },
            { "name": "Angampitya", "coordinates": [80.1094043, 6.8529835], "stationNumber": "S051" },
            { "name": "Gammana", "coordinates": [80.1231952, 6.8771479], "stationNumber": "S052" },
            { "name": "Hettimulla", "coordinates": [79.9907635, 6.4578453], "stationNumber": "S053" },
            { "name": "Koralawalla", "coordinates": [79.8858995, 6.7584126], "stationNumber": "S054" },
            { "name": "Liyanwala", "coordinates": [80.0798255, 6.8383764], "stationNumber": "S055" },
            { "name": "Morakele", "coordinates": [80.1239359, 6.8831892], "stationNumber": "S056" },
            { "name": "Pangiriwatta", "coordinates": [79.9023009, 6.8649493], "stationNumber": "S057" },
            { "name": "Pathegamgoda", "coordinates": [80.0418131, 6.2961401], "stationNumber": "S058" },
            { "name": "Piyagama", "coordinates": [80.0336688, 6.3293476], "stationNumber": "S059" },
            { "name": "Ambalangoda Railway Station", "coordinates": [80.0549325, 6.2353754], "stationNumber": "S060" },
            { "name": "Bentota", "coordinates": [79.9966032, 6.4221857], "stationNumber": "S061" },
            { "name": "Kalutara North", "coordinates": [79.9543105, 6.6012196], "stationNumber": "S062" },
            { "name": "Wadduwa", "coordinates": [79.928625, 6.6632413], "stationNumber": "S063" },
            { "name": "Waskaduwa", "coordinates": [79.940313, 6.632534], "stationNumber": "S064" },
            { "name": "Ratmalana", "coordinates": [79.8668707, 6.8151872], "stationNumber": "S065" },
            { "name": "Mount Lavinia", "coordinates": [79.8628581, 6.8312504], "stationNumber": "S066" },
            { "name": "Angulana", "coordinates": [79.8727054, 6.7988303], "stationNumber": "S067" },
            { "name": "Lunawa", "coordinates": [79.8755526, 6.7839526], "stationNumber": "S068" },
            { "name": "Pinwatta Railway Station", "coordinates": [79.9160026, 6.6860411], "stationNumber": "S069" }
            // Add more route documents here if needed
        ];
        
        const result = await collection.insertMany(documents);
        console.log(`${result.insertedCount} documents inserted with ids: ${result.insertedIds}`);
    } finally {
        await client.close();
    }
}

run().catch(console.error);
