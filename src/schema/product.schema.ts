import { models, model, Schema } from 'mongoose';

const productSchema = new Schema({
  imageUUID:String,
  upc: String,
  x: String,
  y:String,
  width:String,
  height:String,
  productShortName:String,
  brandName:String, 
  shelfLevel:String,
  productName:String
},{timestamps:true});
productSchema.virtual('lastMessageVirtual',{
  ref:'Message',
  localField:'lastMessage',
  foreignField:'messageId',
  justOne:true
})
export default models.product ?? model('product', productSchema);
