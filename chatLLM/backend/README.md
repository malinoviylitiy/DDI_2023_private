# ChatLLM with FastAPI & React

This project is an interactive chat application using FastAPI to interface with the mistral-7b-v0.1.Q8_0 generative model and Next.js for building the user interface.

## Getting Started

### Prerequisites

To run this application, you need:
- Python 3.8 or later
- Node.js 18.17 or later
- macOS, Windows (including WSL), or Linux

### Running the App

1. Clone the repository and install frontend dependencies:
   ```bash
   npm install
2. Start the frontend development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 in your browser to see the result.
4. Install FastAPI dependencies:
   ```bash
   pip install fastapi[all]
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn app:app --reload
   ```

### Note

Now it is in test mode so there is a restriction — 5 tokens. If you want to remove it, edit code in chatLLM/backend/llama.cpp/app.py:
```python
   command = f"{executable_path} -m {model_path} -p {request.prompt} -n 5"
```

## API Routes

- `GET /`: Returns a message indicating the server is running.
- `GET /messages`: Retrieves all messages.
- `PUT /message/{message_id}`: Updates the message with the specified ID (like/dislike).
- `POST /generate`: Generates a response based on the user's query.

## Features

Users can send messages through the frontend, which are then passed to the FastAPI server. The server queries the mistral-7b-v0.1.Q8_0 model to generate a response and returns it to the frontend. Users can rate the model's responses by liking or disliking them.