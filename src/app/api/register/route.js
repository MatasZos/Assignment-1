import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);

  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('app');
    const users = db.collection('Users');

    // Check if user already exists
    const existing = await users.findOne({ email });
    if (existing) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await users.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return Response.json({ success: true, userId: result.insertedId });
  } catch (err) {
    console.error('Error registering user:', err);
    return Response.json({ error: 'Failed to register' }, { status: 500 });
  } finally {
    await client.close();
  }
}