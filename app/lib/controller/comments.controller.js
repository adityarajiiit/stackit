"use server"
import prisma from '@/app/lib/prismadb'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export const createComment=async(data)=>{
    try{
const session=await getServerSession(authOptions)
if(!session){
    throw new Error('login to create')
}
const {comment,quesid,ansid}=data;
if(!comment||!quesid||!ansid){
    throw new Error('fields missing')
}
const usermail=session.user.email
if(!usermail){
    throw new Error('no mail')
}
const user=await prisma.user.findUnique({
    where:{email:usermail}
})
if(!user){
    throw new Error('no user found')
}
const userId=user.id;
const question=await prisma.question.findUnique({
    where:{id:quesid}
})
if(!question){
    throw new Error('no question found')
}
const answer=await prisma.answer.findUnique({
    where:{id:ansid}
})
if(!answer){
    throw new Error('no answer found')
}
const newcomment=await prisma.comment.create({
    data:{
        comment,
        userId,
        questionId:quesid,
        answerId:ansid
    }
})
if(!newcomment){
    throw new Error("Error found")
}
await prisma.question.update({
    where:{id:quesid},
    data:{
        answercount:question.answercount+1,
    }
})
return newcomment;
    }
    catch(error){
        throw new Error(error.message);
    }
}
export const getComments=async(data,sorttype)=>{
    try{
const {quesid,ansid}=data;
if(!quesid||!ansid){
    throw new Error('fields missing')
}
let comments;
if(sorttype==='recent'){
comments=await prisma.comment.findMany({
    where:{
        questionId:quesid,
        answerId:ansid
    },
    include:{
        user:true
    }
})
}
else if(sorttype==='upvote'){
comments=await prisma.comment.findMany({
    where:{
        questionId:quesid,
        answerId:ansid
    },
    include:{
        user:true
    },
    orderBy:{
        upvoted:'desc'
    }
})
}
else if(sorttype==='downvote'){
comments=await prisma.comment.findMany({
    where:{
        questionId:quesid,
        answerId:ansid
    },
    include:{
        user:true
    },
    orderBy:{
        downvoted:'desc'
    }
})
}
else if(sorttype==='votes'){
comments=await prisma.comment.findMany({
    where:{
        questionId:quesid,
        answerId:ansid
    },
    include:{
        user:true
    },
    orderBy:{
        votes:'desc'
    }})
}
else if(sorttype==='votecount'){
comments=await prisma.comment.findMany({
    where:{
        questionId:quesid,
        answerId:ansid
    },
    include:{
        user:true
    },
    orderBy:{
        votecount:'desc'
    }
}
)}
if(!comments){
    throw new Error('no comments found')
}
return comments;
    }
    catch(error){
        throw new Error(error.message);
    }
}
export const deleteComment=async(id)=>{
    try{
const session=await getServerSession(authOptions)
if(!session){
    throw new Error('login to delete')
}
if(!session.user.email){
    throw new Error('no user email found')
}
const user=await prisma.user.findUnique({
    where:{email:session.user.email}
})
if(!user){
    throw new Error('no user found')
}
const comments=await prisma.comment.findMany({
    where:{
        questionId:quesid,
        answerId:ansid
    },
    include:{
        user:true
    }
})
if(!id){
    throw new Error('no id is there')
}
const comment=await prisma.comment.findUnique({
    where:{id}
})
if(!comment){
    throw new Error('no comment found')
}
const deletecomment=await prisma.comment.delete({
    where:{id}
})
if(!deletecomment){
    throw new Error('Error while deleting')
}
await prisma.question.update({
    where:{id:comment.questionId},
    data:{
        answercount:comment.question.answercount-1,
    }
})
return deletecomment;

    }
    catch(error){
        throw new Error(error.message);
    }
}
export const doVoting=async(data)=>{
    try{
const session=await getServerSession(authOptions)
if(!session){
    throw new Error('login to vote')
}
const email=session.user.email
if(!email){
    throw new Error('no mail')
}
const {commid,vote}=data;
if(!commid||!vote){
    throw new Error('fields missing')
}
const user=await prisma.user.findUnique({
    where:{email}
})
if(!user){
    throw new Error('no user found')
}
const comment=await prisma.comment.findUnique({
    where:{id:commid}
})
if(!comment){
    throw new Error('no answer found')
}
const userId=user.id;
if(comment.voters.includes(userId)){
    throw new Error('already voted')
}
if(vote!=='upvote'&&vote!=='downvote'){
    throw new Error('invalid vote type')
}
const updatedcomment=await prisma.comment.update({
    where:{id:commid},
    data:{
        voters:[...comment.voters,userId],
        upvoted:vote==='upvote'?comment.upvoted+1:comment.upvoted,
        downvoted:vote==='downvote'?comment.downvoted+1:comment.downvoted,
        votecount:vote==='upvote'?comment.votecount+1:comment.votecount-1,
        votes:comment.votes+1
    }})
if(!updatedcomment){
        throw new Error('Error')
    }
return updatedcomment;
}
    catch(error){
        throw new Error(error.message);
    }
}
