import {createQuestion,getQuestions,getQuestionsById,deleteQuestion} from "@/app/lib/controller/questions.controller";
import { NextResponse } from "next/server";
export async function POST(req){
    const {questions,tags,description}=await req.json();
    try{
      const ques=await createQuestion({questions,tags,description});
      if(!ques){
        return Response.json({error:'Error on creation'});
      }
        return Response.json("Question created successfully");
    }
    catch(error){
        return Response.json({error:error.message});
    }
}
export async function GET(req){
    try{
        const sorttype=req.nextUrl.searchParams.get('sorttype')||'recent';
        const res=await getQuestions(sorttype);
        if(!res){
            return Response.json({error:'No questions found'});
        }
        return Response.json(res);
    }
    catch(error){
        return Response.json({error:error.message});
    }
}