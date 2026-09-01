/* =========================================
   NEUROBOT NLP CHATBOT
========================================= */

let messageCount = 128;


/* DOM ELEMENTS */

const input =
    document.getElementById("messageInput");

const chatBody =
    document.getElementById("chatBody");

const totalMessages =
    document.getElementById("totalMessages");


/* =========================================
   NLP INTENTS
========================================= */

const intents = {

    greeting: {
        keywords: [
            "hello",
            "hi",
            "hey",
            "hai",
            "good morning",
            "good afternoon",
            "good evening"
        ],

        responses: [
            "Hello! 👋 How can I help you?",
            "Hi! 🤖 Nice to meet you.",
            "Hey! What would you like to know?"
        ]
    },


    nlp: {
        keywords: [
            "nlp",
            "natural language processing",
            "what is nlp"
        ],

        responses: [
            "🧠 NLP means Natural Language Processing. It helps computers understand and process human language.",
            "NLP is a branch of AI used in chatbots, translation, sentiment analysis and text classification."
        ]
    },


    python: {
        keywords: [
            "python",
            "learn python"
        ],

        responses: [
            "🐍 Python is a popular programming language used in AI, Data Science, Machine Learning and Web Development.",
            "Python has a simple syntax and powerful libraries such as NumPy, Pandas, NLTK and Scikit-learn."
        ]
    },


    ai: {
        keywords: [
            "artificial intelligence",
            "what is ai",
            "ai"
        ],

        responses: [
            "🤖 Artificial Intelligence enables computers to perform tasks that normally require human intelligence.",
            "AI includes Machine Learning, Deep Learning, NLP, Computer Vision and Robotics."
        ]
    },


    machineLearning: {
        keywords: [
            "machine learning",
            "machine learning",
            "ml"
        ],

        responses: [
            "📊 Machine Learning allows computers to learn patterns from data and make predictions.",
            "The major types of Machine Learning are supervised, unsupervised and reinforcement learning."
        ]
    },


    project: {
        keywords: [
            "project",
            "project idea",
            "college project",
            "mini project"
        ],

        responses: [
            "🚀 You can build projects such as an NLP chatbot, AQI prediction system, recommendation system or sentiment analysis application.",
            "For an AI & Data Science project, an NLP chatbot is a good choice because it combines Python, NLP and Machine Learning."
        ]
    },


    chatbot: {
        keywords: [
            "chatbot",
            "what can you do",
            "capabilities"
        ],

        responses: [
            "🤖 I can understand simple user intents and provide NLP-based responses.",
            "I can answer questions about NLP, AI, Python, Machine Learning and projects."
        ]
    },


    college: {
        keywords: [
            "college",
            "student",
            "exam",
            "study"
        ],

        responses: [
            "🎓 Keep practicing programming, SQL, Data Science and Machine Learning regularly.",
            "For AI & Data Science, focus on Python, SQL, Statistics, ML and practical projects."
        ]
    },


    thanks: {
        keywords: [
            "thank you",
            "thanks",
            "thank"
        ],

        responses: [
            "You're welcome! 😊",
            "Happy to help! 🚀"
        ]
    },


    goodbye: {
        keywords: [
            "bye",
            "goodbye",
            "see you"
        ],

        responses: [
            "Goodbye! 👋 Have a great day!",
            "See you later! 🚀"
        ]
    }

};


/* =========================================
   NLP TEXT CLEANING
========================================= */

function cleanText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

}


/* =========================================
   TOKENIZATION
========================================= */

function tokenize(text) {

    return cleanText(text)
        .split(" ")
        .filter(word => word.length > 0);

}


/* =========================================
   INTENT DETECTION
========================================= */

function detectIntent(text) {

    const cleaned =
        cleanText(text);

    let bestIntent = "unknown";

    let highestScore = 0;


    for (
        const [intent, data] of Object.entries(intents)
    ) {

        let score = 0;


        data.keywords.forEach(keyword => {

            if (
                cleaned.includes(
                    keyword
                )
            ) {

                score++;

            }

        });


        if (score > highestScore) {

            highestScore = score;

            bestIntent = intent;

        }

    }


    return {

        intent: bestIntent,

        confidence: highestScore > 0 ?
            Math.min(
                70 + highestScore * 8,
                98
            ) :
            40

    };

}


/* =========================================
   SENTIMENT ANALYSIS
========================================= */

function analyzeSentiment(text) {

    const tokens =
        tokenize(text);


    const positive = [
        "good",
        "great",
        "excellent",
        "awesome",
        "happy",
        "amazing",
        "love",
        "nice"
    ];


    const negative = [
        "bad",
        "sad",
        "angry",
        "hate",
        "terrible",
        "worst",
        "error",
        "problem"
    ];


    let positiveCount = 0;
    let negativeCount = 0;


    tokens.forEach(word => {

        if (positive.includes(word)) {
            positiveCount++;
        }

        if (negative.includes(word)) {
            negativeCount++;
        }

    });


    if (
        positiveCount >
        negativeCount
    ) {

        return {
            label: "Positive",
            score: 85
        };

    }


    if (
        negativeCount >
        positiveCount
    ) {

        return {
            label: "Negative",
            score: 35
        };

    }


    return {
        label: "Neutral",
        score: 72
    };

}


