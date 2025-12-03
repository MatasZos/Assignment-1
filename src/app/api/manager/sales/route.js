import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const orders = db.collection('Orders');

  const pipeline = [
    { $match: { status: "confirmed" } },
    { $unwind: "$items" },
    { $group: { _id: "$items.pname", count: { $sum: 1 } } }
  ];

  const salesCounts = await orders.aggregate(pipeline).toArray();

  return Response.json(salesCounts);
}