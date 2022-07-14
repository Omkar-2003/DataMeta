const express=require("express");
const bodyParser=require("body-parser");
const https = require("https");
const request=require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");


const app=express();
// const request=require("request");

app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));
app.use(express.static(__dirname));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
  console.log(res.statusCode);
 res.statusCode;

});

//API KEY
//64ff662b5accdfca363dd7e5051caae6-us10

//LIST id
//36abbe0dec.


app.post("/",function(req,res){
var firstname=req.body.fname;
var lastname=req.body.lname;
var email=req.body.email;
console.log(firstname,lastname,email);

var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME:  lastname
      }
    }
]
};

// https://usX.api.mailchimp.com/3.0/lists/{list_id}?fields=name
const jsonData=JSON.stringify(data);
console.log(jsonData);

const url="https://us10.api.mailchimp.com/3.0/lists/36abbe0dec";

const options={
  method:"POST",
  auth: "omkar:64ff662b5accdfca363dd7e5051caae6-us10"
}


  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
});


request.write(jsonData);
request.end();


});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT ||3000,function(){
  console.log("Here server is started at port 3000");
});
