import { MongoClient } from 'mongodb';

export async function POST(req) {
  const { email, items } = await req.json();

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const orders = db.collection('Orders');

  await orders.insertOne({
    userEmail: email,
    items,
    createdAt: new Date(),
    status: "confirmed"
  });

  return Response.json({ message: "Order confirmed" });
}