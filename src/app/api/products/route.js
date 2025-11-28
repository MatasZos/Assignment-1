import clientPromise from '@/lib/mongo';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('app');
  const products = await db.collection('Products').find({}).toArray();

  return Response.json(products);
}