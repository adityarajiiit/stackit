"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import upload from "@/public/cloud-upload.png";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

function QuestionForm() {
  const { control, register, handleSubmit } = useForm();
  const inputref = useRef(null);
  const [url, seturl] = useState("");
  const handleupload = () => {
    inputref.current.click();
  };
  

  return (
    <form
      onSubmit={handleSubmit(async(data)=>{
        try {
          const formData = new FormData();
          formData.append("title",data.title);
          formData.append("description",data.description);
          formData.append("image",url);
          formData.append("tag",data.tag);
          await axios.post("/api",formData)
        } catch (error) {
          console.error(error)
        }
      })}
      className="space-y-4 p-4 w-9/12 lg:w-6/12"
    >
      <input
        type="text"
        placeholder="Question title"
        {...register("title")}
        className="w-full p-3 pl-4 outline-none bg-secondary-foreground rounded placeholder:text-white"
      />
      <div
        className="flex items-center gap-2 px-4 p-2 bg-secondary-foreground rounded w-fit"
        onClick={handleupload}
      >
        <Image src={upload} alt="upload" className="h-7 w-7" /> Select image ...
      </div>
      <input
        type="file"
        ref={inputref}
        className="w-full p-3 pl-4 outline-none bg-secondary-foreground rounded hidden"
        onChange={(e) => seturl(e.target.files[0])}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Write your question..." />
        )}
      />

      <select
        {...register("tag")}
        className="w-full p-3 pl-4 outline-none bg-secondary-foreground rounded "
      >
        <option value="">Select a tag</option>
        <option value="Programming">Programming</option>
        <option value="Social">Social</option>
        <option value="Politics">Politics</option>
        <option value="Economics">Economics</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Sports">Sports</option>
      </select>

      <button type="submit" className="p-2 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-sm font-sans text-sm mr-2 text-white font-medium">
        Submit
      </button>
    </form>
  );
}

export default QuestionForm;
