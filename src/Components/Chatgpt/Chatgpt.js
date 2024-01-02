import React, { useState } from "react";

const ChatGPT = () => {
  const [userInput, setUserInput] = useState("");
  const [chatOutput, setChatOutput] = useState("");

  const sendMessage = async () => {
    // Make API request to OpenAI
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 100,
        }),
      }
    );

    // Parse and set the response
    const result = await response.json();
    const modelOutput =
      result.choices[0]?.text || "No response from the model.";
    setChatOutput(modelOutput);
  };

  return (
    <div>
      <div>
        <label htmlFor="userInput">User Input:</label>
        <input
          type="text"
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <label htmlFor="chatOutput">ChatGPT Output:</label>
        <div>{chatOutput}</div>
      </div>
    </div>
  );
};

export default ChatGPT;
