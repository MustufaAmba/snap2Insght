import { models, model, Schema } from 'mongoose';

const shelfSchema = new Schema({
  imageUUID: String,
  url:String,
  name:String,
},{timestamps:true});

export default models.shelf || model('shelf', shelfSchema);
