"use client";

import { getFaqs } from "@/api/faqs";
import Features from "@/components/features";
import NavbarMinimalist from "@/components/navbar-minimalist";
import MeetTheTeam from "@/components/team";
import { FaqsModel } from "@/model/model";
import React, { useEffect, useState } from "react";

const faqsDefault: FaqsModel[] = [
  {
    question: "How can I pay for my appointment?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
  },
  {
    question: "How can I pay for my appointment?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
  },
  {
    question: "How can I pay for my appointment?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
  },
];

const Help: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqsModel[]>([]);

  /* Api Obtener  los detalles del cliente*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: FaqsModel[] = await getFaqs();
        setFaqs(response);
      } catch (error) {
        setFaqs(faqsDefault);
      }
    };

    fetchData();
  }, []);

  const [visibleAnswers, setVisibleAnswers] = useState<boolean[]>(
    Array(faqs.length).fill(false)
  );

  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prevVisibleAnswers) => {
      const updatedVisibleAnswers = [...prevVisibleAnswers];
      updatedVisibleAnswers[index] = !updatedVisibleAnswers[index];
      return updatedVisibleAnswers;
    });
  };

  return (
    <div>
      <div className="contenedor">
        <NavbarMinimalist />
      </div>

      <section className="bg-midnight text-white contenedor mt-10">
        <div className="container max-w-9xl px-6 py-10 mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className=" lg:w-1/2 mb-6 lg:mb-0 rounded-2xl hover:shadow hover:shadow-teal-800">
              <img
                src="https://i.ytimg.com/vi/6N3kjHebBKA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLANEhPve2j69u5A_Iaoxz0n_VWLzw"
                alt="FAQ tailwind section"
                className="rounded-2xl"
              />
            </div>
            <div className="w-full lg:w-1/2 lg:pl-8">
              <h1 className="text-2xl font-semibold text-center lg:text-left lg:text-3xl ">
                Preguntas frecuentes
              </h1>

              <div className="mt-1 grid grid-cols-1 gap-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-700 rounded-lg flex flex-col"
                  >
                    <button
                      className="flex items-center justify-between w-full p-8 text-base"
                      onClick={() => toggleAnswer(index)}
                    >
                      <h1 className="font-semibold text-2xl">{faq.question}</h1>
                      <span className="text-gray-400 bg-gray-700 rounded-full ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                              visibleAnswers[index]
                                ? "M6 18L18 6M6 6l12 12"
                                : "M18 12H6"
                            }
                          />
                        </svg>
                      </span>
                    </button>
                    <hr className="border-gray-700" />
                    {visibleAnswers[index] && (
                      <p className="p-8 text-lg flex-grow">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Features />
    </div>
  );
};

export default Help;
