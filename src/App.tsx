import { Route, Routes } from "react-router";
import Hompage from "./Pages/Hompage";
import PostDetailPage from "./Pages/PostDetailPage";
import Navbar from "./Components/Navbar";
import CreatepostPage from "./Pages/CreatePostPage";
import CreateCommunityPage from "./Pages/CreateCommunityPage";
import CommunityPostsPage from "./Pages/CommunityPostsPage";
import CommunitiesPage from "./Pages/CommunitiesPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/createpost" element={<CreatepostPage />} />
        <Route path="/createcommunity" element={<CreateCommunityPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/community/:communityid" element={<CommunityPostsPage />} />
      </Routes>
    </>
  );
}

export default App;
