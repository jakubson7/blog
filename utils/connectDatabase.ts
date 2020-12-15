import mongoose from 'mongoose';

interface Connection {
  isConnected?: number | null | undefined;
}

const connection: Connection = {};

const connectDatabase = async () => {
  console.log('connected to database!');
  if (connection.isConnected) return;

  const database = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = database.connections[0].readyState;
}

export default connectDatabase;
