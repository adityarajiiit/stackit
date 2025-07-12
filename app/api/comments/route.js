import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { createComment,getComments,deleteComment,doVoting } from "@/app/lib/controller/comments.controller";
import { createNotification} from "@/app/lib/controller/notification.controller";
import { NextResponse } from "next/server";
export async function POST(req){
    const {comment,quesid,ansid}=await req.json();
    try{
        const data={
            comment,
            quesid,
            ansid
        }
        const session=await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:'login to create'});
        }
        const newcomment=await createComment(data);
        const answeruser=newcomment.answer.userId;
        const questionuser=newcomment.answer.question.userId;
        if(questionuser&&answeruser&&global.io){
            global.io.to(answeruser).emit('newcomment',{
                type:'comment',
                comment,
                questionId:quesid,
                answerId:ansid,
                commentId:newcomment.id
                
            })
            global.io.to(questionuser).emit('newcomment',{
                type:'comment',
                comment,
                questionId:quesid,
                answerId:ansid,
                commentId:newcomment.id
            })
           await createNotification({
                type:'comment',
                comment,
                questionId:quesid,
                answerId:ansid,
                commentId:newcomment.id
            });
           
        }
        return NextResponse.json(newcomment);
    }
    catch(error){
        return NextResponse.json({error:error.message});
    }
}