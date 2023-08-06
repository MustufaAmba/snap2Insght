import connectDB from '@/utils/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import ProductSchema from '@/schema/product.schema';
const getReq = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { imageUUID, query, order, orderBy, } = req.query
    let regex = new RegExp(query as string, 'i');
    let searchQuery = { imageUUID, '$or': [{ productName: regex }, { brandName: regex }, { shelfLevel: regex }] }
    const getProducts = await ProductSchema.find(searchQuery).sort({ [orderBy as string]: order === 'asc' ? 1 : -1 })
    return res.status(200).json({ message: 'success', data: getProducts, })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return req.method === 'GET' ? getReq(req, res) : res.status(500).json({ message: 'Internal server error' });
};

export default connectDB(handler);
