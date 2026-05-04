import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? process.env.MINGODB_URI;
const dbName = "portfolio";

if (!uri) {
  throw new Error("Missing MongoDB connection string. Set MONGODB_URI in .env.local.");
}

let clientPromise: Promise<MongoClient>;

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function createClientPromise() {
  const client = new MongoClient(uri);

  return client.connect().catch((error) => {
    if (process.env.NODE_ENV === "development") {
      globalForMongo._mongoClientPromise = undefined;
    }

    throw error;
  });
}

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = createClientPromise();
  }

  clientPromise = globalForMongo._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export async function getFeedbackCollection() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collectionName = "user_feedback";
  const collections = await db
    .listCollections({ name: collectionName }, { nameOnly: true })
    .toArray();
  let tableCreated = false;

  if (collections.length === 0) {
    await db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["feedback", "createdAt"],
          properties: {
            feedback: {
              bsonType: "string",
              minLength: 1,
              maxLength: 1000,
            },
            page: {
              bsonType: "string",
            },
            userAgent: {
              bsonType: "string",
            },
            createdAt: {
              bsonType: "date",
            },
          },
        },
      },
    });
    tableCreated = true;
  }

  const collection = db.collection(collectionName);
  await collection.createIndex({ createdAt: -1 }, { name: "createdAt_desc" });

  return {
    client,
    db,
    collection,
    collectionName,
    tableCreated,
  };
}
