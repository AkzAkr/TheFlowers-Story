// js/story-tabs.js
(function () {
  "use strict";

  function showStory(event) {
    const arcId = event.target.dataset.arc;
    if (!arcId) return;

    document
      .querySelectorAll(".story-tab")
      .forEach((tab) => tab.classList.remove("active"));
    document
      .querySelectorAll(".story-content")
      .forEach((content) => content.classList.remove("active"));

    event.target.classList.add("active");
    const target = document.getElementById(arcId);
    if (target) target.classList.add("active");
  }

  window.StoryTabs = {
    init() {
      document.querySelectorAll(".story-tab").forEach((tab) => {
        tab.addEventListener("click", showStory);
      });
    },
  };
})();
