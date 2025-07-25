import mongoose, { model, models, Schema } from "mongoose";

export const VID_DIMENSION = {
    width: 1080,
    height: 1920
} as const

export interface Ivid {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    url: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls: boolean;
    transformation?:{
        height: number;
        width: number;
        quality?: number;
    };
}

const videoSchema = new Schema<Ivid>(
    {
        title:{type: String, required: true},
        description:{type:String, required: true},
        videoUrl:{type:String, required: true},
        thumbnailUrl:{type:String, required: true},
        controls:{type: Boolean, default: true},
        transformation:{
            height:{type: Number, default:VID_DIMENSION.height},
            width:{type: Number, default:VID_DIMENSION.width},
            quality:{type:Number, min: 1, max: 100}
        }

    },
    {
        timestamps: true
    }

)