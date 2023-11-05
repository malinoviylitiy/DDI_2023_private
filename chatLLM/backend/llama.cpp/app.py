from typing import Union

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import subprocess
import os

app = FastAPI()

class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: int = 128
    temperature: float = 0.7
    top_p: float = 1.0

@app.get("/")
def read_root():
    return {"app.py is running"}

@app.post("/generate")
async def generate_answer(request: GenerateRequest):
    try:
        # Определяем относительный путь к llama.cpp
        current_directory = os.path.dirname(os.path.realpath(__file__))
        llama_cpp_path = os.path.join(current_directory, "llama.cpp")
        
        # Формируем команду для вызова llama.cpp
        command = [
            "./main", 
            "-m", "models/mistral-7b-v0.1.Q8_0.gguf", 
            "-p", request.prompt
        ]

        # Выполнение команды
        result = subprocess.run(command, cwd="/home/evgen0805/GitHubReps/DDI_2023_private/chatLLM/backend/llama.cpp", capture_output=True, text=True)

        if result.returncode != 0:
            raise Exception("Error in llama.cpp")

        # Преобразование вывода в строку (предполагается, что llama.cpp возвращает строку)
        output = result.stdout.strip()

        return {"text": output}
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