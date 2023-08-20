import React, { useEffect, useState, useMemo } from 'react';
import './GameBoard.css';

const GameBoard = ({ game }) => {
    const [gameState, setGameState] = useState(game.board_state);
    const [playerCharacter, setPlayerCharacter] = useState(null);

    // Memoize the WebSocket object
    const ws = useMemo(() => new WebSocket(`ws://${window.location.host}/ws/game/${game.id}/`), [game.id]);

    useEffect(() => {
        ws.onmessage = event => {
            const data = JSON.parse(event.data);
            setGameState(data.game_state);
            setPlayerCharacter(data.player_character);
        };

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
        <div className="game-board">
            {gameState.map((cell, index) => (
                <div key={index} className="cell" onClick={() => handleCellClick(index)}>
                    {cell}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
