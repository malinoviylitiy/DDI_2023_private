from typing import Union

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import subprocess
import os
import asyncio

app = FastAPI()

# Простая структура данных для хранения сообщений
messages = []

class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: int = 128
    temperature: float = 0.7
    top_p: float = 1.0

class Message(BaseModel):
    text: str
    liked: bool = False
    disliked: bool = False

@app.get("/")
def read_root():
    return {"app.py is running"}

@app.get("/messages")
def get_messages():
    return {"messages": messages}

@app.put("/message/{message_id}")
def update_message(message_id: int, message_update: Message):
    if message_id < 0 or message_id >= len(messages):
        raise HTTPException(status_code=404, detail="Message not found")

    messages[message_id] = message_update.dict()
    return {"message": messages[message_id]}

@app.post("/generate")
async def generate_answer(request: GenerateRequest):
    try:
        # Путь к директории, где находится app.py
        app_directory = os.path.dirname(os.path.realpath(__file__))
        
        # Путь к исполняемому файлу внутри директории llama.cpp
        executable_path = os.path.join(app_directory, "main")

        # Формируем команду для вызова исполняемого файла
        command = f"timeout 10 {executable_path} -m models/mistral-7b-v0.1.Q8_0.gguf -p {request.prompt}"

        # Асинхронное выполнение команды
        process = await asyncio.create_subprocess_shell(
            command,
            cwd=app_directory,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            raise Exception(f"Error in llama.cpp: {stderr.decode('utf-8')}")

        # Преобразование вывода в строку
        output = stdout.decode('utf-8').strip()

        # Добавление ответа в список сообщений
        generated_message = {"text": output, "liked": False, "disliked": False}
        messages.append(generated_message)

        return generated_message
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi.middleware.cors import CORSMiddleware

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Разрешить доступ для фронтенда
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы
    allow_headers=["*"],  # Разрешить все заголовки
)