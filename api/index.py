from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
import httpx
import os

app = FastAPI()

async def stream_agent_api(request_body: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:7777/v1/playground/agent/run",
            json=request_body,
            headers={"Authorization": f"Bearer {os.environ.get('API_KEY')}"}
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Agent API error")
        async for chunk in response.aiter_text():
            yield f"data: {chunk}\n"

@app.post("/api/chat")
async def handle_chat_data(request_body: dict):
    # Stream the response from the external endpoint directly to the client
    return StreamingResponse(stream_agent_api(request_body), media_type="text/event-stream")
