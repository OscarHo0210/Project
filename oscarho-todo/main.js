const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

//connect to db
mongoose.connect("mongodb+srv://oscar:oscar@cluster0.q7snbas.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) =>{
    if(!err){
        console.log("connect to db");
    }else {
        console.log("error");
    }
})

//schema

const sch = {
    name: String,
    user: String,
    id: Number,
    date: String,
    done: Boolean
}
const monmodel = mongoose.model("NEWCOL", sch);

//POST
app.post("/post/task", async(req,res)=>{
    console.log("inside post function");
    const data = new monmodel({
        name: req.body.name,
        user: req.body.user,
        id: req.body.id,
        date: req.body.date,
        done: req.body.done
    });

    const val = await data.save();
    res.send("posted");
})

//PATCH
app.patch("/patch/:id", async(req,res)=>{
    let patchid = req.params.id;
    let patchname = req.body.name;
    let patchuser = req.body.user;
    let patchdate = req.body.date;
    let patchdone = req.body.done;

    monmodel.findOneAndUpdate({id:patchid},{$set: {name : patchname, 
        user : patchuser, 
        date : patchdate, 
        done : patchdone
    }}, 
        {new:true},(err,data) => {
            if(data == null){
                res.send("Nothing found");
            }else {
                res.send(data);
            }
        })
})

//PUT

app.put("/put/:id", async(req,res)=>{
    let putid = req.params.id;
    let putname = req.body.name;
    let putuser = req.body.user;
    let putdate = req.body.date;
    let putdone = req.body.done;

    monmodel.updateOne({id:putid},{$set:{name : putname, 
        user : putuser, 
        date : putdate, 
        done : putdone
    }},
        {new:true},(err,data) =>{
            if(data == null){
                res.send("No success");
            }else {
                res.send(data);
            }
        })
})


//GET

app.get('/get/:id',async(req,res) => {
    getid = req.params.id;
    console.log(req.params);
    monmodel.find(({id : getid}), function(err,val){
        if(err){
            res.send("error");
        }else {
            if(val.length == 0){
                res.send("data doesn't exist");
            }else {
                res.send(val);
            }
        }
    })
})

//DELETE

app.delete('/delete/:id', function(req,res){
    let delid = req.body.id;
    monmodel.findOneAndDelete(({id:delid}), function(err,docs){
        res.send(docs);
    })
})

//GET ALL

app.get('/getAll', (req, res) => {
    monmodel.find((err, val) => {
        if (err){
            console.log("error");
        } else{
            res.json(val);
        }
    })
})
// 監聽 port，部屬到Heroku用
var port = process.env.PORT || 3000;
//app.listen(port);

//module.exports = app;
app.listen(process.env.PORT || 3000, () =>{
    console.log("on port");
})