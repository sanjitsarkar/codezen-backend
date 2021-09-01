const { Schema, model } = require("mongoose")


const codeSchema = new Schema({
    "share":{type: Boolean, default:false },
    "lang": { type: String, required: [true, "Language is required"] },
    "user_id": { type: String,required:[true,"UserID is required"] },
    "title": { type: String, required: [true, "Title is required"] },
    "code": { type: String },
    "format":{ type: String, required: [true, "Format is required"] },
},
{
    timestamps:true

})
codeSchema.index({title:"text",lang:"text"})
// codeSchema.pre("updateOne", async function(next){

// console.log("UpdateOnePost",this.path);
//     next()
    
    
// })
// codeSchema.pre("save", async function(next){
//     this.path = await encrypt(this.path)
// console.log("SaveOne",this.path);

//     next()
    
    
// })
// codeSchema.post("init", async function(next){
//     this.path = await dencrpyt(this.path)
//        console.log("Path Denc",this.path);


//     next()
    
    
// })




const Code = model("Code", codeSchema)

module.exports = Code

