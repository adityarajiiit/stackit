import { NextResponse } from "next/server";
import prisma from '@/app/lib/prismadb';
export async function GET(req){
    try{
    const query=req.nextUrl.searchParams.get('query');
    if(!query||query.trim()===''){
        return NextResponse.json({error:'no query'});
    }
    const results=await prisma.$runCommandRaw({
        aggregate:'questions',
        pipeline:[
            {
                $search:{
                    index:"searchQuestions",
                    text:{
                        query:query,
                        path:"question",
                        fuzzy:{maxEdits:3}
                    }
                }
            }
        ],
        cursor:{}
    })
    console.log(results);
    return NextResponse.json(results);
    }
    catch(error){
        return NextResponse.json({error:error.message});
    }
}