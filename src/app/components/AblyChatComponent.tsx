'use client';

import React, { useEffect, useState, useRef } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import styles from "./AblyChatComponent.module.css";
import { Types } from "ably";

export default function AblyChatComponent() {
  const inputBox = useRef<HTMLTextAreaElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  // make the code above compatible with Typescript
  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.current?.focus();
    console.log(receivedMessages);
  };

  const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress: React.KeyboardEventHandler = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <span key={index} className={styles.message} data-author={author}>
        {" "}
        {message.data}{" "}
      </span>
    );
  });

  // useEffect(() => {
  //   messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  // });

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div ref={messageEnd}> </div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textarea}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={messageTextIsEmpty}
        >
          {" "}
          Send{" "}
        </button>
      </form>
    </div>
  );
}
