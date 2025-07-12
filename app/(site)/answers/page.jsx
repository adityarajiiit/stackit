import React from "react";
import Answercard from "@/app/components/answercard";
function Answers() {
  const answers = [
    {
      question: "Ask Anything",
      answer:
        "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
      author: "robert doe",
      date: "monday 2 april 2025",
      comments: [
        {
          content:
            "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
          author: "Robert doe",
          date: "monday 2 april 2025",
          replies: [
            {
              content:
                "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
              author: "Robert doe",
              date: "monday 2 april 2025",
            },
          ],
        },
      ],
    },
    {
      question: " Learn from Community",
      answer:
        "Explore diverse topics and viewpoints. Follow discussions in technology, career, personal growth, and more.",
      author: "robert doe",
      date: "monday 2 april 2025",
      comments: [
        {
          content:
            "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
          author: "Robert doe",
          date: "monday 2 april 2025",
          replies: [
            {
              content:
                "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
              author: "Robert doe",
              date: "monday 2 april 2025",
            },
          ],
        },
      ],
    },
    {
      question: "Give Insightful Answers",
      answer:
        "Share your experience and help others grow. Earn trust by contributing answers others find helpful.",
      author: "robert doe",
      date: "monday 2 april 2025",
      comments: [
        {
          content:
            "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
          author: "Robert doe",
          date: "monday 2 april 2025",
          replies: [
            {
              content:
                "Get answers to your toughest questions from real people who care. Ask in plain language and receive thoughtful responses.",
              author: "Robert doe",
              date: "monday 2 april 2025",
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-2 p-4">
      {answers.map((answer) => {
        return (
          <Answercard
            key={answer.answer}
            question={answer.question}
            answer={answer.answer}
            author={answer.author}
            date={answer.date}
            comments={answer.comments}
          />
        );
      })}
    </div>
  );
}

export default Answers;
