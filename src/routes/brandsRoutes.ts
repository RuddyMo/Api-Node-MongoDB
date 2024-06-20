import { Hono } from "hono";
import { Brand } from "../models/brands";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath("/brands");

api.get("/", async (c) => {
    const allBrands = await Brand.find({});
    return c.json(allBrands);
});

api.get("/:brandId", async (c) => {
    const _id = c.req.param("brandId");
    if (isValidObjectId(_id)) {
        const oneBrand = await Brand.findOne({ _id });
        return c.json(oneBrand);
    }
    return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
    const body = await c.req.json();
    try {
        const newBrand = new Brand(body);
        const saveBrand = await newBrand.save();
        return c.json(saveBrand, 201);
    } catch (error: any) {
        return c.json(error._message, 400);
    }
});

api.put("/:brandId", async (c) => {
    const _id = c.req.param("brandId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const q = { _id };
    const updateQuery = { ...body };
    const tryToUpdate = await Brand.findOneAndUpdate(q, updateQuery, {
        new: true,
    });
    return c.json(tryToUpdate, 200);
});

api.patch("/:brandId", async (c) => {
    const _id = c.req.param("brandId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const q = { _id };
    const updateQuery = { $set: { ...body } };
    const tryToUpdate = await Brand.findOneAndUpdate(q, updateQuery, {
        new: true,
    });
    return c.json(tryToUpdate, 200);
});

api.delete("/:brandId", async (c) => {
    const _id = c.req.param("brandId");
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const tryToDelete = await Brand.deleteOne({ _id });
    const { deletedCount } = tryToDelete;
    if (deletedCount) {
        return c.json({ msg: "DELETE done" });
    }
    return c.json({ msg: "not found" }, 404);
});

export default api;