/* =========================================
   GENERATE RESPONSE
========================================= */

function generateResponse(text) {

    const result =
        detectIntent(text);

    const sentiment =
        analyzeSentiment(text);


    updateNLP(
        result,
        sentiment
    );


    if (
        result.intent ===
        "unknown"
    ) {

        return `
            🤔 I'm not sure I understand that yet.

            <br><br>

            Try asking me about
            <b>NLP, AI, Python,
            Machine Learning,
            chatbots or projects.</b>
        `;

    }


    const responses =
        intents[
            result.intent
        ].responses;


    return responses[
        Math.floor(
            Math.random() *
            responses.length
        )
    ];

}


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(
    text,
    sender
) {

    const message =
        document.createElement("div");

    message.className =
        `message ${sender}`;


    const avatar =
        document.createElement("div");

    avatar.className =
        `message-avatar ${
            sender === "bot"
                ? "bot-avatar"
                : "user-avatar"
        }`;


    avatar.innerHTML =
        sender === "bot" ?
        '<i class="fa-solid fa-robot"></i>' :
        '<i class="fa-solid fa-user"></i>';


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const name =
        document.createElement("div");

    name.className =
        "message-name";


    name.textContent =
        sender === "bot" ?
        "NeuroBot • AI Assistant" :
        "You";


    const bubble =
        document.createElement("div");

    bubble.className =
        "bubble";

    bubble.innerHTML =
        text;


    content.appendChild(name);

    content.appendChild(bubble);

    message.appendChild(avatar);

    message.appendChild(content);


    chatBody.appendChild(message);


    chatBody.scrollTop =
        chatBody.scrollHeight;

}


/* =========================================
   SEND MESSAGE
========================================= */

function sendMessage() {

    const text =
        input.value.trim();


    if (!text) {

        showToast(
            "Please type a message"
        );

        return;

    }


    addMessage(
        escapeHTML(text),
        "user"
    );


    input.value = "";


    messageCount++;

    totalMessages.textContent =
        messageCount;


    showTyping();


    setTimeout(() => {

        hideTyping();


        const response =
            generateResponse(text);


        addMessage(
            response,
            "bot"
        );


        messageCount++;

        totalMessages.textContent =
            messageCount;

    }, 800);

}


/* =========================================
   ENTER KEY
========================================= */

input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            sendMessage();

        }

    }
);


/* =========================================
   QUICK QUESTIONS
========================================= */

function quickMessage(text) {

    input.value = text;

    sendMessage();

}


/* =========================================
   TYPING ANIMATION
========================================= */

function showTyping() {

    const typing =
        document.getElementById(
            "typingMessage"
        );


    typing.style.display =
        "flex";


    chatBody.scrollTop =
        chatBody.scrollHeight;

}


function hideTyping() {

    const typing =
        document.getElementById(
            "typingMessage"
        );


    typing.style.display =
        "none";

}


/* =========================================
   UPDATE NLP DASHBOARD
========================================= */

function updateNLP(
    result,
    sentiment
) {

    const bars =
        document.querySelectorAll(
            ".progress-bar"
        );


    if (bars.length >= 4) {

        bars[0].style.width =
            result.confidence + "%";

        bars[1].style.width =
            sentiment.score + "%";

        bars[2].style.width =
            Math.min(
                result.confidence + 2,
                99
            ) + "%";

        bars[3].style.width =
            "68%";

    }


    const values =
        document.querySelectorAll(
            ".nlp-label strong"
        );


    if (values.length >= 3) {

        values[0].textContent =
            result.confidence + "%";

        values[1].textContent =
            sentiment.score + "%";

        values[2].textContent =
            Math.min(
                result.confidence + 2,
                99
            ) + "%";

    }

}


/* =========================================
   CLEAR CHAT
========================================= */

function clearChat() {

    chatBody.innerHTML = "";


    addMessage(
        `
        👋 Chat cleared!

        <br><br>

        I'm ready for a new conversation.
        `,
        "bot"
    );


    showToast(
        "Conversation cleared"
    );

}


/* =========================================
   EXPORT CHAT
========================================= */

function exportChat() {

    const messages =
        document.querySelectorAll(
            "#chatBody .message"
        );


    let text =
        "NEUROBOT AI CHAT\n";

    text +=
        "====================\n\n";


    messages.forEach(message => {

        const name =
            message.querySelector(
                ".message-name"
            )?.innerText || "";


        const bubble =
            message.querySelector(
                ".bubble"
            )?.innerText || "";


        text +=
            `${name}: ${bubble}\n\n`;

    });


    const file =
        new Blob(
            [text], {
                type: "text/plain"
            }
        );


    const url =
        URL.createObjectURL(file);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "neurobot-chat.txt";


    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Chat exported successfully"
    );

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2200);

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".nav-item"
                    )
                    .forEach(nav => {

                        nav.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                const title =
                    this.querySelector(
                        "span"
                    );


                if (title) {

                    showToast(
                        title.textContent +
                        " selected"
                    );

                }

            }
        );

    });


/* =========================================
   START
========================================= */

console.log(
    "NeuroBot NLP Chatbot Started 🚀"
);