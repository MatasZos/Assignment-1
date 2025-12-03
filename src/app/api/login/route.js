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

  const user = await users.findOne({ email });

  let valid = false;
  let role = null;

  if (user && await bcrypt.compare(pass, user.passwordHash)) {
    valid = true;
    role = user.role;
  }

  // return result
  return Response.json({ valid, role });
}