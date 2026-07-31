"use client";

import React, { useState, useEffect } from "react";

interface Question {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: string;
  [key: string]: any;
}

export default function AdminPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    const savedQuestions = localStorage.getItem("adminQuestionBank");
    if (savedQuestions) {
      try {
        setQuestions(JSON.parse(savedQuestions));
      } catch (error) {
        console.error("Failed to parse questions from localStorage", error);
      }
    }
  }, []);

  const saveQuestionsToStorage = (updatedQuestions: Question[]) => {
    setQuestions(updatedQuestions);
    localStorage.setItem("adminQuestionBank", JSON.stringify(updatedQuestions));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !correctAnswer.trim()) return;

    const newObj: Question = {
      id: Date.now(),
      question: newQuestion,
      options,
      correctAnswer,
    };

    const updated = [...questions, newObj];
    saveQuestionsToStorage(updated);

    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleDelete = (id: string | number) => {
    const updated = questions.filter((q) => q.id !== id);
    saveQuestionsToStorage(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-400">
          Admin Dashboard - Question Bank
        </h1>

        <form onSubmit={handleAddQuestion} className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">പുതിയ ചോദ്യം ചേർക്കുക</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ചോദ്യം:</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
              placeholder="ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {options.map((opt, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-1">ഓപ്ഷൻ {index + 1}:</label>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[index] = e.target.value;
                    setOptions(newOpts);
                  }}
                  className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
                  placeholder={`ഓപ്ഷൻ ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ശരിയായ ഉത്തരം:</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
              placeholder="ശരിയായ ഉത്തരം ഇവിടെ നൽകുക..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded font-medium transition"
          >
            ചോദ്യം സേവ് ചെയ്യുക
          </button>
        </form>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">ചോദ്യങ്ങളുടെ ലിസ്റ്റ്</h2>
          {questions.length === 0 ? (
            <p className="text-gray-400">ചോദ്യങ്ങൾ ഒന്നും ലഭ്യമല്ല.</p>
          ) : (
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="p-4 bg-gray-750 border border-gray-700 rounded flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg text-indigo-300">{q.question}</p>
                    <ul className="list-disc list-inside text-sm text-gray-300 mt-2">
                      {q.options?.map((o: string, i: number) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-green-400 mt-2">ശരിയായ ഉത്തരം: {q.correctAnswer}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
                  >
                    ഡിലീറ്റ്
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}