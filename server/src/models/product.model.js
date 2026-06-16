const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: '',
        },
        colors: [
            {
                name: String, // "Đen", "Trắng"
                images: String, // ảnh theo màu
            },
        ],
        variants: [
            {
                size: { type: String, required: true }, // "38", "39", "40"
                stock: { type: Number, default: 0 }, // tồn kho từng size
            },
        ],
        isFeatured: {
            type: Boolean,
            default: false,
        },
        productRelated: {
            // Filled at runtime in getProductById — not stored in DB as ObjectIds.
            // Using Mixed so Mongoose does not try to cast the full document array.
            type: Schema.Types.Mixed,
            default: [],
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        previewProduct: {
            // Filled at runtime in getProductById from the PreviewProduct collection.
            type: Schema.Types.Mixed,
            default: [],
        },
        favourite: {
            // Reserved for future use — keep as Mixed array.
            type: Schema.Types.Mixed,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', productSchema);
