import { errorMessages, successMessages } from "../constants/message.js";
import Product from "../models/Product.js";
import { validBody } from "../utils/validBody.js";
import productSchema from "../validations/product.js";

export const getProducts = async (req, res, next) => {
  try {
    // const { data } = await instance.get("/products");
    const data = await Product.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co san pham nao!" });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    // const { data } = await instance.post("/products", req.body);
    const resultValid = validBody(req.body, productSchema);
    if (resultValid) {
      return res.status(400).json({ message: resultValid.errors });
    }

    const data = await Product.create(req.body);
    // console.log(data);
    if (!data) {
      return res.status(400).json({ message: errorMessages.CREATE_FAIL });
    }
    return res.status(201).json({
      message: successMessages.CREATE_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    // const { data } = await instance.get(`/products/${req.params.id}`);
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: errorMessages.GET_FAIL });
    }
    return res.status(201).json({
      message: successMessages.GET_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    // const { data } = await instance.put(`/products/${req.params.id}`, req.body);
    const resultValid = validBody(req.body, productSchema);
    if (resultValid) {
      return res.status(400).json({ message: resultValid.errors });
    }

    const data = await Product.findByIdAndUpdate(`${req.params.id}`, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({ message: errorMessages.UPDATE_FAIL });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá cứng! Không dùng
export const removeProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);

    if (data) {
      return res.status(200).json({
        message: successMessages.DELETE_PRODUCT_SUCCESS,
        data,
      });
    }
    return res.status(400).json({
      message: errorMessages.DELETE_FAIL,
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá mềm

export const softRemoveProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      `${req.params.id}`,
      {
        hide: true,
      },
      {
        new: true,
      }
    );
    //! findByIdAndUpdate !== findByIdAndRemove
    if (!data) {
      return res.status(400).json({ message: errorMessages.UPDATE_FAIL });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};
