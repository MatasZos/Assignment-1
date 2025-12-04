import { MongoClient, ObjectId } from 'mongodb';

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const orders = db.collection('Orders');

  await orders.deleteOne({ _id: new ObjectId(id) });

  return Response.json({ message: "Item deleted" });
}