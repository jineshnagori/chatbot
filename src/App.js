import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";
import images from "./assets/cross.svg";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // const scrollToBottom = () => {
  //   const chatContainer = document.getElementById("chat-container");
  //   chatContainer.scrollTop = chatContainer?.scrollHeight
  //     ? chatContainer?.scrollHeight
  //     : 0;
  // };
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer !== null) {
      const lastMsg = chatContainer.lastElementChild;
      const lastMsgHeight = lastMsg.offsetHeight;
      const chatContainerHeight = chatContainer.offsetHeight;
      const maxScrollTop = chatContainer.scrollHeight - chatContainerHeight;
      let newScrollTop = maxScrollTop + lastMsgHeight;

      if (newScrollTop > maxScrollTop) {
        chatContainer.scrollTop = newScrollTop;
      } else {
        chatContainer.scrollTop = maxScrollTop;
      }
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // add the user's message to the messages array
    const newMessages = [...messages, { text: inputValue, sender: "user" }];
    setMessages(newMessages);
    setInputValue("");

    // find a response based on the user's input
    const question = data.questions.find((ques) =>
      ques.question.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (question) {
      const botMessage = { text: question.answer, sender: "bot" };
      setMessages([...newMessages, botMessage]);
    } else {
      const responses = inputValue.startsWith("bye")
        ? data.farewells
        : data.greetings;
      const response = responses[Math.floor(Math.random() * responses.length)];
      const botMessage = { text: response, sender: "bot" };
      setMessages([...newMessages, botMessage]);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="App">
      {isOpen ? (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <img
              src={images}
              alt="Cancel"
              onClick={handleClose}
              className="Close"
            />

            <h1>Diacom Chatbot</h1>
          </div>
          <div className="chatbot-messages" id="chat-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.sender === "bot"
                    ? "chat-message-bot"
                    : "chat-message-user"
                }`}
              >
                <div className="chat-message-text">{message.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message here"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <img
          src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw="
          alt="hello"
          className="Bot-img"
          onClick={toggleChatbot}
        />
      )}
    </div>
  );
}

export default Chatbot;
{
  /* <button className="Bot-img" onClick={toggleChatbot}>
          Open
        </button> */
}
