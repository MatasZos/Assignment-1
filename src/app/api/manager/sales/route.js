import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const orders = db.collection('Orders');

  const result = await orders.find({ status: "confirmed" }).sort({ createdAt: 1 }).toArray();

  let cumulative = 0;
  const data = result.map(order => {
    cumulative += order.total || 0; 
    return {
      date: order.createdAt,
      revenue: cumulative
    };
  });

  return Response.json(data);
}