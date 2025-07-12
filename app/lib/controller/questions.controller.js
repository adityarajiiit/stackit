"use server"
import prisma from '@/app/lib/prismadb'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export const createQuestion=async(data)=>{
    try{const session=await getServerSession(authOptions)
    if(!session){
        throw new Error('login to create')
    }
    const {question,tags,description}=data;
    const usermail=session.user.email
    if(!usermail){
        throw new Error('No usermail is provided')
    }
    if(!question||!description){
        throw new Error('some fiellds are missing')
    }
    const user=await prisma.user.findUnique({
        where:{email:usermail}
    })
    if(!user){
        throw new Error('no user found')
    }
    const userId=user.id;
    const newquestion=await prisma.question.create({
        data:{
            question,
            description,
            userId,
            tags:{
                connectOrCreate:tags.map((tag)=>{
                    return {
                        where:{name:tag},
                        create:{name:tag}
                    }
                })
            }
        }
    })
    if(!newquestion){
        throw new Error('Error on creation')
    }
    return newquestion;}
    catch(error){
        throw new Error(error.message);
    }
}
export const getQuestions=async(sorttype)=>{
    try{
    let questions;
    if(sorttype==='recent'){
        questions=await prisma.question.findMany({
        include:{
            user:true,
            Answers:true,
            tags:true,
        }
    })
    }
    else if(sorttype==='unanswered'){
        questions=await prisma.question.findMany({
            where:{
                Answers:{
                    none:{}
                }
            },
            include:{
                user:true,
                Answers:true,
                tags:true,
            }
        })
    }
    else if(sorttype==='answercount'){
        questions=await prisma.question.findMany({
            orderBy:{
                answercount:'desc'
            },
            include:{
                user:true,
                Answers:true,
                tags:true,
            }
        })
    }
    if(!questions){
        throw new Error('no questions found')
    }
    return questions;
}
catch(error){
    throw new Error(error.message);
    }
}
export const getQuestionsById=async(id)=>{
    try{
    if(!id){
        throw new Error('no id is there')
    }
    const question=await prisma.question.findUnique({
        where:{id},
        include:{
            user:true,
            Answers:true,
            tags:true,
        }
    })
    if(!question){
        throw new Error('no question found')
    }
    return question;
}
catch(error){
    throw new Error(error.message);
    }
}
export const deleteQuestion=async(id)=>{
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
    const question=await prisma.question.findUnique({
        where:{id}
    })
    if(!question){
        throw new Error('no question found')
    }
    if(question.userId!==user.id||user.role!=='Admin'){
        throw new Error('only author or admin can delete it')
    }
    const deleteques=await prisma.question.delete({
        where:{id}
    })
    if(!deleteques){
        throw new Error('error while deleting it')
    }
    return deleteques;
}
catch(error){
    throw new Error(error.message);
    }
}