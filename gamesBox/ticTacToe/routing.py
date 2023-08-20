from django.urls import path

from consumers import AsyncGameBoardConsumer

websocket_urlpatterns = [
    path("/", AsyncGameBoardConsumer.as_asgi()),
]
