const restify = require("restify");
const config = require("./common/configuration/settings");
const mongoose = require("mongoose");

const app = restify.createServer();

//Middleware
app.use(restify.plugins.bodyParser());

app.listen(config.PORT, () => {
  //Ensure that we are able to connect to the DB before starting the server.
  mongoose.connect(config.MONGODB_URI + "?ssl=true&replicaSet=globaldb", {
    useNewUrlParser: true,
    auth: { user: config.COSMOSDB_USER, password: config.COSMOSDB_PWD },
    //Used to instruct mongoose not to use depricated Methods.
    //ref: https://mongoosejs.com/docs/deprecations.html
    useFindAndModify: false
  });
});

const db = mongoose.connection;
db.on("error", err => console.log(err));

db.once("open", () => {
  require("./routes/customer.routes")(app);
  console.log(`Server started on port ${config.PORT}`);
});
