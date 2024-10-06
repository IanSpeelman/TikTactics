import { useState, useEffect, SetStateAction } from "react"
import Position from "./components/Position"
import styles from './index.module.css'
import { SocketResponseObject } from "../../utils/types"
import InfoModal from "../InfoModal"

type GameProps = {
    roomName: string
    response: SocketResponseObject | null
    players: number
    playerInfo: SocketResponseObject | null
    makeMove: (arg0: string) => void
    reset?: () => void | null
    started: boolean
    setStarted: React.Dispatch<SetStateAction<boolean>>
}

export default function Game({ started, setStarted, roomName, response, players, playerInfo, makeMove, reset }: GameProps) {

    const [message, setMessage] = useState("")
    const [winner, setWinner] = useState("")
    const player = playerInfo?.player
    const turn = response?.turn;
    const [board, setBoard] = useState<string[][]>([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ])

    useEffect(() => {
        if (response?.board) {
            setBoard(response?.board)
        }

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

        if (response?.winner) {
            setWinner(response.winner)
            setMessage(`${response.winner} has won this round`)
            if (response.winner == "done") {
                setMessage("Its a tie!")
            }
        }
    }, [players, started, response, setStarted])


    return (
        <div>
            {message && winner && <InfoModal message={message} clearMessage={setWinner} button="play again" buttonAction={reset} />}
            {message && winner == "" && <InfoModal message={message} clearMessage={null} />}
            <div className={styles.top}>
                <p><i>playing in room:</i> <b>{roomName}</b></p>
                <p><i>you are:</i> <b>{player}</b></p>
                <p><b>{turn}</b> <i>is to play</i></p>
            </div>
            <div className={styles.boardcontainer}>
                <Position state={board[0][0]} position="0:0" makeMove={makeMove} />
                <Position state={board[0][1]} position="0:1" makeMove={makeMove} />
                <Position state={board[0][2]} position="0:2" makeMove={makeMove} />
                <Position state={board[1][0]} position="1:0" makeMove={makeMove} />
                <Position state={board[1][1]} position="1:1" makeMove={makeMove} />
                <Position state={board[1][2]} position="1:2" makeMove={makeMove} />
                <Position state={board[2][0]} position="2:0" makeMove={makeMove} />
                <Position state={board[2][1]} position="2:1" makeMove={makeMove} />
                <Position state={board[2][2]} position="2:2" makeMove={makeMove} />
            </div>
        </div>
    )
}
