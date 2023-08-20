from django.urls import path

from ticTacToe.views import GameBoardView

urlpatterns = [
    path("game/<int:game_id>/", GameBoardView.as_view(), name="game_board"),
]
