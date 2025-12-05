import { MongoClient } from 'mongodb';

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const orders = db.collection('Orders');

  await orders.insertOne({
    userEmail: email,
    items: [], 
    createdAt: new Date(),
    status: "confirmed"
  });

  return Response.json({ message: "Order confirmed" });
}