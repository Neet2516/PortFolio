import Loader from "./components/Loader";
import Hero from "./sections/Hero";
import { useLenis } from "./hooks/useLenis";
import { AppProvider } from "./context/Appcontext";
import { useApp } from "./context/useApp";


function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

function Main() {
  const { isLoaded, setIsLoaded } = useApp();

  useLenis(isLoaded);

  return (
    <>
      {!isLoaded && (
        <Loader onComplete={() => setIsLoaded(true)} />
      )}

      <main className={isLoaded ? "visible" : "invisible"}>
        <Hero />
      </main>
    </>
  );
}

export default App;
