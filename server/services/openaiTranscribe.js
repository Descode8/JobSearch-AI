const fs = require("fs");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio(filePath) {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: process.env.OPENAI_TRANSCRIBE_MODEL,
        response_format: "text",
    });

    return transcription;
}

module.exports = transcribeAudio;