// Extends the HTMLElement class to create a custom element
class AIWidget extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<iframe border= 0 width= 100% height= 100% src="https://langchain-nextjs-anuragbanerjee.vercel.app/" title="Chatbot" frameborder="0"></iframe>`;
  }
}

// Define the custom element
customElements.define("ai-widget", AIWidget);

window.onload = function () {
  const widgetContainer = document.getElementById("ai-widget-container");
  widgetContainer.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 80px;
    display: none;
    width: 480px;
    height: 78vh;
    z-index: 999;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
  `;

  const widgetArea = document.createElement("div");
  widgetContainer.appendChild(widgetArea);
  widgetArea.classList.add("widget-area");
  widgetArea.style.cssText = `width: 100%; height: 100%;`;

  const { iconbackground = "#fff" } = widgetContainer.dataset;

  // Create and initialize the FAB
  const FAB = document.createElement("button");
  FAB.id = "FAB";
  const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>`;
  const crossIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  FAB.innerHTML = arrowIcon;
  document.body.appendChild(FAB);
  FAB.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    background-color: ${iconbackground};
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
  `;

  // Create the chat widget
  let aIWidget = document.createElement("ai-widget");
  aIWidget.id = "aIWidget";
  aIWidget.style.cssText = `display: block; width: 100%; height: 100%;`;
  widgetArea.appendChild(aIWidget);

  // Add event listener to the floating icon button
  FAB.addEventListener("click", function () {
    if (aIWidget.classList.contains("open")) {
      widgetContainer.style.display = "none";
      aIWidget.classList.remove("open");
      FAB.innerHTML = arrowIcon;
    } else {
      widgetContainer.style.display = "block";
      aIWidget.classList.add("open");
      FAB.innerHTML = crossIcon;
    }
  });
};
