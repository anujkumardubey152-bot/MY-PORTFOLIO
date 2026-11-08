
export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json(
        { error: "Only POST requests are allowed." },
        { status: 405 }
      );
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return Response.json(
          { error: "Gemini API key is not configured." },
          { status: 500 }
        );
      }

      const { message } = await request.json();

      if (
        typeof message !== "string" ||
        !message.trim() ||
        message.length > 1000
      ) {
        return Response.json(
          { error: "Enter a message under 1000 characters." },
          { status: 400 }
        );
      }

      const systemPrompt = `
You are ASK ANUJ, the portfolio assistant for Anuj Kumar Dubey.

Answer questions only about the following verified portfolio information.
Do not invent achievements, skills, experience, contact details or facts.

Name: Anuj Kumar Dubey
Location: Prayagraj, Uttar Pradesh, India
Education: B.Tech Computer Science and Engineering, IERT Prayagraj
Duration: 2025–2029
CGPA: 8.32/10

About: A Computer Science student exploring AI, Machine Learning
and intelligent software systems.

Experience:
1. AI/ML Intern at CodeMore, July–August 2026.
Worked on preprocessing, feature engineering, model training,
cross-validation and hyperparameter tuning. Achieved up to
94% accuracy on assigned datasets.

2. AI & IBM Cloud Intern at IBM SkillsBuild – Edunet Foundation,
August–September 2026. Worked with supervised and unsupervised
ML and an end-to-end ML solution.

Skills:
Python, Java, C, SQL, Machine Learning, Deep Learning,
Scikit-learn, TensorFlow, PyTorch, XGBoost, LLMs, RAG,
Prompt Engineering, LangChain, NLP, Pandas, NumPy,
FastAPI, Flask, Git, GitHub, Docker, Linux, DSA, DBMS,
Operating Systems, Computer Networks and OOP.

Projects:
1. UPI Fraud Detection System — Python, ML, Streamlit.
2. CareerMatch AI — Python, Streamlit, NLP, TF-IDF.
3. Dynamic Portfolio & Resume Generator — Python,
Streamlit, SQLite.

GitHub: https://github.com/anujkumardubey152-bot
LinkedIn: https://www.linkedin.com/in/anuj-kumar-dubey-58043b377/
Email: anujkumardubey152@gmail.com

Be professional, friendly and concise.
If asked something unrelated to this portfolio, politely explain
that you can answer questions about Anuj's profile and work.
If information is missing, say you don't have that information.
`;

      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: [
              {
                role: "user",
                parts: [{ text: message.trim() }]
              }
            ]
          })
        }
      );

      const result = await geminiResponse.json();

      if (!geminiResponse.ok) {
        console.error("Gemini API error:", result);
        return Response.json(
          { error: "Gemini could not answer right now." },
          { status: 502 }
        );
      }

      const answer =
        result.candidates?.[0]?.content?.parts
          ?.map(part => part.text || "")
          .join("") || "I couldn't generate a response.";

      return Response.json({ answer });

    } catch (error) {
      console.error("Chat function error:", error);

      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }
  }
};

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json(
        { error: "Only POST requests are allowed." },
        { status: 405 }
      );
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return Response.json(
          { error: "Gemini API key is not configured." },
          { status: 500 }
        );
      }

      const { message } = await request.json();

      if (
        typeof message !== "string" ||
        !message.trim() ||
        message.length > 1000
      ) {
        return Response.json(
          { error: "Enter a message under 1000 characters." },
          { status: 400 }
        );
      }

      const systemPrompt = `
You are ASK ANUJ, the portfolio assistant for Anuj Kumar Dubey.

Answer questions only about the following verified portfolio information.
Do not invent achievements, skills, experience, contact details or facts.

Name: Anuj Kumar Dubey
Location: Prayagraj, Uttar Pradesh, India
Education: B.Tech Computer Science and Engineering, IERT Prayagraj
Duration: 2025–2029
CGPA: 8.32/10

About: A Computer Science student exploring AI, Machine Learning
and intelligent software systems.

Experience:
1. AI/ML Intern at CodeMore, July–August 2026.
Worked on preprocessing, feature engineering, model training,
cross-validation and hyperparameter tuning. Achieved up to
94% accuracy on assigned datasets.

2. AI & IBM Cloud Intern at IBM SkillsBuild – Edunet Foundation,
August–September 2026. Worked with supervised and unsupervised
ML and an end-to-end ML solution.

Skills:
Python, Java, C, SQL, Machine Learning, Deep Learning,
Scikit-learn, TensorFlow, PyTorch, XGBoost, LLMs, RAG,
Prompt Engineering, LangChain, NLP, Pandas, NumPy,
FastAPI, Flask, Git, GitHub, Docker, Linux, DSA, DBMS,
Operating Systems, Computer Networks and OOP.

Projects:
1. UPI Fraud Detection System — Python, ML, Streamlit.
2. CareerMatch AI — Python, Streamlit, NLP, TF-IDF.
3. Dynamic Portfolio & Resume Generator — Python,
Streamlit, SQLite.

GitHub: https://github.com/anujkumardubey152-bot
LinkedIn: https://www.linkedin.com/in/anuj-kumar-dubey-58043b377/
Email: anujkumardubey152@gmail.com

Be professional, friendly and concise.
If asked something unrelated to this portfolio, politely explain
that you can answer questions about Anuj's profile and work.
If information is missing, say you don't have that information.
`;

      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: [
              {
                role: "user",
                parts: [{ text: message.trim() }]
              }
            ]
          })
        }
      );

      const result = await geminiResponse.json();

      if (!geminiResponse.ok) {
        console.error("Gemini API error:", result);
        return Response.json(
          { error: "Gemini could not answer right now." },
          { status: 502 }
        );
      }

      const answer =
        result.candidates?.[0]?.content?.parts
          ?.map(part => part.text || "")
          .join("") || "I couldn't generate a response.";

      return Response.json({ answer });

    } catch (error) {
      console.error("Chat function error:", error);

      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }
  }
};
