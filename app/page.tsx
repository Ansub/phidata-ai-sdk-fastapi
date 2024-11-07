"use client";

import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      experimental_prepareRequestBody: () => ({
        message: input,
        agent_id: "web-agent",
        stream: true,
        monitor: false,
        user_id: "test-user",
      }),
      streamProtocol: "text",
      onResponse: async (response) => {
        const data = await response.json();
        console.log("Parsed response data:", data);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
      onFinish: (message) => {
        console.log("Finished message:", message);
      },
    });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col p-4 gap-2">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-row gap-2">
            <div className="w-24 text-zinc-500 flex-shrink-0">{`${message.role}: `}</div>
            <div className="flex flex-col gap-2">{message.content}</div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col fixed bottom-0 w-full border-t"
      >
        <input
          value={input}
          placeholder="What can you do?"
          onChange={handleInputChange}
          className="w-full p-4 outline-none bg-transparent"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
