import mongoose from 'mongoose';

const uri = 'mongodb+srv://Hemang_singh:hanu472008@cluster0.mdztwy4.mongodb.net/TAS?appName=Cluster0';

async function checkDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to TAS database.');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in TAS:', collections.map(c => c.name));
    
    // Also check tirupati_automobiles
    const db2 = mongoose.connection.client.db('tirupati_automobiles');
    const collections2 = await db2.listCollections().toArray();
    console.log('Collections in tirupati_automobiles:', collections2.map(c => c.name));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDB();
