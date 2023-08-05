import connectDB from '@/utils/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import ShelfSchema from '@/schema/shelf.schema';
const getReq = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const getImages = await ShelfSchema.find({})
    return res.status(200).json({ message: 'success', data: getImages })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.method === 'GET' ? getReq(req, res) : res.status(500).json({ message: 'Internal server error' });
};

export default connectDB(handler);
