import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PokemonView from "./components/pokemonview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:stringId" element={<PokemonView />} />
      </Routes>
    </Router>
  );
}

export default App;
