"use client";
import React from "react";
import { useState } from "react";
import { Trash2, Loader } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
function Commenttable({ comments = [] }) {
  const [search, setSearch] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const filteredcomment = comments.filter((comment) => {
    const searchedcomment = comment?.content
      .toLowerCase()
      .includes(search.toLowerCase());
    return searchedcomment;
  });
  return (
    <div className="flex flex-col gap-2 p-2">
      <form className="flex justify-center items-center p-1 rounded-sm bg-secondary-foreground w-fit">
        <input
          type="text"
          placeholder="Search comments"
          className="text-sm p-2 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 rounded-sm text-sm bg-primary px-2">
          Search
        </button>
      </form>

      <table className="w-full bg-secondary-foreground rounded-sm">
        <thead className="border-b-2 border-secondary/50 w-full">
          <tr className="">
            <th className="p-2 text-start font-semibold font-mono">Comments</th>
            <th className="p-2 text-start font-semibold font-mono">Date</th>
            <th className="p-2 text-start font-semibold font-mono">
              Reply Count
            </th>
            <th className="p-2 text-start font-mono">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredcomment.map((unique) => {
            return (
              <tr className="border-b-2 border-secondary/50" key={unique.id}>
                <td className=" p-2 text-start font-poppins text-sm">
                  <p>{unique?.content}</p>
                </td>
                <td className=" p-2 text-start text-secondary font-mono text-sm">
                  {new Date(unique.createdAt).toDateString()}
                </td>
                <td className=" p-2 text-start text-secondary font-mono text-sm">
                  {unique.replycount}
                </td>
                <td className=" p-2 text-start">
                  <button
                    className="flex justify-center items-center gap-1 p-2 rounded-sm text-sm bg-primary px-2"
                    onClick={async () => {
                      setSubmitting(true);
                      try {
                        await axios.delete(`/api/comment/${unique.id}`);
                        toast.success("Comment deleted successfully");
                        router.refresh();
                      } catch (error) {
                        toast.error("An internal error occured");
                        console.log("Something went wrong", error);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 stroke-3" />
                    Delete
                    {isSubmitting ? (
                      <Loader className="animate-spin h-4 w-4 stroke-3 ml-2" />
                    ) : (
                      ""
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Commenttable;
