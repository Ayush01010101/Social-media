import { Route, Routes } from "react-router"
import Hompage from "./Pages/Hompage"
import Navbar from "./Components/Navbar"
import CreatepostPage from "./Pages/CreatePostPage"
function App() {
  return (
    <>
      <Navbar />
      <Routes>


        <Route path="/" element={<Hompage />} />
        <Route path="/createpost" element={<CreatepostPage />} />
      </Routes>

    </>
  )
}

export default App
