"use client";
import React from "react";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
function Answercard({ question, answer, author, date, comments = [] }) {
  const [upvote, setupvote] = useState(false);
  const [downvote, setdownvote] = useState(false);
  const { register, handleSubmit } = useForm();
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 backdrop-blur-2xl bg-black/10 border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] p-4">
      <p className="text-lg font-sans font-semibold relative ">{question}</p>
      <p className="font-mono relative text-sm text-secondary">{answer}</p>
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
          placeholder="Comment ..."
          {...register("comment")}
          className="w-full p-2 pl-4 outline-none bg-secondary-foreground rounded-xs placeholder:text-white placeholder:text-sm text-sm font-sans"
        />
        <button
          type="submit"
          className="p-2 px-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-xs font-sans text-sm mr-2 text-white font-medium"
        >
          Submit
        </button>
      </form>
      <div className="h-40 overflow-auto custom-scrollbar">
        {comments.map((comment) => {
          return (
            <div
              key={comment.content}
              className="flex flex-col gap-1 p-2 bg-muted/50 rounded-sm"
            >
              <p className="font-mono relative text-sm text-secondary">
                {comment.content}
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="text-xs text-gray-300 font-sans">
                  {comment.author}
                </p>
                <p className="text-xs text-gray-300 font-sans">
                  {comment.date}
                </p>
              </div>
              <form
                action=""
                className="w-full flex justify-center items-center gap-1"
              >
                <input
                  type="text"
                  placeholder="Reply ..."
                  {...register("reply")}
                  className="w-full p-2 pl-4 outline-none border border-muted  rounded-xs placeholder:text-white placeholder:text-xs text-xs font-sans"
                />
                <button
                  type="submit"
                  className="p-2 px-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-xs font-sans text-xs mr-2 text-white font-medium"
                >
                  Submit
                </button>
              </form>
              {comment.replies.map((reply) => {
                return (
                  <div
                    key={reply.content}
                    className="flex flex-col gap-1 p-2 bg-muted/50 rounded-sm"
                  >
                    <p className="font-mono relative text-sm text-secondary">
                      {reply.content}
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-xs text-gray-300 font-sans">
                        {reply.author}
                      </p>
                      <p className="text-xs text-gray-300 font-sans">
                        {reply.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Answercard;
