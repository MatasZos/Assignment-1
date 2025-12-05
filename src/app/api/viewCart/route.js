import { MongoClient } from 'mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const carts = db.collection('Carts');

  const cartItems = await carts.find({ userEmail: email }).toArray();

  return Response.json(cartItems);
}