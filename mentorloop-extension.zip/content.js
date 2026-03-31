let currentBox = null;

document.addEventListener("mouseup", () => {

  let selected = window.getSelection().toString().trim();

  if(selected.length > 5){

    // Remove old popup
    if(currentBox){
      currentBox.remove();
    }

    let box = document.createElement("div");

    box.innerHTML = `
      <div style="font-size:12px;margin-bottom:5px;">⚡ MentorLoop</div>
      <button id="quizBtn">🧠 Quiz</button>
      <button id="explainBtn">📘 Explain</button>
      <button id="testBtn">⚡ Test</button>
    `;

    box.style.position = "fixed";
    box.style.bottom = "20px";
    box.style.right = "20px";
    box.style.padding = "12px";
    box.style.background = "#020617";
    box.style.color = "#e2e8f0";
    box.style.border = "1px solid #38bdf8";
    box.style.borderRadius = "12px";
    box.style.zIndex = "9999";
    box.style.boxShadow = "0 0 20px rgba(56,189,248,0.3)";
    box.style.transition = "0.3s";
    box.style.transform = "translateY(20px)";

    document.body.appendChild(box);

    setTimeout(()=>{
      box.style.transform = "translateY(0)";
    },10);

    currentBox = box;

    // BUTTON ACTIONS
    box.querySelector("#quizBtn").onclick = () => {
      openApp("quiz", selected);
    };

    box.querySelector("#explainBtn").onclick = () => {
      openApp("explain", selected);
    };

    box.querySelector("#testBtn").onclick = () => {
      openApp("test", selected);
    };

    // Auto remove after 6s
    setTimeout(()=>{
      if(box) box.remove();
    },6000);
  }

});

// OPEN YOUR APP
function openApp(mode, text){

  let base = "https://armaanshashvat2014-dot.github.io/MentorLoop-EDU/";

  let url = base + "focus.html?mode=" + mode + "&text=" + encodeURIComponent(text);

  window.open(url, "_blank");
}