"use client";
import React from "react";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
function Quescard({ title, des, author, date }) {
  const [upvote, setupvote] = useState(false);
  const [downvote, setdownvote] = useState(false);
  const { register, handleSubmit } = useForm();
  return (
    <div className="w-80 flex flex-col justify-start items-center gap-2 backdrop-blur-2xl bg-black/10 border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] p-4">
      <p className="text-lg font-sans font-semibold relative ">{title}</p>
      <p className="font-mono relative text-center text-sm text-secondary">
        {des}
      </p>
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-300 font-sans">{author}</p>
        <p className="text-xs text-gray-300 font-sans">{date}</p>
      </div>
      <div className="flex gap-3 justify-start w-full">
        <ArrowBigUp
          className={`stroke-1 w-7 h-7 ${upvote ? "fill-amber-300" : ""}`}
          onClick={() => {
            upvote ? setupvote(false) : setupvote(true);
          }}
        />
        <ArrowBigDown
          className={`stroke-1 w-7 h-7 ${downvote ? "fill-amber-300" : ""}`}
          onClick={() => {
            downvote ? setdownvote(false) : setdownvote(true);
          }}
        />
        <MessageCircle className="stroke-1 w-6 h-6" />
      </div>
      <form action="" className="w-full flex justify-center items-center gap-1">
        <input
          type="text"
          placeholder="Reply ..."
          {...register("answer")}
          className="w-full p-2 pl-4 outline-none bg-secondary-foreground rounded placeholder:text-white placeholder:text-xs text-xs font-sans"
        />
        <button
          type="submit"
          className="p-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-sm font-sans text-xs mr-2 text-white font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Quescard;
