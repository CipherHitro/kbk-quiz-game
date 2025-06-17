import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { questions } from "./data/questions";
import Lander from "./components/Lander";
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css';
import ChatbotSidebar from "./components/ChatbotSidebar";
import HowToPlay from "./components/HowToPlay";
// Main KBC Game Component
const KBCGame = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Lander />,
    },
    {
      path: "questions",
      element: <QuestionCard />,
    },
    {
      path: "howtoplay",
      element: <HowToPlay />,
    },
  ]);

  return (
    <>
      {/* <div className=" text-white absolute inset-0 -z-10 h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      </div> */}
      {/* <QuestionCard currentQuestion={questions[1]}/> */}
      {/* <Lander /> */}
      <RouterProvider router={router} />
    </>
  );
};

export default KBCGame;
