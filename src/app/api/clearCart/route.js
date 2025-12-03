import { MongoClient } from 'mongodb';

export async function POST(req) {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return Response.json({ error: 'Missing userId' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('app');
    const carts = db.collection('Carts');

    await carts.updateOne({ userId }, { $set: { items: [] } });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Error clearing cart:', err);
    return Response.json({ error: 'Failed to clear cart' }, { status: 500 });
  } finally {
    await client.close();
  }
}