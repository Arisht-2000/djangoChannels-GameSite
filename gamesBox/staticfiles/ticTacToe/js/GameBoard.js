import React, { useEffect, useState, useMemo } from 'react';

const GameBoard = () => {
    const game = window.gameData;

    const [gameState, setGameState] = useState(game.board_state);
    const [playerCharacter, setPlayerCharacter] = useState(game.current_player);

    const ws = useMemo(() => new WebSocket(`ws://${window.location.host}/ws/game/${game.id}/`), [game.id]);

    useEffect(() => {
        ws.onmessage = event => {
            console.log("recived in ws");
            const data = JSON.parse(event.data);
            console.log("parsed");
            console.log("setting states");
            setGameState(data.game_state);
            setPlayerCharacter(data.player_character);
            console.log("states set");
        };

        return () => {
            ws.close();
        };
    }, [ws]);

    const handleCellClick = (index) => {
        if (gameState[index] === " " && playerCharacter !== null) {
            const newGameState = [...gameState];
            newGameState[index] = playerCharacter;
            console.log("making");
            const data_dump = {
                index: index,
                game_state: newGameState,
                playerCharacter: playerCharacter,
            }
            console.log("made data = ");
            console.log(data_dump);
            ws.send(JSON.stringify({
                data: data_dump,
            }));
        }
    };

    const renderCells = () => {
        const rows = [];
        for (let row = 0; row < 3; row++) {
            const cells = [];
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                cells.push(
                    <td
                        key={col}
                        className="cell border rounded text-center"
                        onClick={() => handleCellClick(index)}
                        style={{ minWidth: '100px', minHeight: '100px', cursor: 'pointer' }}
                    >
                        {gameState[index]}
                    </td>
                );
            }
            rows.push(<tr key={row}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-8">
                    <table className="table table-bordered table-responsive">
                        <tbody>
                            {renderCells()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
