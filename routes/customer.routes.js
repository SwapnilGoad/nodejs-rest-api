const errors = require("restify-errors");
const Customer = require("../models/customer.model");

module.exports = app => {
  // Get All Customers
  app.get("/api/customers", async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  //Get a single customer by id
  app.get("/api/customers/:id", async (req, res, next) => {
    try {
      const customers = await Customer.findById(req.params.id);
      res.send(customers);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });

  // Add a Customer

  app.post("/api/customers", async (req, res, next) => {
    //Check for content type
    if (!req.is("application/json")) {
      return next(new errors.BadRequestError("Expects 'application/json'"));
    }

    try {
      const { name, email, balance } = req.body;
      const customer = new Customer({
        name,
        email,
        balance
      });

      const newCustomer = await customer.save();
      //send created response status
      res.send(201);
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  //Update a Customer
  app.put("/api/customers/:id", async (req, res, next) => {
    //Check for content type
    if (!req.is("application/json")) {
      return next(new errors.BadRequestError("Expects 'application/json'"));
    }

    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      //Send OK response status
      res.send(200);
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });

  //Delete Customer
  app.del("/api/customers:id", async (req,res,next)=>{
    try{
      const customer = await Customer.findOneAndRemove({_id : req.params.id});
      //send deleted response status
      res.send(204);
      next();
    }
    catch(err){
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  })
};
