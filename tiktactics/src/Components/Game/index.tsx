import { useState } from "react"
import Position from "./components/Position"
import styles from './index.module.css'

type GameProps = {
    roomName: string
}

export default function Game({ roomName }: GameProps) {
    const player = "x"
    const turn = "x";
    const [board, setBoard] = useState<string[][]>([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ])

    function changeBoard(position: string) {
        const pos = position.split(":")
        const updatedBoard = [...board]
        if (!updatedBoard[+pos[0]][+pos[1]] && player == turn) {
            updatedBoard[+pos[0]][+pos[1]] = turn;
            setBoard(updatedBoard)
        }
    }


    return (
        <div>
            <div className={styles.top}>
                <p><i>playing in room:</i> <b>{roomName}</b></p>
                <p><i>you are:</i> <b>{player}</b></p>
                <p><b>{turn}</b> <i>is to play</i></p>
            </div>
            <div className={styles.boardcontainer}>
                <Position state={board[0][0]} setBoard={changeBoard} position="0:0" />
                <Position state={board[0][1]} setBoard={changeBoard} position="0:1" />
                <Position state={board[0][2]} setBoard={changeBoard} position="0:2" />
                <Position state={board[1][0]} setBoard={changeBoard} position="1:0" />
                <Position state={board[1][1]} setBoard={changeBoard} position="1:1" />
                <Position state={board[1][2]} setBoard={changeBoard} position="1:2" />
                <Position state={board[2][0]} setBoard={changeBoard} position="2:0" />
                <Position state={board[2][1]} setBoard={changeBoard} position="2:1" />
                <Position state={board[2][2]} setBoard={changeBoard} position="2:2" />
            </div>
        </div>
    )
}
