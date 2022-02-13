// ==UserScript==
// @name         Inline Subtitles for Echo360
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://echo360.org.uk/lesson/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  setTimeout(function () {
    // Your code here...
    //do what you need here
    document.querySelector(".transcript").click();
    document.querySelector("#tooltips").innerHTML = `
    <div style="width: 100vw; bottom: 50px; display: flex; flex-flow: row; justify-content: center; z-index: 3; position: fixed"">
                  <div
                    class="inline-subs"
                    style="background-color: rgba(8, 8, 8, 0.75); font-size: 22px; display: flex; flex-flow: row; justify-content: center; color: rgb(255, 255, 255); padding: 0.25rem; border-radius: 0.25rem"
                  >Welcome to Yi Hein's Inline Subs
                  </div>
                </div>
    `;

    function updateSubtitle() {
      const width = document
        .querySelector(".screens")
        .getBoundingClientRect().width;
      document.querySelector("#tooltips").innerHTML = `
                <div style="width: ${width}px; bottom: 50px; display: flex; flex-flow: row; justify-content: center; z-index: 3; position: fixed">
                  <div
                    class="inline-subs"
                    draggable="true"
                    style="background-color: rgba(8, 8, 8, 0.75); font-size: 22px; display: flex; flex-flow: row; justify-content: center; color: rgb(255, 255, 255); padding: 0.25rem 0.5rem 0.25rem 0.5rem; border-radius: 0.25rem"
                  >
                  </div>
                </div>
                `;
      const text = document.querySelector(".highlight").textContent;
      document.querySelector(".inline-subs").textContent = text;
    }
    try {
      const observer = new MutationObserver(updateSubtitle);
      observer.observe(document.querySelector(".transcript-cues"), {
        attributes: true,
        childList: true,
        subtree: true,
      });
      document.querySelector(".transcript-panel").style.display = "none";
      document.querySelector(".sidebar").style.flex = "0 0";


      // Enable drag and drop
      function dragstart_handler(ev) {
        // Add the target element's id to the data transfer object
        ev.dataTransfer.setData("text/plain", ev.target.id);
        ev.dataTransfer.dropEffect = "move";
      }
      const dragableElement = document.querySelector(".inline-subs");
      // Add the ondragstart event listener
      dragableElement.addEventListener("dragstart", dragstart_handler);

      const showTranscript = () => {
        document.querySelector(".transcript-panel").style = "";
        document.querySelector(".sidebar").style.flex = "0 0 400px";
      }
      const hideTranscript = () => {
        document.querySelector(".transcript-panel").style.display = "none";
        document.querySelector(".sidebar").style.flex = "0 0";
      }
      // enable transcript panel
      const openTranscriptButton = document.querySelector(".actions")
      openTranscriptButton.innerHTML = `
      <button class="open_transcript">Show</button>
      <button class="close_transcript">Hide</button>
      `
      document.querySelector(".open_transcript").onclick = showTranscript
      document.querySelector(".close_transcript").onclick = hideTranscript

    } catch (error) {
      console.error(error);
      document.querySelector(
        "#tooltips"
      ).innerHTML = `<div class="inline-subs" style="width: 100vw; background-color: white; bottom: 50px; font-size: 22px; display: flex; flex-flow: row; justify-content: center; z-index: 3; position: fixed; color: red;"><p>ERROR: Refresh the page, open transcript panel, paste the code again<p></div>`;
    }
  }, 2000);
})();
