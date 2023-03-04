const express = require("express");
const router = express.Router();
const {
  add_invoice,
  get_invoice,
  delete_invoice,
  update_data,
} = require("../controller/invoice");
const { protect } = require("../middleware/authMiddleware");

router.post("/add-invoice", protect, add_invoice);
router.get("/get-all", get_invoice);
router.delete("/remove-invoice/:id", protect, delete_invoice);
router.put("/update-invoice", protect, update_data);
module.exports = router;
