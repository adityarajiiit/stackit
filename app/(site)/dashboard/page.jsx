"use client";

import Commenttable from "@/app/components/commenttable";

const dashboard = () => {
  const comments = [
    {
      content:
        "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
      author: "Robert doe",
      date: "monday 2 april 2025",
      replycount: 3,
    },
  ];
  return (
    <div>
      <Commenttable comments={comments} />
    </div>
  );
};
export default dashboard;
