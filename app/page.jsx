import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import herobg from "@/public/bg.png";
import ask from "@/public/ask.png";
import learn from "@/public/learn.png";
import ans from "@/public/ans.png";
import Card from "./components/card";
import Link from "next/link";
import Quescard from "./components/quescard";
const data = [
  {
    image: ask,
    title: "Ask Anything",
    des: "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
  },
  {
    image: learn,
    title: " Learn from Community",
    des: "Explore diverse topics and viewpoints. Follow discussions in technology, career, personal growth, and more.",
  },
  {
    image: ans,
    title: "Give Insightful Answers",
    des: "Share your experience and help others grow. Earn trust by contributing answers others find helpful.",
  },
];
const questions = [
  {
    title: "Ask Anything",
    des: "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
    author: "robert doe",
    date: "monday 2 april 2025",
  },
  {
    title: " Learn from Community",
    des: "Explore diverse topics and viewpoints. Follow discussions in technology, career, personal growth, and more.",
    author: "robert doe",
    date: "monday 2 april 2025",
  },
  {
    title: "Give Insightful Answers",
    des: "Share your experience and help others grow. Earn trust by contributing answers others find helpful.",
    author: "robert doe",
    date: "monday 2 april 2025",
  },
];
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <div className="relative">
        <div className="w-full">
          <Image
            src={herobg}
            alt="bg"
            className="min-h-[30rem] md:min-h-[25rem] md:max-h-[30rem] xl:h-[25rem] object-cover w-full blur-xs"
          ></Image>
        </div>
        <div className="absolute top-0 place-items-center h-full pt-20 w-full p-4 bg-black/30">
          <h1 className="text-base font-medium font-sans text-center p-1 px-4 backdrop-blur-md rounded-full border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] bg-black/10">
            Ask questions , answer freely.
          </h1>
          <p className="text-5xl font-extrabold drop-shadow-xs drop-shadow-black/50 text-center mt-2">
            Grow together with <span className="text-primary">Stack</span>It
          </p>
          <p className="text-center w-10/12 lg:w-9/12 font-mono mt-5 font-medium ">
            Welcome to StackIt, a simple yet powerful platform where curiosity
            meets community. Whether you're a learner seeking clarity, a
            professional eager to share expertise, or simply someone who loves
            thoughtful conversations — StackIt is built for you.
          </p>
          <div className="mt-6">
            <Link href="/new">
              <button className="p-3 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-sm font-sans text-sm mr-2 text-white font-medium">
                Start Asking
              </button>
            </Link>
            <button className="p-3 px-6 rounded-sm font-sans text-sm mr-2 text-white font-medium backdrop-blur-md border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] bg-black/10">
              Browse Answers
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 p-4">
          {data.map((content) => {
            return (
              <Card
                key={content.title}
                image={content.image}
                title={content.title}
                des={content.des}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-center pl-4">
          <h1 className="text-xl font-bold font-sans">
            Recently asked questions
          </h1>
          <div className=" flex flex-wrap gap-4 my-2">
            {questions.map((question) => {
              return (
                <Quescard
                  key={question.title}
                  title={question.title}
                  des={question.des}
                  author={question.author}
                  date={question.date}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
