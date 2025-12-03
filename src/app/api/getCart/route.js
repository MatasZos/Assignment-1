import { MongoClient } from 'mongodb';

export async function GET(req) {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({ error: 'Missing userId' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('app');
    const carts = db.collection('Carts');

    const cart = await carts.findOne({ userId });

    return Response.json({ success: true, items: cart?.items || [] });
  } catch (err) {
    console.error('Error fetching cart:', err);
    return Response.json({ error: 'Failed to fetch cart' }, { status: 500 });
  } finally {
    await client.close();
  }
}