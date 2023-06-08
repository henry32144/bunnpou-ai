"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [openaiApiSecret, setOpenaiApiSecret] = useState("");

  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  return (
    <main className="prose flex flex-row min-h-[calc(100vh-4rem)] min-w-full">
      <div className="basis-1/5 px-8 border-r border-solid">
        <h3>Settings</h3>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">OpenAI API KEY</span>
          </label>
          <input
            type="text"
            name="openai-api-key"
            id="openai-api-key"
            autoComplete="new-password"
            value={openaiApiKey}
            onChange={(e) => setOpenaiApiKey(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label mt-4">
            <span className="label-text">OpenAI API SECRET</span>
          </label>
          <input
            type="password"
            name="openai-api-secret"
            id="openai-api-secret"
            autoComplete="new-password"
            value={openaiApiSecret}
            onChange={(e) => setOpenaiApiSecret(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="basis-4/5 p-8">
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
          <button className="btn btn-neutral">
            {/* <span className="loading loading-spinner"></span>
            loading */}
            Submit
          </button>
          <div className="form-control">
            <label className="label">
              <span className="label-text">AI Response</span>
            </label>
            <textarea
              value={responseText}
              readOnly
              className="textarea textarea-bordered min-h-fit"
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
}
