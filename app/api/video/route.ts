//in GET method we getallvideos
//in POST method will create new video record

import { connecttodb } from "@/lib/db";
import { authopts } from "@/lib/nextauthentication";
import Video, { Ivid } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await connecttodb();
        const videos = await Video.find({}).sort({createdAt: -1}).lean();

        if(!videos || videos.length === 0)
        {
            return NextResponse.json([],{status: 200})
        }

        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            {error:"failed to fetch videos"},
            {status: 500}
        );
    }
}

export async function POST(request: NextRequest){
    try {
        const session = getServerSession(authopts)
        if(!session)
        {
            return NextResponse.json(
            {error:"unauthorized user"},
            {status: 401});
        }

        await connecttodb();
        const body:Ivid = await request.json();

        if(!body.title || !body.description || !body.thumbnailUrl || body.url)
        {
            return NextResponse.json(
            {error:"missing required fields"},
            {status: 400});
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation:{
                height:1920,
                width: 1080,
                quality:body.transformation?.quality ?? 100
            }
        };

        const newVideo=await Video.create(videoData);
    } catch (error) {
        return NextResponse.json(
            {error:"failed to create video"},
            {status: 500});
    }
}