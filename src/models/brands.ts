import { Schema, model, Types } from "mongoose";

interface IBrand {
    name: string;
    image: string;
    quickstart: string;
}

const brandSchema = new Schema<IBrand>({
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    quickstart: { type: String, required: true },
});

const Brand = model<IBrand>("Brand", brandSchema);
export { Brand, IBrand };