"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";

const PROMPT = `Translate the text to Japanese. If the following text is already Japanese, then check if there is any grammatical error and fix it. \nText Start here:\n`;
const errorToast = (message: string) =>
  toast.error(message, {
    style: {
      borderRadius: "8px",
      background: "#ff4b4b",
      color: "#fff",
    },
  });

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (inputText !== "") {
      setLoading(true);
      const prompt = PROMPT.concat(inputText);
      const model = "gpt-3.5-turbo";
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            messages: [{ role: "user", content: prompt }],
            model: model,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        console.log(response.data);
        setApiResponse(response.data.choices[0].message.content || "");
      } catch (error: any) {
        errorToast(
          error?.message || "Something is going wrong, Please try again."
        );
        setApiResponse("Something is going wrong, Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="prose flex flex-row min-h-[calc(100vh-4rem)] min-w-full">
      <div className="hidden lg:block lg:basis-1/5 px-8 border-r border-solid">
        <h3>Settings</h3>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">OpenAI API KEY</span>
          </label>
          <input
            type="password"
            name="openai-api-key"
            autoComplete="new-password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="basis-full lg:basis-4/5 p-8">
        <div className="flex flex-col gap-8">
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Usage of this feature will incur fee on OpenAI API</span>
          </div>
          <div className="block lg:hidden px-4 py-8 rounded-xl border border-solid">
            <h3 className="m-0">Settings</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">OpenAI API KEY</span>
              </label>
              <input
                type="password"
                name="openai-api-key"
                autoComplete="new-password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Text</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-40"
              placeholder="Type Here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-neutral" onClick={handleSubmit}>
            {loading && <span className="loading loading-spinner"></span>}
            {loading ? "Loading" : "Submit"}
          </button>
          <div className="form-control">
            <label className="label">
              <span className="label-text">AI Response</span>
            </label>
            <textarea
              value={apiResponse}
              readOnly
              placeholder="AI response will be displayed here..."
              className="textarea textarea-bordered min-h-fit bg-base-200"
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
}
