const express = require("express")
const cors = require("cors")
const app = express()
const http = require('http').Server(app);
const io = require("socket.io")(http,{
    cors: {
                origin: ["http://localhost:3000","http://localhost:5000"]
            }
});
// const io = new Server(server,{
//     cors: {
//         origin: "http://localhost:3000"
//     }});
require("dotenv").config()
const session  =  require("express-session")
const codeRoutes = require("./routes/codeRoutes")
const authRoutes = require("./routes/authRoutes")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo");
// Accessing the path module
const path = require("path");


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
// var mongoUri = "mongodb+srv://xanjit:xanjit123@todoly.ygsi4.mongodb.net/todoly?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true,createIndexes:true,useFindAndModify:false }, (err,data) => {
    
    http.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
})
const sessionStore = new MongoStore({ mongoUrl:process.env.MONGODB_URI,mongoOptions:{ useUnifiedTopology: true, useNewUrlParser: true}})
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:5000"]
    ,
    credentials:true.session,methods:["GET","POST","DELETE"]}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.enable('trust proxy')
console.log("Hello",process.env.NODE_ENV)
if(process.env.NODE_ENV == 'production') {
    console.log("production")
    app.set('trust proxy', 1)
}
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    store: sessionStore,
    resave:false,
    cookie:{
        httpOnly: true, 
        secure: (process.env.NODE_ENV == 'production')? true : false,
    
}}))
const PORT = 5000
// if(process.env.NODE_ENV === 'production')
// {

  // }
io.on("connection",(socket)=>{
// console.log("Socket Connected")

    // console.log("id",id)
    socket.on("send_share",(share,id)=>{
        socket.join(id)
        console.log("Id",id)
            console.log("Share recieved ",share)
            socket.broadcast.emit("send_share",share)
    
            console.log("Share send",share)
        
        })
    })
//     socket.on("code",(code,id)=>{
//     socket.join(id)

//         socket.to(id).emit("code",code)
//         console.log("Code",code)

//     })
  
//     socket.on("output",(output,id)=>{
//     socket.join(id)
//         socket.to(id).emit("send_share",output)

//         console.log("Output",output)
    
//     })
//     socket.on("input",(input,id)=>{
//     socket.join(id)
//         socket.to(id).emit("input",input)

//         console.log("Input",input)
    
//     })
// })



// io.on("connection",(socket)=>{

// socket.on("get_code",async(id,user_id)=>{
//     // if(id)
//     console.log("ID",id,user_id)
//     const code = await findOrCreateDocument(id,user_id)
//     socket.join(id)
//     socket.emit("load_code",code)
//     socket.on("send_code",(_code,title,lang,format)=>{
//         console.log("Send",_code,title,lang,format)
//         socket.broadcast.to(id).emit("receive_code",_code,title,lang,format)
//     })
//     socket.on("save_code",async(_code,title,lang,format)=>{
//         console.log("Save",_code,title,lang,format)

//        await Code.findByIdAndUpdate(id,{code:_code,title:title,lang:lang,format:format})
//     })
   
// })
// socket.on("input",(input,id)=>{
//     // if(id)
//     socket.join(id)
//     socket.to(id).emit("input",input)
//     console.log("Input",input,"ID",id)

   
// })
// socket.on("output",(output,id)=>{
//     // if(id)

//     socket.join(id)
//     socket.to(id).emit("output",output)
//     console.log("output",output,"ID",id)

   
// })
// })
// async function findOrCreateDocument(id,user_id) {
//     if (id == null) return
  
//     const code = await Code.findById(id)
//     if (code) return code
//     return await Code.create({ _id: id, code: "",user_id,lang:"python",title:"untitled",format:"py" })
//   }
app.use("/api",authRoutes)
app.use("/api",codeRoutes)
app.use(express.static('client/build'));
console.log('Hello');
app.get('*',(req,res)=>
{
  console.log("React");
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
});
console.log('Hi');
