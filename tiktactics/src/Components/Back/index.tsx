import styles from './index.module.css'

type BackProps = {
    setRoomName: (arg0: string) => void
    killConnection: () => void
}

export default function Back({ setRoomName, killConnection }: BackProps) {

    function handleClick() {
        setRoomName("")
        killConnection();
    }


    return <div onClick={handleClick} className={styles.container}><svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM215 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L392 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-214.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L103 273c-9.4-9.4-9.4-24.6 0-33.9L215 127z" /></svg></div>

}
