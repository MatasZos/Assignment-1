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
    { $group: {
        _id: "$_id", 
        orderTotal: { $sum: "$items.price" },
        createdAt: { $first: "$createdAt" }
      }
    },
    { $sort: { createdAt: 1 } }
  ];

  const result = await orders.aggregate(pipeline).toArray();

  let total = 0;
  const data = result.map(order => {
    total += order.orderTotal;
    return {
      date: order.createdAt,
      revenue: total
    };
  });

  return Response.json(data);
}