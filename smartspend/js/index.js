"use strict";


// ==========================================
// ELEMENTS
// ==========================================

const messageInput =
  document.getElementById("messageInput");

const sendBtn =
  document.getElementById("sendBtn");

const chatArea =
  document.getElementById("chatArea");

const welcome =
  document.getElementById("welcome");

const newChatBtn =
  document.getElementById("newChat");

const menuBtn =
  document.getElementById("menuBtn");

const sidebar =
  document.getElementById("sidebar");

const themeBtn =
  document.getElementById("themeBtn");


// ==========================================
// THEME
// ==========================================

function applyTheme(theme) {

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  if (theme === "dark") {

    themeBtn.textContent = "☀️";

    themeBtn.title =
      "Switch to light mode";

    themeBtn.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

  } else {

    themeBtn.textContent = "🌙";

    themeBtn.title =
      "Switch to dark mode";

    themeBtn.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );
  }
}


// Get saved theme
const savedTheme =
  localStorage.getItem("theme");


// Apply saved theme
if (
  savedTheme === "dark" ||
  savedTheme === "light"
) {

  applyTheme(savedTheme);

} else {

  // Detect system theme
  const prefersDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  applyTheme(
    prefersDark
      ? "dark"
      : "light"
  );
}


// Toggle theme
themeBtn.addEventListener("click", () => {

  const currentTheme =
    document.documentElement.getAttribute(
      "data-theme"
    );

  const newTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  applyTheme(newTheme);

  localStorage.setItem(
    "theme",
    newTheme
  );
});


// ==========================================
// TEXTAREA AUTO RESIZE
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


  // Hide welcome
  welcome.style.display = "none";


  // Add user message
  addMessage(
    text,
    "user"
  );


  // Reset input
  messageInput.value = "";

  messageInput.style.height =
    "auto";

  sendBtn.classList.remove(
    "active"
  );


  // Show typing
  showTyping();


  // Simulate AI response
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


  const avatar =
    type === "user"
      ? "👤"
      : "✦";


  const inner =
    document.createElement("div");

  inner.className =
    "message-inner";


  const avatarElement =
    document.createElement("div");

  avatarElement.className =
    "avatar";

  avatarElement.textContent =
    avatar;


  const content =
    document.createElement("div");

  content.className =
    "message-content";

  content.textContent =
    text;


  inner.appendChild(
    avatarElement
  );

  inner.appendChild(
    content
  );

  message.appendChild(
    inner
  );


  chatArea.appendChild(
    message
  );


  scrollToBottom();
}


// ==========================================
// TYPING INDICATOR
// ==========================================

function showTyping() {

  // Prevent duplicate typing
  if (
    document.getElementById(
      "typingMessage"
    )
  ) {
    return;
  }


  const message =
    document.createElement("div");


  message.className =
    "message ai";

  message.id =
    "typingMessage";


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


  chatArea.appendChild(
    message
  );


  scrollToBottom();
}


// ==========================================
// REMOVE TYPING
// ==========================================

function removeTyping() {

  const typingMessage =
    document.getElementById(
      "typingMessage"
    );


  if (typingMessage) {
    typingMessage.remove();
  }
}


// ==========================================
// DEMO AI RESPONSE
// ==========================================

function generateResponse(
  message
) {

  const text =
    message.toLowerCase();


  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {

    return (
      "Hello! 👋 How can I help you today?"
    );
  }


  if (
    text.includes("html")
  ) {

    return (
      "HTML is used to create " +
      "the structure of a web page. " +
      "You can combine HTML with CSS " +
      "for styling and JavaScript " +
      "for functionality."
    );
  }


  if (
    text.includes("css")
  ) {

    return (
      "CSS is used to style websites. " +
      "It controls colors, fonts, " +
      "spacing, layouts, animations " +
      "and responsive design."
    );
  }


  if (
    text.includes("javascript") ||
    text.includes("java script") ||
    text.includes(" js ")
  ) {

    return (
      "JavaScript makes websites " +
      "interactive. It can handle " +
      "buttons, forms, animations, " +
      "API requests and dynamic content."
    );
  }


  if (
    text.includes("website")
  ) {

    return (
      "Here are some website project ideas:\n\n" +
      "1. AI Chat Interface\n" +
      "2. Admin Dashboard\n" +
      "3. Portfolio Website\n" +
      "4. E-commerce Website\n" +
      "5. Weather App\n" +
      "6. Task Management App"
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
    "This is currently a frontend " +
    "AI chat demo. You can connect " +
    "it to a real AI API through a " +
    "backend for actual AI responses."
  );
}


// ==========================================
// ENTER TO SEND
// SHIFT + ENTER = NEW LINE
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
// SUGGESTION BUTTONS
// ==========================================

const suggestions =
  document.querySelectorAll(
    ".suggestion"
  );


suggestions.forEach(
  (button) => {

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
  }
);


// ==========================================
// NEW CHAT
// ==========================================

newChatBtn.addEventListener(
  "click",
  () => {

    // Remove messages
    const messages =
      chatArea.querySelectorAll(
        ".message"
      );


    messages.forEach(
      (message) => {
        message.remove();
      }
    );


    // Show welcome
    welcome.style.display =
      "block";


    // Reset input
    messageInput.value = "";

    messageInput.style.height =
      "auto";

    sendBtn.classList.remove(
      "active"
    );


    // Close mobile sidebar
    sidebar.classList.remove(
      "open"
    );


    // Focus input
    messageInput.focus();
  }
);


// ==========================================
// MOBILE SIDEBAR
// ==========================================

menuBtn.addEventListener(
  "click",
  () => {

    sidebar.classList.toggle(
      "open"
    );
  }
);


// ==========================================
// CHAT HISTORY
// ==========================================

const historyItems =
  document.querySelectorAll(
    ".history-item"
  );


historyItems.forEach(
  (item) => {

    item.addEventListener(
      "click",
      () => {

        historyItems.forEach(
          (historyItem) => {

            historyItem.classList.remove(
              "active"
            );

          }
        );


        item.classList.add(
          "active"
        );


        // Close mobile sidebar
        sidebar.classList.remove(
          "open"
        );
      }
    );
  }
);


// ==========================================
// SCROLL TO BOTTOM
// ==========================================

function scrollToBottom() {

  requestAnimationFrame(
    () => {

      chatArea.scrollTop =
        chatArea.scrollHeight;

    }
  );
}


// ==========================================
// CLOSE SIDEBAR ON OUTSIDE CLICK
// MOBILE
// ==========================================

document.addEventListener(
  "click",
  (event) => {

    if (
      window.innerWidth <= 700 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {

      sidebar.classList.remove(
        "open"
      );
    }
  }
);
