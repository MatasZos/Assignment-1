import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('app');
    const users = db.collection('Users');

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 401 });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Success
    return Response.json({ success: true, userId: user._id });
  } catch (err) {
    console.error('Error logging in:', err);
    return Response.json({ error: 'Failed to login' }, { status: 500 });
  } finally {
    await client.close();
  }
}