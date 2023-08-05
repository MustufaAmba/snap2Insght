import connectDB from '@/utils/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import ShelfSchema from '@/schema/shelf.schema';
import ProductSchema from '@/schema/product.schema';
import fs from 'fs'
import path from 'path'
import * as formidable from 'formidable';
import { storage } from '@/firebase.config'
import {
  ref,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
export const config = {
  api: {
    bodyParser: false
  }
}
const basePath = path.join(__dirname, '../../../../public/files')

const saveProductDetails = async (file: formidable.File[]) => {
  const { newFilename, originalFilename, filepath } = file[0]
  // const data = fs.readFileSync(`${basePath}/${originalFilename}`,'utf-8')
  const imageUUID = originalFilename?.split('.')[0]
  const isProductsExists = await ProductSchema.findOne({ imageUUID })
  if(!isProductsExists)
  {
    const data = fs.readFileSync(filepath, 'utf-8')
    const csvRows = data.split('\n')
    const keys = csvRows[0].split(',')
    const jsonData: any = []
    csvRows.forEach((row, index) => {
      if (index) {
        const values = row.split(',')
        let obj: { [key: string]: string } = {}
        keys.forEach((key, index) => {
          obj[key.trim()] = values[index]
        })
        jsonData.push(obj)
      }
    })
    await ProductSchema.insertMany(jsonData)
    return jsonData
  }
return []
}

const saveImage = async (file: formidable.File[]) => {
  const { originalFilename, filepath, mimetype } = file[0]
  const data = fs.readFileSync(filepath)
  const metadata = {
    contentType: mimetype as string,
  };
  const imageUUID = originalFilename?.split('.')[0]
  const isFileExists = await ShelfSchema.findOne({ imageUUID })
  if (!isFileExists) {
    const storageRef = ref(storage, `practice/${originalFilename}`);
    const uploadTask = uploadBytes(storageRef, data, metadata);
    await uploadTask
      .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await ShelfSchema.create({
            name: originalFilename,
            url: downloadURL,
            imageUUID
          })
        });
      })
      .catch((error) => console.log(error));
  }

  // fs.unlinkSync(filePath);
}

const postReq = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("inside")
    const form = new formidable.IncomingForm({ uploadDir: basePath, maxFileSize: 200 * 1024 * 1024 })
    form.parse(req, async (error, fields, files) => {
      const { imageFile, analyticsFile } = files
      await saveImage(imageFile as formidable.File[])
      const result = await saveProductDetails(analyticsFile as formidable.File[])
      return res.status(200).json({
        data: result,
        message: 'Success',
      });
    })

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.method === 'POST' ? postReq(req, res) : res.status(500).json({ message: 'Internal server error' });
};

export default connectDB(handler);
