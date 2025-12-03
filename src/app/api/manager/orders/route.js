import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const orders = db.collection('Orders');

  const allOrders = await orders.find({}).toArray();

  return Response.json(allOrders);
}