const { application } = require("express");
const express=require("express");
const ussd=express();


ussd.use(express.json());
ussd.use(express.urlencoded({extended:true}));

ussd.post('/ussd/post',async(req,res)=>{

const phoneNumber=req.body.phoneNumber;
const serviceCode=req.body.serviceCode;
const text=req.body.text;
const sessionId=req.body.sessionId;
const networkCode=req.body.networkCode;

let id=""
if(text==''){
   let response=`CON WELCOME TO IWETA
    1.Chichewa
    2.English`
   
   res.send(response);
   console.log(phoneNumber);
    
}else if(text=='1'){
    let response=`CON lowetsani nambala yanu ya chinsisi`
    res.send(response);
}else if(text=='2'){
    let response=`CON Enter your ID`
res.send(response);
    id=text.split("*");
    text=id[1];

}else if (text==""){

    console.log(`the id is ${text}`);
    let response =`END THANK YOU`
    res.send(response);
}


});

ussd.get('/ussd/get',async(req,res)=>{
 res.send('hello veya');
});



module.exports =ussd;