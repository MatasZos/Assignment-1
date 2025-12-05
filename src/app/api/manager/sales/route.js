import { MongoClient } from "mongodb"

const url = "mongodb+srv://root:myPassword123@cluster0.dsxawqy.mongodb.net/?appName=Cluster0";
const dbName = "app"

export async function GET() {
  console.log("in the customer api page")

    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected successfully to customer")

    const db = client.db(dbName)
    const collection = db.collection("Orders")

    const products = await collection.find({}).toArray()
    console.log("Found Products...", products)

    let total = 0;

    products.forEach(record => {
  console.log(record.total);

  total = total + record.total;
});

    await client.close()

    return Response.json({"total": total})
}