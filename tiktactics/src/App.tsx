import * as signalR from "@microsoft/signalr";
import Title from "./Components/Title";
import styles from './App.module.css'
import RoomSelector from "./Components/RoomSelector";
import { useEffect, useRef, useState } from "react";
import Game from "./Components/Game";
import Back from "./Components/Back";


function App() {
    const [roomName, setRoomName] = useState<string | null>(null)
    const connection = useRef<signalR.HubConnection | null>(null)
    useEffect(() => {
        if (roomName) {
            connection.current = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:5224/TikTactics")
                .build()

            connection.current.start()
                .then(() => connection.current?.invoke("setGameSession", roomName))
                .catch(err => console.log(`oops something went wrong: ${err}`))


            connection.current?.on("joined", msg => console.log(msg))
            connection.current?.on("disconnect", msg => console.log(msg))
            connection.current?.on("roomFull", () => setRoomName(""))
        }
    }, [roomName])

    function killConnection() {
        connection.current?.stop()
    }




    return (
        <div className={styles.container}>
            <Title />
            {!roomName && <RoomSelector setRoomName={setRoomName} />}
            {roomName && <Game roomName={roomName} />}
            {roomName && < Back setRoomName={setRoomName} killConnection={killConnection} />}
        </div>
    )
}

export default App
