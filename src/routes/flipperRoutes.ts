import { Hono } from "hono";
import { Flipper } from "../models/flipper";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath("/flippers");

api.get("/", async (c) => {
    const allFlippers = await Flipper.find({});
    return c.json(allFlippers);
});

api.get("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    if (isValidObjectId(_id)) {
        const oneFlipper = await Flipper.findOne({ _id });
        return c.json(oneFlipper);
    }
    return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
    const body = await c.req.json();
    try {
        const newFlipper = new Flipper(body);
        const saveFlipper = await newFlipper.save();
        return c.json(saveFlipper, 201);
    } catch (error: any) {
        return c.json(error._message, 400);
    }
});

api.put("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const q = { _id };
    const updateQuery = { ...body };
    const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, {
        new: true,
    });
    return c.json(tryToUpdate, 200);
});

api.patch("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    const body = await c.req.json();
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const q = { _id };
    const updateQuery = { $set: { ...body } };
    const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, {
        new: true,
    });
    return c.json(tryToUpdate, 200);
});

api.delete("/:flipperId", async (c) => {
    const _id = c.req.param("flipperId");
    if (!isValidObjectId(_id)) {
        return c.json({ msg: "ObjectId malformed" }, 400);
    }
    const tryToDelete = await Flipper.deleteOne({ _id });
    const { deletedCount } = tryToDelete;
    if (deletedCount) {
        return c.json({ msg: "DELETE done" });
    }
    return c.json({ msg: "not found" }, 404);
});

export default api;