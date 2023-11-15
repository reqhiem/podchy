import json
from channels.generic.websocket import AsyncWebsocketConsumer
from core.models import (
    FileCode,
)
from channels.db import database_sync_to_async


@database_sync_to_async
def save_file(fid, content):
    file = FileCode.objects.get(fid=fid)
    if file is None:
        return
    file.value = content
    file.save()


class CpodConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        cpod_name = self.scope["url_route"]["kwargs"]["cpod_name"]
        self.room_group_name = f"{cpod_name}"
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()

    async def disconnect(self, close_code):
        print("Closed websocket with code: ", close_code)
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )
        await self.close()

    async def receive(self, text_data):
        if text_data:
            content = json.loads(text_data)
        # Send message to room group
        if content["type"] == "UPDATE_FILE":
            await save_file(fid=content["fid"], content=content["content"])
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "state_update",
                "message": json.dumps(content),
            },
        )

    async def state_update(self, event):
        message = event["message"]
        # Send message to WebSocket
        await self.send(text_data=message)
