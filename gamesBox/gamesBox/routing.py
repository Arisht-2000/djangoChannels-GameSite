from django.urls import path

from channels.routing import URLRouter

from ticTacToe import routing as ticTacToe_routing
from chat import routing as chat_routing

websocket_urlpatterns = []
websocket_urlpatterns.extend(ticTacToe_routing.websocket_urlpatterns)
websocket_urlpatterns.extend(chat_routing.websocket_urlpatterns)
