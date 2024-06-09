
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const tweetSchema = new mongoose.Schema({
     tweet: {
          type: String,
          required: true
     },
     user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     likes: {
          users:[{
               type: String,
          }]

     },

     comments: [{
          user: {
               type: Schema.Types.ObjectId,
               ref: 'User'
          },
          comment: {
               type: String,
               required: true
          }
     
     }]


},
{
     timestamps: true

})

export const Tweet = mongoose.model('Tweet', tweetSchema);