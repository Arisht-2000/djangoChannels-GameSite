from django.shortcuts import get_object_or_404

from django.views.generic.detail import DetailView

from .models import TicTacToeGame


# Create your views here.
class GameBoardView(DetailView):
    model = TicTacToeGame
    template_name = "tictactoe_app/game_board.html"
    context_object_name = "game"

    def get_object(self, queryset=None):
        game_id = self.kwargs.get("game_id")

        # Try to get an existing game or create a new one if not found
        game, created = TicTacToeGame.objects.get_or_create(id=game_id)
        return game
