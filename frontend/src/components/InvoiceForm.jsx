import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_INVOICE } from "../utils/Urls";

const InvoiceForm = ({ setToggleAdd }) => {
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const [pickedProduct, setPickedProduct] = useState({
    item: "",
    price: 0,
    quantity: 0,
    total: 0,
  });
  const [invoiceInfo, setInvoiceInfo] = useState({
    number: "",
    customerName: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setItems(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const whenPickedItem = (id) => {
    const picked = items.find((element) => element.id == id);

    setPickedProduct({
      ...pickedProduct,
      item: picked.title,
      price: picked.price,
    });
  };

  const add_to_picked = () => {
    setProducts([
      ...products,
      { ...pickedProduct, total: pickedProduct.quantity * pickedProduct.price },
    ]);
  };

  const remove_array = (index) => {
    const newItems = products.filter((value) => value.item !== index);
    setProducts(newItems);
  };

  const submit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };

    const data = {
      number: invoiceInfo.number,
      customerName: invoiceInfo.customerName,
      products: products,
    };

    axios
      .post(API_INVOICE + "add-invoice", data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <motion.div className="fixed h-full w-full  top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-99 ">
      <motion.div
        className="absolute flex h-150 w-120 bg-white flex-col items-center z-99 "
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
      >
        <form
          className="h-full w-full flex relative flex-col p-4"
          onSubmit={submit}
        >
          <AiFillCloseCircle
            className="absolute right-2 top-2 text-[25px] text-red-500 cursor-pointer"
            onClick={() => setToggleAdd(false)}
          />
          <div className="w-full flex my-2">
            <div className="flex flex-col">
              <span>Customer name:</span>
              <input
                className="h-8 border border-black"
                onChange={(e) =>
                  setInvoiceInfo({
                    ...invoiceInfo,
                    customerName: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="w-full  flex my-2">
            <div className="flex flex-col ">
              <span className="h-8">Invoice Number:</span>
              <input
                className="h-8 border border-black"
                onChange={(e) =>
                  setInvoiceInfo({ ...invoiceInfo, number: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span>ADD ITEM</span>
            <div className="flex w-full">
              <select
                className="h-10 border w-40 mr-2 border-black"
                onChange={(e) => whenPickedItem(e.target.value)}
              >
                <option vlaue="" selected hidden>
                  Choose a product
                </option>
                {items.map((item) => {
                  return <option value={item.id}>{item.title}</option>;
                })}
              </select>

              <input
                type="number"
                onChange={(e) =>
                  setPickedProduct({
                    ...pickedProduct,
                    quantity: e.target.value,
                  })
                }
                placeholder="Quantity"
                className="h-10 w-25 border border-black mr-3"
              />
              <button
                className="h-10 w-20 bg-green-400 rounded-md flex items-center justify-center"
                type="button"
                onClick={add_to_picked}
              >
                <FiPlus className="mr-2" /> Add
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <table>
              <tr>
                <th className="text-left">Product Name</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Price</th>
                <th className="text-left">Subtotal</th>
                <th className="text-left"> </th>
              </tr>
              {products.map((data, index) => {
                return (
                  <tr>
                    <td className="text-left">{data.item}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                    <td>{data.price * data.quantity}</td>
                    <td>
                      <button
                        className="bg-red-400"
                        onClick={() => remove_array(data.item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  Total:{" "}
                  {products.reduce((curr, next) => {
                    return curr + next.total;
                  }, 0)}
                </td>
              </tr>
            </table>
            <button
              className="absolute bottom-4 left-5 bg-green-500 w-30 rounded-md"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default InvoiceForm;
