"use server"
import prisma from '@/app/lib/prismadb'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export const createAnswer=async(data)=>{
    try{
const session=await getServerSession(authOptions)
if(!session){
    throw new Error('login to create')
}
const {answer,quesid}=data;
const usermail=session.user.email
if(!usermail){
    throw new Error('no mail')
}
if(!answer||!quesid){
    throw new Error('fields missing')
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
const newanswer=await prisma.answer.create({
    data:{
        answer,
        userId,
        questionId:quesid
    }
})
if(!newanswer){
    throw new Error('Error while creating')
}
await prisma.question.update({
    where:{id:quesid},
    data:{
        answercount:question.answercount+1,
    }
})
return newanswer;
    }
    catch(error){
        throw new Error(error.message);
    }
}
export const getAnswer=async(id,sorttype)=>{
    try{
    if(!id){
        throw new Error('no id is there')
    }
    let answers;
    if(sorttype==='recent'){
    answers=await prisma.answer.findMany({
        where:{questionId:id},
        include:{
            user:true,
            question:true,
            comments:true
        }
    })
}
else if(sorttype==='upvote'){
    answers=await prisma.answer.findMany({
        where:{questionId:id},
        include:{
            user:true,
            question:true,
            comments:true
        },
        orderBy:{
            upvoted:'desc'
        }
    })
}
else if(sorttype==='downvote'){
    answers=await prisma.answer.findMany({
        where:{questionId:id},
        include:{
            user:true,
            question:true,
            comments:true
        },
        orderBy:{
            downvoted:'desc'
        }
    })
}
else if(sorttype==='votes'){
    answers=await prisma.answer.findMany({
        where:{questionId:id},
        include:{
            user:true,
            question:true,
            comments:true
        },
        orderBy:{
            votecount:'desc'
        }
    })
}
else if(sorttype==='votecount'){
    answers=await prisma.answer.findMany({
        where:{questionId:id},
        include:{
            user:true,
            question:true,
            comments:true
        },
        orderBy:{
            votes:'desc'
        }
    })
}
else{
    throw new Error('invalid sort type')
}
    if(!answers){
        throw new Error('no answers found')
    }
    return answers;
}
catch(error){
    throw new Error(error.message);
}
}
export const deleteAnswer=async(id)=>{
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
if(!id){
    throw new Error('no id is there')
}
const answer=await prisma.answer.findUnique({
    where:{id}
})
if(!answer){
    throw new Error('no answer found')
}
if(answer.userId!==user.id||user.role!=='Admin'){
    throw new Error('you are not admin nor author of this answer')
}
const deleteans=await prisma.answer.delete({
    where:{id}
})
if(!deleteans){
    throw new Error('Error')
}
await prisma.question.update({
    where:{id:answer.questionId},
    data:{
        answercount:answer.question.answercount-1,
    }
})
return deleteans;
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
const {ansid,vote}=data;
if(!ansid||!vote){
    throw new Error('fields missing')
}
const user=await prisma.user.findUnique({
    where:{email}
})
if(!user){
    throw new Error('no user found')
}
const answer=await prisma.answer.findUnique({
    where:{id:ansid}
})
if(!answer){
    throw new Error('no answer found')
}
const userId=user.id;
if(answer.voters.includes(userId)){
    throw new Error('already voted')
}
if(vote!=='upvote'&&vote!=='downvote'){
    throw new Error('invalid vote type')
}
const updatedanswer=await prisma.answer.update({
    where:{id:ansid},
    data:{
        voters:[...answer.voters,userId],
        upvoted:vote==='upvote'?answer.upvoted+1:answer.upvoted,
        downvoted:vote==='downvote'?answer.downvoted+1:answer.downvoted,
        votecount:vote==='upvote'?answer.votecount+1:answer.votecount-1,
        votes:answer.votes+1
    }})
if(!updatedanswer){
        throw new Error('Error')
    }
return updatedanswer;
}
    catch(error){
        throw new Error(error.message);
    }
}
