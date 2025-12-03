import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  const uri = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('app');
  const users = db.collection('Users');

  const hash = await bcrypt.hash(pass, 10);
  await users.insertOne({ email, passwordHash: hash, role: "customer" });

  return Response.json({ data: "registered" });
}