import React, { useEffect, useState, useMemo } from 'react';

const GameBoard = () => {
    const gameData = window.game;

    const [gameState, setGameState] = useState(gameData.board_state);
    const [playerCharacter, setPlayerCharacter] = useState(null);

    const ws = useMemo(() => new WebSocket(`ws://${window.location.host}/ws/game/${gameData.id}/`), [gameData.id]);

    useEffect(() => {
        // WebSocket event listener for incoming messages
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

    const handleCellClick = (index) => {
        if (gameState[index] === null && playerCharacter !== null) {
            const newGameState = gameState.slice();
            newGameState[index] = playerCharacter;
            setGameState(newGameState);

            ws.send(JSON.stringify({
                row: Math.floor(index / 3),
                col: index % 3,
            }));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="row">
                        {gameState.map((cell, index) => (
                            <div key={index} className="col-4">
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
