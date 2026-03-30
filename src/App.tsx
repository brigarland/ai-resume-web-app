import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, MatchFinder, MatchFinderAnthropicResults } from "@/components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matchfinder" element={<MatchFinder />} />
        <Route
          path="/matchfinder/anthropic"
          element={<MatchFinderAnthropicResults />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
