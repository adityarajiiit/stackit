import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { createAnswer } from "@/app/lib/controller/answers.controller";
import { NextResponse } from "next/server";
import { createNotification } from "@/app/lib/controller/notification.controller";
export async function POST(req){
    const {answer,quesid}=await req.json();
    try{
        const data={
            answer,
            quesid
        }
        const session=await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:'login to create'});
        }
        const newanswer=await createAnswer(data);
        const questionuser=newanswer.question.userId;
        if(questionuser&&global.io){
            global.io.to(questionuser).emit('newanswer',{
                type:'answer',
                answer,
                questionId:quesid,
                answerId:newanswer.id,
               
            })
            await createNotification({
                type:'answer',
                answer,
                questionId:quesid,
                answerId:newanswer.id
            });
        }

        return NextResponse.json(newanswer);
    }
    catch(error){
        return NextResponse.json({error:error.message});
    }
}
