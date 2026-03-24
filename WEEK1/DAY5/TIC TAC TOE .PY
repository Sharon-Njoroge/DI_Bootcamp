def display_board(board):
    """Step 2: Visually represent the 3x3 grid."""
    print("\n")
    for i, row in enumerate(board):
        print(" " + " | ".join(row))
        if i < 2:
            print("-----------")
    print("\n")

def player_input(player, board):
    """Step 3: Get and validate player moves."""
    while True:
        try:
            move = input(f"Player {player}, enter row and column (0-2) separated by space: ")
            row, col = map(int, move.split())
            
            if 0 <= row <= 2 and 0 <= col <= 2:
                if board[row][col] == ' ':
                    return row, col
                else:
                    print("That square is already taken!")
            else:
                print("Invalid range! Please enter numbers between 0 and 2.")
        except ValueError:
            print("Invalid input! Please enter two numbers separated by a space.")

def check_win(board, player):
    """Step 4: Check rows, columns, and diagonals for a win."""
    # Check Rows
    for row in board:
        if all(s == player for s in row):
            return True
    
    # Check Columns
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True
            
    # Check Diagonals
    if all(board[i][i] == player for i in range(3)) or \
       all(board[i][2-i] == player for i in range(3)):
        return True
        
    return False

def check_tie(board):
    """Step 5: Check if the board is full with no winner."""
    for row in board:
        if ' ' in row:
            return False
    return True

def play():
    """Step 6: Main Game Loop."""
    # Step 1: Initialize 2D List
    board = [[' ' for _ in range(3)] for _ in range(3)]
    current_player = 'X'
    game_over = False

    print("Welcome to Tic Tac Toe!")

    while not game_over:
        display_board(board)
        
        row, col = player_input(current_player, board)
        board[row][col] = current_player
        
        if check_win(board, current_player):
            display_board(board)
            print(f"Congratulations! Player {current_player} wins!")
            game_over = True
        elif check_tie(board):
            display_board(board)
            print("It's a tie!")
            game_over = True
        else:
            # Switch players
            current_player = 'O' if current_player == 'X' else 'X'

if __name__ == "__main__":
    play()