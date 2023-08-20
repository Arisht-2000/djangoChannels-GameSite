from django.urls import path

from consumers import AsyncGameBoardConsumer

websocket_urlpatterns = [
    path("ws/game/<int:game_id>/", AsyncGameBoardConsumer.as_asgi()),
]
