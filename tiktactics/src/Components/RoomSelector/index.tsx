import { useState } from 'react'
import styles from './index.module.css'

type RoomSelectorProps = {
    setRoomName: (arg0: string) => void;
}


export default function RoomSelector({ setRoomName }: RoomSelectorProps) {

    const [room, setRoom] = useState("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setRoomName(room)
    }


    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.inputgroup}>
                <label htmlFor="room">Room Name:</label>
                <input className={styles.input} value={room} onChange={(e) => setRoom(e.target.value)} id='room' type='text' placeholder='Enter Room Name:' />
            </div>
            <button className={styles.button}>Join</button>
        </form>
    )
}
