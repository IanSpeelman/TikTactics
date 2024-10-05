import { useState, useEffect } from "react"
import Position from "./components/Position"
import styles from './index.module.css'
import { SocketResponseObject } from "../../utils/types"
import InfoModal from "../InfoModal"

type GameProps = {
    roomName: string
    response: SocketResponseObject | null
    players: number
}

export default function Game({ roomName, response, players }: GameProps) {

    const [message, setMessage] = useState("")
    const [started, setStarted] = useState(false)
    const player = response?.player
    const turn = response?.turn;
    const [board, setBoard] = useState<string[][]>([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ])

    function changeBoard(position: string) {
        const pos = position.split(":")
        const updatedBoard = [...board]
        if (!updatedBoard[+pos[0]][+pos[1]] && player == turn) {
            updatedBoard[+pos[0]][+pos[1]] = turn!;
            setBoard(updatedBoard)
        }
    }

    useEffect(() => {
        console.log(players)
        if (players < 2) {
            if (started) {
                setMessage("Opponent left!")
            }
            else {
                setMessage("Waiting for opponent!")
            }
        }
        else {
            setMessage("");
            setStarted(true)
        }
    }, [players, started])


    return (
        <div>
            {message && <InfoModal message={message} clearMessage={null} />}
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
