import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('app');
    const products = await db.collection('products').find({}).toArray();

    return Response.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  } finally {
    await client.close();
  }
}