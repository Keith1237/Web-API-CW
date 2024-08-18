const { MongoClient } = require('mongodb');
require('dotenv').config();


const uri = 'mongodb+srv://keithpraveen23:sO93TheO4oqw7WsB@srilankarailwayscluster.mz5wcjc.mongodb.net/';


const dbName = 'test';


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        
        await client.connect();
        console.log('Connected successfully to server');

        // Select the database
        const db = client.db(dbName);

        // Select/create a collection (this happens automatically when you first insert data)
        const collection = db.collection('lines');

        // Insert a single document
        const document = {
            routeNumber: '003',
            startStation: 'Colombo Fort',
            endStation: 'Badulla',
            coordinates: [
                [79.8500,6.9337] , //Colombo fort
                    [79.8651, 6.9295], //Maradana
                    [79.8792,6.9375], //Dematagoda
                    [79.8945,6.9611], // Kalaniya
                    [79.8992,6.9757], //Wanawasala
                    [79.9004,6.9876], //  Hunupitiya
                    [79.9069,7.0003], // Ederamulla
                    [79.9311,7.0471], // Walpola
                    [79.9372,7.0551], // Batuwaththa
                    [79.9456,7.0661], // Bulugahagoda
                    [79.9600,7.0686], // Ganemulla
                    [79.9738,7.0747], // Yagoda
                    [79.9937,7.0935], // Gampaha
                    [80.0205, 7.1224], // Bemmulla
                    [80.0586, 7.1528], // Veyangoda
                    [80.0661, 7.1676], // Wadurawa
                    [80.0900, 7.1987], // Pallewela
                    [80.1051, 7.2129], // Ganegoda
                    [80.1267, 7.2425], // Meerigama
                    [80.1352, 7.2563], // Wilwatta
                    [80.1532, 7.2567], // Botale
                    [80.1693, 7.2561], // Ambepussa
                    [80.1944, 7.2705], // Yaththalgoda
                    [80.2386, 7.2933], // Alawwa
                    [80.2691, 7.3138], // Walakumbura
                    [80.3006, 7.3308], // Polgahawela Junction
                    [80.3643, 7.3185], // Yatagama
                    [80.3902, 7.3213], // Rambukkana
                    [80.4335, 7.3180], // Kadigamuwa
                    [80.4546, 7.2962], // Gangoda
                    [80.4694, 7.2886], // Ihala Kotte
                    [80.4964, 7.2618], // Bambaragala
                    [80.5208, 7.2578], // Kadugannawa
                    [80.5526, 7.2669], // Pilimatalawa
                    [80.5930, 7.2682], // Barammane
                    [80.5830, 7.2674], // Kiribathkumbura
                    [80.5902, 7.2575], // Peradeniya Junction
                    [80.5986, 7.2139], // Gelioya
                    [80.5668, 7.1622], // Gampola
                    [80.5616, 7.1452], // Wallahagoda
                    [80.5593, 7.1332], // Tembiligala
                    [80.5597, 7.1084], // ulapane
                    [80.5408, 7.0742], // Warakawa
                    [80.5351, 7.0570], // Nawalapitiya
                    [80.5311, 7.0328], // Hieghtenford
                    [80.5456, 7.0182], // Inguruoya
                    [80.5299, 6.9867], // Galboda
                    [80.5260, 6.9620], // watawala
                    [80.5376, 6.9500], // Ihala Watawala
                    [80.5975, 6.8932], // Hatton
                    [80.6086, 6.9284], // Kotagala
                    [80.6611, 6.9401], // Thalawakelle
                    [80.7167, 6.9447], // Radella
                    [80.8306, 6.8559], // Pattipola
                    [80.8430, 6.8177], // Ohiya 
                    [80.8968, 6.7794], // Idalgashinna  
                    [80.9576, 6.7683], // Haputale
                    [80.9876, 6.8289], // Bandarawela
                    [81.0059, 6.8298], // Kinigama
                    [81.0257, 6.8443], // Heeloya
                    [81.0471, 6.8758], // Ella
                    [81.0629, 6.9028], // Demodara
                    [81.0597, 6.9800], // badulla
            ]
        };
        const result = await collection.insertOne(document);
        console.log(`Document inserted with id: ${result.insertedId}`);
    } finally {
        // Ensure the client closes when you finish
        await client.close();
    }
}

// Run the async function
run().catch(console.error);

