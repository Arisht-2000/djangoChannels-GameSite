from django.urls import path, re_path

from .consumers import AsyncGameBoardConsumer

websocket_urlpatterns = [
    re_path(r"ws/game/(?P<game_id>\d+)/$", AsyncGameBoardConsumer.as_asgi()),
    # path("ws/game/<int:game_id>/", AsyncGameBoardConsumer.as_asgi()),
]
