import { Schema, model, Types } from "mongoose";

interface ICharacteristics {
    year: number;
    rating: number;
    price: number;
    availability: string;
}

interface IFlipper {
    name: string;
    brandId: Types.ObjectId;
    characteristics: ICharacteristics;
    images: string[];
}

const characteristicsSchema = new Schema<ICharacteristics>({
    year: { type: Number, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    availability: { type: String, required: true, trim: true },
});

const flipperSchema = new Schema<IFlipper>({
    name: { type: String, required: true, trim: true },
    brandId: { type: Schema.Types.ObjectId, required: true, ref: "Brand" },
    characteristics: { type: characteristicsSchema, required: true },
    images: { type: [String], required: true },
});

const Flipper = model<IFlipper>("Flipper", flipperSchema);
export { Flipper, IFlipper };
