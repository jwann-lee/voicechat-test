const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  output.innerText = "이 브라우저는 음성 인식을 지원하지 않아요 😢";
} else {
  const recognition = new SpeechRecognition();
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

  recognition.onerror = (event) => {
    output.innerText = "음성 인식 오류: " + event.error;
  };

  recognition.start();
}
