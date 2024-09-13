const {Client}=require('pg')

const client=new Client({
    host:'localhost',
    port:5432,
    database:'CharityDB',
    user:'postgres',
    password:'admin'
})
client.connect((err)=>{
    if(err){
console.log("connection error",err.stack)
    }else{
        console.log("Connected")
    }
})
module.exports=client;
