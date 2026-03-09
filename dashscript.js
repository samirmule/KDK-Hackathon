// -------------------- OpenRouter AI Chat --------------------
const API_KEY = "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"; // your OpenRouter API key
async function sendMessage() {
    let input = document.getElementById("chatInput");
    let message = input.value;
    let chat = document.getElementById("chatMessages");

    if (message.trim() === "") return;

    chat.innerHTML += `<div><b>You:</b> ${message}</div>`;
    input.value = "";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        // safely get the reply text
        let reply = data.choices[0]?.message?.content || "No response from AI.";

        // split by new lines so each line is added separately
        let lines = reply.split(/\r?\n/).filter(line => line.trim() !== "");

        for (let line of lines) {
            chat.innerHTML += `<div><b>Assistant:</b> ${line}</div>`;
        }

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {
        console.error(error);
        chat.innerHTML += `<div><b>Assistant:</b> Error connecting to AI.</div>`;
    }
}

// -------------------- FAQ Generation --------------------
function generateFAQ() {
    let name = document.getElementById("name").value;
    let type = document.getElementById("type").value;
    let services = document.getElementById("services").value;
    let location = document.getElementById("location").value;
    let hours = document.getElementById("hours").value;
    let delivery = document.getElementById("delivery").value;
    let policy = document.getElementById("policy").value;
    let contact = document.getElementById("contact").value;

    let faq = `
    <h3>Generated FAQs</h3>

    <b>What services does ${name} provide?</b>
    <p>${name} offers ${services}</p>

    <b>What type of business is ${name}?</b>
    <p>${name} is a ${type} located in ${location}</p>

    <b>What are the working hours?</b>
    <p>${hours}</p>

    <b>Do you offer delivery?</b>
    <p>${delivery}</p>

    <b>What is the return policy?</b>
    <p>${policy}</p>

    <b>How can customers contact you?</b>
    <p>${contact}</p>
    `;

    document.getElementById("faqBox").innerHTML = faq;
}

// -------------------- Excel Download --------------------
function downloadExcel() {
    let name = document.getElementById("name").value;
    let services = document.getElementById("services").value;
    let location = document.getElementById("location").value;
    let hours = document.getElementById("hours").value;
    let delivery = document.getElementById("delivery").value;
    let policy = document.getElementById("policy").value;
    let contact = document.getElementById("contact").value;

    let data = [
        ["Question", "Answer"],
        [`What services does ${name} provide?`, `${services}`],
        [`Where is ${name} located?`, `${location}`],
        [`Working hours`, `${hours}`],
        [`Delivery available?`, `${delivery}`],
        [`Return policy`, `${policy}`],
        [`Contact`, `${contact}`]
    ];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "FAQs");
    XLSX.writeFile(wb, name + "_FAQ.xlsx");
}

// -------------------- Voice Input --------------------
function startVoice() {
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
        let voiceText = event.results[0][0].transcript;
        document.getElementById("chatInput").value = voiceText;
    };
    recognition.start();
}

// -------------------- Image Upload --------------------
function handleImage() {
    let file = document.getElementById("imageUpload").files[0];
    let chat = document.getElementById("chatMessages");

    chat.innerHTML += `<div><b>You uploaded:</b> ${file.name}</div>`;
    chat.innerHTML += `<div><b>Assistant:</b> Image received. Processing...</div>`;
}