from django.db import models


# Create your models here.
class TicTacToeGame(models.Model):
    board_state = models.CharField(max_length=9)
    current_player = models.CharField(max_length=1, default="X")  # 'X' or 'O'
    winner = models.CharField(max_length=1, null=True, blank=True)  # 'X', 'O', or None
    is_draw = models.BooleanField(default=False)

    def make_move(self, row, col):
        if (
            self.board_state[row * 3 + col] == " "
            and not self.winner
            and not self.is_draw
        ):
            board_list = list(self.board_state)
            board_list[row * 3 + col] = self.current_player
            self.board_state = "".join(board_list)

            if self.check_winner(self.current_player, row, col):
                self.winner = self.current_player
            elif " " not in self.board_state:
                self.is_draw = True

            self.current_player = "O" if self.current_player == "X" else "X"
            self.save()

    def check_winner(self, player, row, col):
        # Check row, column, and diagonals for a win
        for i in range(3):
            if self.board_state[i * 3 + col] != player:
                break
        else:
            return True

        for j in range(3):
            if self.board_state[row * 3 + j] != player:
                break
        else:
            return True

        if row == col:
            for i in range(3):
                if self.board_state[i * 3 + i] != player:
                    break
            else:
                return True

        if row + col == 2:
            for i in range(3):
                if self.board_state[i * 3 + (2 - i)] != player:
                    break
            else:
                return True

        return False
