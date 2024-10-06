import * as signalR from "@microsoft/signalr";
import Title from "./Components/Title";
import styles from './App.module.css'
import RoomSelector from "./Components/RoomSelector";
import { useEffect, useRef, useState } from "react";
import Game from "./Components/Game";
import Back from "./Components/Back";
import { SocketResponseObject } from "./utils/types";
import InfoModal from "./Components/InfoModal";

function App() {
    const [roomName, setRoomName] = useState<string | null>(null)
    const connection = useRef<signalR.HubConnection | null>(null)
    const [response, setResponse] = useState<SocketResponseObject | null>(null)
    const [playerInfo, setPlayerInfo] = useState<SocketResponseObject | null>(null)
    const [message, setMessage] = useState<string>("")
    const [players, setPlayers] = useState<number>(0)
    const [started, setStarted] = useState<boolean>(false)


    useEffect(() => {
        if (roomName) {
            connection.current = new signalR.HubConnectionBuilder()
                .withUrl("http://192.168.8.150:5224/TikTactics")
                .build()

            connection.current.start()
                .then(() => connection.current?.invoke("setGameSession", roomName))
                .catch(err => console.log(`oops something went wrong: ${err}`))

            connection.current?.on("joined", response => setPlayerInfo(response))
            connection.current?.on("playerJoined", response => {
                setPlayers(response.players)
                setResponse(response)
            })

            connection.current?.on("turnResponse", response => setResponse(response))
            connection.current?.on("disconnect", response => { setPlayers(response.players) })
            connection.current?.on("roomFull", (response) => {
                setRoomName("")
                setResponse(response)
                setMessage(response?.message)
            })
        }
    }, [roomName])

    function killConnection() {
        connection.current?.stop()
    }

    function makeMove(move: string) {
        if (roomName) {
            connection.current?.invoke("makeMove", roomName, move);
        }
    }

    function resetGame() {
        if (roomName) {
            connection.current?.invoke("reset", roomName);
        }
    }

    console.log(started)
    return (
        <div className={styles.container}>
            <Title />
            {message && <InfoModal message={message} clearMessage={setMessage} />}
            {!roomName && <RoomSelector setRoomName={setRoomName} />}
            {roomName && <Game started={started} setStarted={setStarted} roomName={roomName} response={response} players={players} playerInfo={playerInfo} makeMove={makeMove} reset={resetGame} />}
            {roomName && < Back setRoomName={setRoomName} killConnection={killConnection} setPlayers={setPlayers} setStarted={setStarted} />}
        </div>
    )
}
export default App
