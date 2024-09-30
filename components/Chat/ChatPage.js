import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Chat from "./Chat"; 

const ChatPage = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return user ? (
    <div>
      <h2>Witaj, {user.email}</h2>
      <Chat />
      <button onClick={() => auth.signOut()}>Wyloguj</button>
    </div>
  ) : (
    <div>Proszę się zalogować, aby uzyskać dostęp do czatu</div>
  );
};

export default ChatPage;
