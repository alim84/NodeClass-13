const { default: mongoose } = require("mongoose");

async function dbConnect() {
    try{
        mongoose.connect(process.env.DB_URL).then(()=>{
            console.log("data base is concect")
        })

    }catch(error){
        console.log(error)
    }
}

module.exports=dbConnect