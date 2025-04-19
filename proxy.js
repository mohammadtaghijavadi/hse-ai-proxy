const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // API Key را از متغیرهای محیطی بگیرید
const OPENROUTER_API_URL = "https://api.aimlapi.com/chat/completions";

app.post("/proxy", async (req, res) => {
    try {
        const body = req.body;

        const response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": req.headers.referer || "",
                "X-Title": "HSE Chat Assistant"
            },
            body: JSON.stringify({
                model: body.model,
                messages: body.messages,
                temperature: body.temperature,
                max_tokens: body.max_tokens
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error calling OpenRouter API:", error);
        res.status(500).json({ error: "خطا در ارتباط با سرور هوش مصنوعی." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
