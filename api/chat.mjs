
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
          { error: "GEMINI_API_KEY is missing in Vercel." },
          { status: 500 }
        );
      }

      const body = await request.json();
      const message = body.message;

      if (
        typeof message !== "string" ||
        !message.trim() ||
        message.length > 1000
      ) {
        return Response.json(
          { error: "Please enter a valid question." },
          { status: 400 }
        );
      }

      const systemPrompt = `
You are ASK ANUJ, the AI portfolio assistant for Anuj Kumar Dubey.

Answer questions about Anuj's education, skills, projects
and professional experience.

EDUCATION:
B.Tech Computer Science and Engineering.
Institute of Engineering and Rural Technology (IERT), Prayagraj.
2025–2029. CGPA: 8.32/10.

EXPERIENCE:
1. AI/ML Intern at CodeMore, July–August 2026.
2. AI & IBM Cloud Intern at IBM SkillsBuild – Edunet Foundation,
August–September 2026.

PROJECTS:
1. UPI Fraud Detection System — Python, ML, Streamlit.
2. CareerMatch AI — Python, NLP, TF-IDF, Streamlit.
3. Dynamic Portfolio & Resume Generator — Python, Streamlit, SQLite.

SKILLS:
Python, Java, C, SQL, Machine Learning, Deep Learning,
TensorFlow, PyTorch, Scikit-learn, XGBoost, LLMs, RAG,
LangChain, NLP, Pandas, NumPy, FastAPI, Flask, Git, GitHub,
Docker, DSA, DBMS, OS, Computer Networks and OOP.

GitHub: https://github.com/anujkumardubey152-bot
LinkedIn: https://www.linkedin.com/in/anuj-kumar-dubey-58043b377/
Email: anujkumardubey152@gmail.com

RULES:
- Be friendly and professional.
- Keep answers concise and informative.
- Never invent personal information or achievements.
- If information is unavailable, say so.
- Focus on Anuj's professional portfolio.
`;

      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
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
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        }
      );

      const data = await geminiResponse.json();

      if (!geminiResponse.ok) {
        console.error("Gemini API error:", data);

        return Response.json(
          { error: data.error?.message || "Gemini API request failed." },
          { status: 502 }
        );
      }

      const answer = data.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("");

      if (!answer) {
        return Response.json(
          { error: "Gemini returned an empty answer. Please try again." },
          { status: 502 }
        );
      }

      return Response.json({ answer });

    } catch (error) {
      console.error("ASK ANUJ error:", error);

      return Response.json(
        { error: "Server error. Please try again." },
        { status: 500 }
      );
    }
  }
};

