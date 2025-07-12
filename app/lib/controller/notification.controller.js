import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const createNotification=async(data)=>{
    try{
        const session=await getServerSession(authOptions);
    if(!session){
        throw new Error('login to create');
    }
    const email=session.user.email;
    if(!email){
        throw new Error('no email provided');
    }
    const user=await prisma.user.findUnique({
        where:{email}
    });
        if(data.type==='comment'){
const {comment,questionId,answerId}=data;
const userid=await prisma.question.findUnique({
    where:{id:questionId},
    select:{userId:true}
})
const answeruser=await prisma.answer.findUnique({
    where:{id:answerId},
    select:{userId:true}
})
await prisma.notification.create({
    data:{
        type:'comment',
        message:comment,
        userId:userid.userId,
        questionId:questionId,
        answerId:answerId,
        commentId:data.commentId
    }
})
await prisma.notification.create({
    data:{
        type:'comment',
        message:comment,
        userId:answeruser.userId,
        questionId:questionId,
        answerId:answerId,
        commentId:data.commentId
    }
})
        }
        else if(data.type==='answer'){
const {answer,questionId,answerId}=data;
const userid=await prisma.question.findUnique({
    where:{id:questionId},
    select:{userId:true}
})
await prisma.notification.create({
    data:{
        type:'answer',
        message:answer,
        userId:userid.userId,
        questionId:questionId,
        answerId:answerId
    }
})
        }
    

    }
    catch(error){
        throw new Error(error.message);
    }
}
export const getNotifications=async()=>{
    try{
        const session=await getServerSession(authOptions);
        if(!session){
            throw new Error('login to get notifications');
        }
        const email=session.user.email;
        if(!email){
            throw new Error('no email provided');
        }
        const user=await prisma.user.findUnique({
            where:{email}
        });
        if(!user){
            throw new Error('user not found');
        }
        const notifications=await prisma.notification.findMany({
            where:{userId:user.id,read:false},
            orderBy:{createdAt:'desc'}
        });
        return notifications;
    }
    catch(error){
        throw new Error(error.message);
    }
}
export const markNotificationAsRead=async(notificationId)=>{
    try{
        const session=await getServerSession(authOptions);
        if(!session){
            throw new Error('login to mark notification as read');
        }
        const email=session.user.email;
        if(!email){
            throw new Error('no email provided');
        }
        const user=await prisma.user.findUnique({
            where:{email}
        });
        if(!user){
            throw new Error('user not found');
        }
        const notification=await prisma.notification.update({
            where:{
                id:notificationId,
                userId:user.id
            },
            data:{read:true}
        });
        return notification;
    }
    catch(error){
        throw new Error(error.message);
    }
}

