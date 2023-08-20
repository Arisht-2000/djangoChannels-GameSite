from django.shortcuts import get_object_or_404

from django.views.generic.detail import DetailView

from .models import TicTacToeGame


# Create your views here.
class GameBoardView(DetailView):
    model = TicTacToeGame
    template_name = "ticTacToe/html/game_board.html"
    context_object_name = "game"

    def get_object(self, queryset=None):
        game_id = self.kwargs.get("game_id")

        # Try to get an existing game or create a new one if not found
        game, created = TicTacToeGame.objects.get_or_create(id=game_id)
        if game.board_state == "":
            game.board_state = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
        else:
            list(game.board_state)
        return game
