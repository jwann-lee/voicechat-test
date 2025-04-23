
const output = document.getElementById("output");
const recognition = new webkitSpeechRecognition();
recognition.lang = "ko-KR";
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = (event) => {
  let text = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    text += event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      if (text.includes("완료") || text.includes("엔터")) {
        const cleaned = text.replace(/완료|엔터/g, "").trim();
        output.innerText = "👉 " + cleaned;
        text = "";
      }
    }
  }
};

recognition.start();
