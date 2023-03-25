import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  SenderID: {
    type: String,
    required: true
  },
  ReceiverID: {
    type: String,
    required: true
  },
  Messages: [{
    MessageText: {
      type: String,
      default:""
    },
    Owner:{
        type:String,
        default:""
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});


export default mongoose.model('Chat', ChatSchema);
