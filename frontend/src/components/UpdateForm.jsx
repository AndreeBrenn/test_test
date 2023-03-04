import React from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { API_INVOICE } from "../utils/Urls";
import { useSelector } from "react-redux";

const UpdateForm = ({ setUpdateToggle, singleData, setSingleData }) => {
  const { user } = useSelector((state) => state.auth);
  const update_data = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    const data = {
      id: singleData._id,
      name: singleData.customerName,
      invoicenum: singleData.invoiceNum,
    };

    axios
      .put(API_INVOICE + "update-invoice", data, config)
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
          onSubmit={update_data}
        >
          <AiFillCloseCircle
            className="absolute right-2 top-2 text-[25px] text-red-500 cursor-pointer"
            onClick={() => setUpdateToggle(false)}
          />
          <div className="w-full flex my-2">
            <div className="flex flex-col">
              <span>Customer name:</span>
              <input
                className="h-8 border border-black"
                value={singleData.customerName}
                onChange={(e) =>
                  setSingleData({ ...singleData, customerName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full  flex my-2">
            <div className="flex flex-col ">
              <span className="h-8">Invoice Number:</span>
              <input
                className="h-8 border border-black"
                value={singleData.invoiceNum}
                onChange={(e) =>
                  setSingleData({ ...singleData, invoiceNum: e.target.value })
                }
              />
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
              {singleData.products.map((data, index) => {
                return (
                  <tr>
                    <td className="text-left">{data.item}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                    <td>{data.price * data.quantity}</td>
                  </tr>
                );
              })}

              <tr>
                <td>
                  Total:
                  {singleData.products.reduce((curr, next) => {
                    return curr + next.total;
                  }, 0)}{" "}
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

export default UpdateForm;
