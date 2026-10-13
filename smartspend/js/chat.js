"use strict";


// ==========================================
// CHAT ELEMENTS
// ==========================================

const messageInput =
  document.getElementById("messageInput");

const sendBtn =
  document.getElementById("sendBtn");

const chatArea =
  document.getElementById("chatArea");

const welcome =
  document.getElementById("welcome");


// ==========================================
// TEXTAREA
// ==========================================

messageInput.addEventListener(
  "input",
  () => {

    messageInput.style.height = "auto";

    messageInput.style.height =
      Math.min(
        messageInput.scrollHeight,
        150
      ) + "px";


    if (messageInput.value.trim()) {

      sendBtn.classList.add("active");

    } else {

      sendBtn.classList.remove("active");

    }

  }
);


// ==========================================
// SEND MESSAGE
// ==========================================

function sendMessage() {

  const text =
    messageInput.value.trim();


  if (!text) {
    return;
  }


  welcome.style.display = "none";


  addMessage(
    text,
    "user"
  );


  messageInput.value = "";

  messageInput.style.height =
    "auto";

  sendBtn.classList.remove(
    "active"
  );


  showTyping();


  setTimeout(() => {

    removeTyping();


    const response =
      generateResponse(text);


    addMessage(
      response,
      "ai"
    );

  }, 1000);
}


// ==========================================
// ADD MESSAGE
// ==========================================

function addMessage(
  text,
  type
) {

  const message =
    document.createElement("div");

  message.className =
    `message ${type}`;


  const inner =
    document.createElement("div");

  inner.className =
    "message-inner";


  const avatar =
    document.createElement("div");

  avatar.className =
    "avatar";

  avatar.textContent =
    type === "user"
      ? "👤"
      : "✦";


  const content =
    document.createElement("div");

  content.className =
    "message-content";

  content.textContent =
    text;


  inner.appendChild(avatar);

  inner.appendChild(content);

  message.appendChild(inner);

  chatArea.appendChild(message);


  scrollToBottom();
}


// ==========================================
// TYPING
// ==========================================

function showTyping() {

  const message =
    document.createElement("div");

  message.id =
    "typingMessage";

  message.className =
    "message ai";


  message.innerHTML = `
    <div class="message-inner">

      <div class="avatar">
        ✦
      </div>

      <div class="message-content">

        <div class="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  `;


  chatArea.appendChild(message);

  scrollToBottom();
}


function removeTyping() {

  const typing =
    document.getElementById(
      "typingMessage"
    );


  if (typing) {
    typing.remove();
  }
}


// ==========================================
// DEMO AI
// ==========================================

function generateResponse(message) {

  const text =
    message.toLowerCase();


  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {

    return "Hello! 👋 How can I help you today?";
  }


  if (text.includes("html")) {

    return (
      "HTML is used to create " +
      "the structure of a website."
    );
  }


  if (text.includes("css")) {

    return (
      "CSS is used to style websites, " +
      "including colors, layout, spacing " +
      "and responsive design."
    );
  }


  if (
    text.includes("javascript") ||
    text.includes("java script")
  ) {

    return (
      "JavaScript makes websites interactive. " +
      "It can handle buttons, forms, APIs, " +
      "animations and dynamic content."
    );
  }


  if (text.includes("website")) {

    return (
      "Here are some project ideas:\n\n" +
      "1. AI Chat Interface\n" +
      "2. Portfolio Website\n" +
      "3. Admin Dashboard\n" +
      "4. E-commerce Website\n" +
      "5. Weather App"
    );
  }


  if (
    text.includes("thank") ||
    text.includes("thanks")
  ) {

    return "You're welcome! 😊";
  }


  return (
    `I understand your message:\n\n` +
    `"${message}"\n\n` +
    "This is currently a frontend demo."
  );
}


// ==========================================
// ENTER TO SEND
// ==========================================

messageInput.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();
    }

  }
);


// ==========================================
// SEND BUTTON
// ==========================================

sendBtn.addEventListener(
  "click",
  sendMessage
);


// ==========================================
// SUGGESTIONS
// ==========================================

document
  .querySelectorAll(".suggestion")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const prompt =
          button.dataset.prompt;

        messageInput.value =
          prompt;

        messageInput.dispatchEvent(
          new Event("input")
        );

        messageInput.focus();
      }
    );

  });


// ==========================================
// SCROLL
// ==========================================

function scrollToBottom() {

  requestAnimationFrame(() => {

    chatArea.scrollTop =
      chatArea.scrollHeight;

  });
}
