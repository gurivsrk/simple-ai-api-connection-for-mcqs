# PDF to MCQ Generator

Generates 30 multiple-choice questions from a textbook chapter PDF using Google Gemini. The output is structured JSON, ready to store in a database.

Currently set up for Bihar Board Class 10 Science (Vigyan), Chapter 10.

## Requirements

- Node.js 18 or later
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

   `.env` is in `.gitignore`, so never commit it.

## Usage

Run from the project root, because the PDF path is relative:

```bash
npm start
```

The script prints the generated MCQs as JSON, followed by the response time.

To use a different chapter, put the PDF in the project root and change the filename in `index.js`.

## Output format

The output is an array of 30 objects like this:

```json
[
  {
    "id": 1,
    "question": "...",
    "options": [
      { "id": 1, "text": "..." },
      { "id": 2, "text": "..." },
      { "id": 3, "text": "..." },
      { "id": 4, "text": "..." }
    ],
    "answer": { "id": 3, "text": "..." },
    "explanation": "..."
  }
]
```

`answer.id` refers to the matching `options[].id`, so you can link answers to options in the database. The prompt asks the model to keep these consistent, but the schema can't enforce it. Check that each answer matches one of its options before you insert it.

## Project structure

| File | Purpose |
| --- | --- |
| `index.js` | Reads the PDF, calls Gemini with the MCQ schema, prints the result |
| `class-10-chapter-10-book-vigyan-bihar-board.pdf` | Source chapter |
| `.env` | Gemini API key (not committed) |
