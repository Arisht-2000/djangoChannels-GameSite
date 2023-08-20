from django.urls import path

from channels.routing import URLRouter

from ticTacToe import routing as ticTacToe_routing
from chat import routing as chat_routing

websocket_urlpatterns = [
    path("ttt/", URLRouter(ticTacToe_routing)),
    path("chat/", URLRouter(chat_routing)),
]
