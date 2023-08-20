import React, { useEffect, useState, useMemo } from 'react';

const GameBoard = () => {
    const game = window.gameData; // Get the gameJata JSON from the global scope

    // State to hold the game state (Tic-Tac-Toe board)
    const [gameState, setGameState] = useState(game.board_state);

    // State to hold the player's character ('X' or 'O')
    const [playerCharacter, setPlayerCharacter] = useState(game.current_player);

    // Memoize the WebSocket object using game.id as dependency
    const ws = useMemo(() => new WebSocket(`ws://${window.location.host}/ws/game/${game.id}/`), [game.id]);

    // Effect to set up WebSocket event listeners and handle cleanup
    useEffect(() => {
        // Event listener for WebSocket messages
        ws.onmessage = event => {
            const data = JSON.parse(event.data);
            setGameState(data.game_state);
            setPlayerCharacter(data.player_character);
        };

        // Cleanup function: close WebSocket on component unmount
        return () => {
            ws.close();
        };
    }, [ws]);

    // Function to handle cell clicks on the game board
    const handleCellClick = (index) => {
        // Check if the clicked cell is empty and the player's character is set
        if (gameState[index] === null && playerCharacter !== null) {
            // Create a new game state array and update the clicked cell
            const newGameState = gameState.slice();
            newGameState[index] = playerCharacter;

            // Send the move to the server via WebSocket
            ws.send(JSON.stringify({
                data: {
                    game_state: newGameState,
                    playerCharacter: playerCharacter,
                },
            }));
        }
    };

    // Render the Tic-Tac-Toe game board using the game state
    return (
        <div className="container mt-5"> {/* Bootstrap container for spacing */}
            <div className="row justify-content-center">
                <div className="col-8"> {/* Main content column */}
                    <div className="row">
                        {gameState.map((cell, index) => (
                            <div key={index} className="col-4"> {/* Each cell occupies 1/3 of the available space */}
                                <div
                                    className="cell border rounded d-flex align-items-center justify-content-center"
                                    onClick={() => handleCellClick(index)}
                                >
                                    {cell}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
