from django.urls import include, path

websocket_urlpatterns = [
    path("ttt/", include("ticTacToe.routing")),
    path("chat/", include("chat.routing")),
]
