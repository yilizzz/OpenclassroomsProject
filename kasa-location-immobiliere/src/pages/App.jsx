import Home from "./Home"
import About from "./About"
import DetailsPage from "./DetailsPage";
import NotFound from "./NotFound"
import { Routes, Route} from "react-router-dom"

function App() {
  return (
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/details/:id" element={<DetailsPage />}></Route>
        </Routes>
  );
}
export default App;
