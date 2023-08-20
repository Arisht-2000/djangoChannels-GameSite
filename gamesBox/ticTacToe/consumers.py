import json

from channels.generic.websocket import AsyncWebsocketConsumer

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
        data = json.loads(text_data)
        row = data["row"]
        col = data["col"]
        game = TicTacToeGame.objects.get(pk=self.game_id)

        game.make_move(row, col)  # Call the make_move method on the game instance

        await self.channel_layer.group_send(
            self.game_group_name,
            {
                "type": "game_update",
                "game_state": game.board_state,
            },
        )

    async def game_update(self, event):
        game_state = event["game_state"]

        # Send game state to WebSocket
        await self.send(
            text_data=json.dumps(
                {
                    "game_state": game_state,
                }
            )
        )
