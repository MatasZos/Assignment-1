import { MongoClient } from 'mongodb';

// API route to handle checkout and create an order
export async function POST(req) {
  //Search for the emaail
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const carts = db.collection('Carts');
  const orders = db.collection('Orders');

  const cartItems = await carts.find({ userEmail: email }).toArray();

  // If there are items in the cart, create an order
  if (cartItems.length > 0) {
    const items = cartItems.flatMap(c => c.items);
    const orderTotal = items.reduce((sum, item) => sum + (item.price || 0), 0);

    await orders.insertOne({
      userEmail: email,
      items,
      total: orderTotal,
      createdAt: new Date(),
      status: "confirmed"
    });

    await carts.deleteMany({ userEmail: email });

    return Response.json({ message: "Order confirmed", total: orderTotal });
  }

  return Response.json({ message: "Cart is empty" });
}