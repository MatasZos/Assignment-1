import { MongoClient } from 'mongodb';

// API route to add a product to the cart for a specific user
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pname = searchParams.get('pname');
  const email = searchParams.get('email');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const products = db.collection('Products');
  const carts = db.collection('Carts');
  const product = await products.findOne({ pname });

  await carts.insertOne({
    userEmail: email,
    items: [product],
    createdAt: new Date(),
    status: "pending"
  });

  return Response.json({ data: "Product added to cart" });
}