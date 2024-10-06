# **Tik-Tactics**

### A multiplayer Tic-Tac-Toe game for everyone who enjoys the classic game, with real-time interaction.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [License](#license)

## Project Overview

**Tik-Tactics** is a multiplayer version of the classic Tic-Tac-Toe game. Players can create or join rooms to challenge their friends in real-time. The project uses WebSockets for fast, two-way communication to ensure smooth and interactive gameplay.

### Target Audience
Tik-Tactics is designed for anyone who enjoys playing Tic-Tac-Toe and is looking for a competitive multiplayer experience.

## Features
- **Multiplayer Mode**: Play Tic-Tac-Toe against your friends by creating or joining game rooms.
- **Real-Time Gameplay**: Built with WebSockets using SignalR for seamless, real-time communication between players.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/IanSpeelman/TikTactics
cd tiktactics
```

### 2. Backend (.NET API with SignalR)
1. Navigate to the backend folder:
   ```bash
   cd TikTactics
   ```
2. Install dependencies and run the .NET application:
   ```bash
   dotnet restore
   dotnet run
   ```

### 3. Frontend (React with SignalR Client)
1. Navigate to the frontend folder:
   ```bash
   cd tiktactics
   ```
2. Install dependencies and run the React app (created with Vite):
   ```bash
   npm i
   npm run dev
   ```

### 4. Running the Application

With both backend and frontend running, you can now test the application locally.

- The backend will be running at the specified port: `http://localhost:5224`.
- The frontend should be accessible in your browser at: `http://localhost:5173`.

## Usage

Once the project is installed and running:

1. Open the browser at the React frontend URL (e.g., `http://localhost:5173`).
2. Create a new room or join an existing one to start a multiplayer Tic-Tac-Toe game.
3. Challenge your friend and enjoy real-time gameplay!

## Live Demo

A live demo will be available soon!
