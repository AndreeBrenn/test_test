import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiFillFileAdd } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import InvoiceForm from "../components/InvoiceForm";
import axios from "axios";
import { API_INVOICE } from "../utils/Urls";
import moment from "moment";
import UpdateForm from "../components/UpdateForm";
import { useSelector } from "react-redux";

const ListPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    axios
      .get(API_INVOICE + "get-all")
      .then((res) => setInvoiceData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const remove_invoice = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    axios
      .delete(API_INVOICE + `remove-invoice/${id}`, config)
      .then((res) => {
        setInvoiceData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const update_toggle = (item) => {
    setSingleData(item);
    setUpdateToggle(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="mt-20 w-full flex">
        <div className="w-full justify-end items-end flex p-3">
          <button
            className="mt-10 text-green-600 font-Roboto p-2 flex items-center rounded-md hover:(bg-gray-400)"
            onClick={() => setToggleAdd(true)}
          >
            <AiFillFileAdd className="mr-2" /> Add Invoice
          </button>
        </div>
      </div>
      <AnimatePresence>
        {toggleAdd && <InvoiceForm setToggleAdd={setToggleAdd} />}
      </AnimatePresence>
      <div className="w-full p-4">
        <table className="p-4 w-full">
          <tr>
            <th className="text-left">INVOICE NUMBER</th>
            <th className="text-left">Customer name</th>
            <th className="text-left">Date</th>
            <th>action</th>
          </tr>
          {invoiceData.map((items) => {
            return (
              <tr>
                <td className="text-left">{items.invoiceNumber}</td>
                <td className="text-left">{items.CustomerName}</td>
                <td className="text-left">
                  {moment(items.createdAt).format("MM/DD/YYYY")}
                </td>
                <td className="flex items-center justify-center">
                  <button
                    className="bg-green-400 mr-2 w-18 rounded-md"
                    onClick={() =>
                      update_toggle({
                        _id: items._id,
                        products: items.Product,
                        customerName: items.CustomerName,
                        invoiceNum: items.invoiceNumber,
                      })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-400 w-15 rounded-md"
                    onClick={() => remove_invoice(items._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <AnimatePresence>
        {updateToggle && (
          <UpdateForm
            setUpdateToggle={setUpdateToggle}
            singleData={singleData}
            setSingleData={setSingleData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListPage;
