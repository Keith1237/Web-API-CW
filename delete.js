const { MongoClient } = require('mongodb');

async function run() {
    const uri = 'mongodb+srv://keithpraveen23:sO93TheO4oqw7WsB@srilankarailwayscluster.mz5wcjc.mongodb.net/';

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select the database and collection
        const database = client.db('test');
        const collection = database.collection('stations');

        // Delete all documents in the collection
        const result = await collection.deleteMany({});

        // Print the number of documents deleted
        console.log(`${result.deletedCount} documents deleted.`);
    } finally {
        // Close the connection
        await client.close();
    }
}

run().catch(console.dir);
