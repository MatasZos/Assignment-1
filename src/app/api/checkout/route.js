import { MongoClient } from 'mongodb';

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const carts = db.collection('Carts');
  const orders = db.collection('Orders');
  const cartItems = await carts.find({ userEmail: email }).toArray();

  if (cartItems.length > 0) {
    await orders.insertOne({
      userEmail: email,
      items: cartItems.flatMap(c => c.items), 
      createdAt: new Date(),
      status: "confirmed"
    });

    // Clear the cart
    await carts.deleteMany({ userEmail: email });

    return Response.json({ message: "Order confirmed" });
  }

  return Response.json({ message: "Cart is empty" });
}