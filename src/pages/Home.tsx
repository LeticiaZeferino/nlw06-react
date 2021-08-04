import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  //hooks precisa estar dentro do componente
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreacteRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already ended.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Illustração sombolizando perguntas e respostas"
        ></img>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask"></img>
          <button onClick={handleCreacteRoom} className="create-room">
            <img src={googleIconImage} alt="Logo do Google"></img> Crie sua sala
            com o Google
          </button>
          <div className="separator"> ou entre na sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
