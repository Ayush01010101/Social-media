import { Route, Routes } from "react-router";
import Hompage from "./Pages/Hompage";
import PostDetailPage from "./Pages/PostDetailPage";
import Navbar from "./Components/Navbar";
import CreatepostPage from "./Pages/CreatePostPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hompage />} />

        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/createpost" element={<CreatepostPage />} />
      </Routes>
    </>
  );
}

export default App;
