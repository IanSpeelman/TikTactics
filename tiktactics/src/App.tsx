import Title from "./Components/Title";
import styles from './App.module.css'
import RoomSelector from "./Components/RoomSelector";
import { useState } from "react";
import Game from "./Components/Game";


function App() {
    const [roomName, setRoomName] = useState<string | null>(null)
    return (
        <div className={styles.container}>
            <Title />
            {!roomName && <RoomSelector setRoomName={setRoomName} />}
            {roomName && <Game roomName={roomName} />}
        </div>
    )
}

export default App
