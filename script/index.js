class AIWidget extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <iframe border="0" width="100%" height="100%" src="https://langchain-nextjs-anuragbanerjee.vercel.app/" title="Chatbot" frameborder="0"></iframe>
    `;
  }
}

customElements.define("ai-widget", AIWidget);

document.addEventListener("DOMContentLoaded", function () {
  const widgetContainer = document.getElementById("ai-widget-container");
  const FAB = document.createElement("button");
  const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>`;
  const crossIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  const isWidgetOpen = localStorage.getItem("widgetOpen");
  const iconbackground = widgetContainer.dataset.iconbackground || "#fff";

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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `;

  FAB.id = "FAB";
  FAB.innerHTML = arrowIcon;
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

  document.body.appendChild(FAB);

  let aIWidget = document.createElement("ai-widget");
  aIWidget.id = "aIWidget";
  aIWidget.style.cssText = `display: block; width: 100%; height: 100%;`;
  widgetContainer.appendChild(aIWidget);

  const toggleWidget = () => {
    const isOpen = aIWidget.classList.toggle("open");
    widgetContainer.style.display = isOpen ? "block" : "none";
    FAB.innerHTML = isOpen ? crossIcon : arrowIcon;
    localStorage.setItem("widgetOpen", isOpen.toString());
  };

  if (isWidgetOpen === "true") {
    toggleWidget();
  }

  FAB.addEventListener("click", toggleWidget);
});
