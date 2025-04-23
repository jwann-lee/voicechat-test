
const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  output.innerText = "이 브라우저는 음성 인식을 지원하지 않아요 😢";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = async (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        if (text.includes("완료") || text.includes("엔터")) {
          const cleaned = text.replace(/완료|엔터/g, "").trim();
          output.innerText = "👉 " + cleaned;

          // ChatGPT API 요청
          try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: cleaned }]
              })
            });

            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content || "답변을 불러오지 못했어요.";
            output.innerText += "\n채비서: " + reply;
          } catch (error) {
            output.innerText += "\n채비서 오류: " + error.message;
          }

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
