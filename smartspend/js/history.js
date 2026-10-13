"use strict";


// ==========================================
// HISTORY
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
          (history) => {

            history.classList.remove(
              "active"
            );

          }
        );


        item.classList.add(
          "active"
        );
      }
    );

  }
);


// ==========================================
// NEW CHAT
// ==========================================

const newChatBtn =
  document.getElementById("newChat");


newChatBtn.addEventListener(
  "click",
  () => {

    const messages =
      document.querySelectorAll(
        ".message"
      );


    messages.forEach(
      (message) => {

        message.remove();

      }
    );


    const welcome =
      document.getElementById(
        "welcome"
      );


    welcome.style.display =
      "block";


    const input =
      document.getElementById(
        "messageInput"
      );


    input.value = "";

    input.style.height =
      "auto";


    document
      .getElementById("sendBtn")
      .classList.remove(
        "active"
      );
  }
);
