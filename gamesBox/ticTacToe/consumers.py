import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import TicTacToeGame


class AsyncGameBoardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope["url_route"]["kwargs"]["game_id"]
        self.game_group_name = f"game_{self.game_id}"

        await self.channel_layer.group_add(self.game_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.game_group_name, self.channel_name)

    async def receive(self, text_data):
        @database_sync_to_async
        def get_game(game_id, index):
            game = TicTacToeGame.objects.get(pk=game_id)
            game.make_move(index)
            return game

        data = json.loads(text_data)["data"]
        index = data["index"]  # Get the index of the move
        game_state = data["game_state"]
        playerCharacter = data["playerCharacter"]
        game = await get_game(self.game_id, index)

        if game.board_state == "":
            game.board_state = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
        else:
            game.board_state = list(game.board_state)
        if game.board_state == game_state:
            await self.channel_layer.group_send(
                self.game_group_name,
                {
                    "type": "game_update",
                    "game_state": game.board_state,
                    "index": index,
                    "playerCharacter": playerCharacter,
                },
            )

    async def game_update(self, event):
        game_state = event["game_state"]
        index = event["index"]
        playerCharacter = event["playerCharacter"]

        # Send game state to WebSocket
        await self.send(
            text_data=json.dumps(
                {
                    "data": {
                        "index": index,
                        "game_state": game_state,
                        "playerCharacter": playerCharacter,
                    }
                }
            )
        )
