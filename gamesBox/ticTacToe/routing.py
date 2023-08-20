from django.urls import path

from .consumers import AsyncGameBoardConsumer

websocket_urlpatterns = [
    # re_path(r"ws/game/(?P<game_id>\w+)/$", AsyncGameBoardConsumer.as_asgi()),
    path("ws/game/<int:game_id>/", AsyncGameBoardConsumer.as_asgi()),
]
