import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
const connectDB =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      console.log('Connected to existing mongoDb database');
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to new mongoDb database');

    return handler(req, res);``
  };
export default connectDB;