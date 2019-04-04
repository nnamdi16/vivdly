const auth = require('../middleware/auth');
const {
  Customer,
  validate
} = require('../model/customer');
const express = require('express');
const router = express.Router();



//Create schema for the customers
// const customerschema = new mongoose.Schema({
//   name:{
//     type: String,
//     required:true,
//     minlength:5,
//     maxlength:25
//   }
// });

//Get all the customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

//Add new customers and genres
router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const customer = new Customer({
    // id: customers.length + 1,
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  // customers.push(customer);
  //Save the customer
  await customer.save();
  //Return it to the client
  res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone
  }, {
    new: true
  }); //new:true to th get the update from the request.
  // const customer = customers.find(item => item.id === parseInt(req.params.id));

  if (!customer) return res.status(404).send(`The customer with ID ${req.params.id} does not exist`);


  // customer.name = req.body.name;
  // customer.genre = req.body.genre;
  res.send(customer);
});

//delete one customer
router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  // const customer = customers.find(item => item.id === parseInt(req.params.id));
  if (!customer) return res.status(404).send(`The customer with the given ID ${req.params.id} does not exist`);
  // const index = customers.indexOf(customer);
  // customers.splice(index, 1);
  res.send(customer);
});

//Get one customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  // const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).send(`The genre with the given ID ${req.params.id} does not exist`);
  res.send(customer);
});






module.exports = router;