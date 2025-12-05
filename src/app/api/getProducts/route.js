import { MongoClient } from 'mongodb';

// API route to get all products
export async function GET() {
  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const products = db.collection('Products');

  const allProducts = await products.find({}).toArray();

  return Response.json(allProducts);
}