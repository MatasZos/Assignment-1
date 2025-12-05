import { MongoClient, ObjectId } from 'mongodb';

// API route to delete a cart item by ID
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const Carts = db.collection('Carts');

  await Carts.deleteOne({ _id: new ObjectId(id) });

  return Response.json({ message: "Item deleted" });
}