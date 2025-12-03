import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('app');
    const orders = db.collection('Orders');

    const allOrders = await orders.find({}).toArray();

    return Response.json({ success: true, orders: allOrders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    return Response.json({ error: 'Failed to fetch orders' }, { status: 500 });
  } finally {
    await client.close();
  }
}