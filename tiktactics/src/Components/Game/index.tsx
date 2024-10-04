
type GameProps = {
    roomName: string
}

export default function Game({ roomName }: GameProps) {
    return <h1>playing game in room:{roomName}</h1>
}
