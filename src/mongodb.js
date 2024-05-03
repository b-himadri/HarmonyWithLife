// const mongoose= require('mongoose')
// mongoose.connect("mongodb://localhost:27017/HarmonyWithLife")

// .then(()=>{
//     console.log("mongodb connected");
// })

// .catch(()=>{
//     console.log("failed to connect");
// })


// const LogInSchema= new mongoose.Schema({
//         name:{
//             type:String,
//             required:true
//         },
//         password:{
//             type:String,
//             required:true
//         }

// })

// const loginandsignin_ = new mongoose.model("LoginandSignup", LogInSchema)


// const journalEntrySchema = new mongoose.Schema({
//     datetime: {
//       type: Date,
//       required: true
//     },
//     entry: {
//       type: String,
//       required: true
//     }
//   });


// const JournalEntry = new mongoose.model("JournalEntry", journalEntrySchema);

// module.exports= loginandsignin_;
// module.exports = JournalEntry;


// const JournalEntry = require('./mongodb');

// const newEntry = new JournalEntry({
//   datetime: new Date(),
//   entry: 'This is a journal entry.'
// });

// newEntry.save()
//   .then(() => {
//     console.log('Journal entry saved successfully.');
//   })
//   .catch((err) => {
//     console.error('Error saving journal entry:', err);
//   });