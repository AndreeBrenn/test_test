const invoice = require("../models/invoiceModel");
const asyncHandler = require("express-async-handler");

const add_invoice = asyncHandler(async (req, res) => {
  const { number, customerName, products } = req.body;

  try {
    const create_invoice = await invoice.create({
      invoiceNumber: number,
      CustomerName: customerName,
      UploaderId: req.user.id,
      Product: products,
    });

    return res.status(201).json(create_invoice);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const get_invoice = asyncHandler(async (req, res) => {
  try {
    const getAll = await invoice.find();

    return res.status(200).json(getAll);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const delete_invoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await invoice.deleteOne({ _id: id });
    const newData = await invoice.find();

    return res.status(200).json(newData);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const update_data = asyncHandler(async (req, res) => {
  const { id, name, invoicenum } = req.body;

  try {
    const update = await invoice.findByIdAndUpdate(
      { _id: id },
      {
        invoiceNumber: invoicenum,
        CustomerName: name,
      }
    );

    return res.status(200).json(update);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  add_invoice,
  get_invoice,
  delete_invoice,
  update_data,
};
