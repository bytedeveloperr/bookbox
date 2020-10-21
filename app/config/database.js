const mongoose = require("mongoose")

let options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URI, options)
.then(() => print("Database Connected Successfully"))
.catch(e => print(`Error occured when connecting to database due to: ${e}`))