import { Route, Routes } from "react-router";
import Hompage from "./Pages/Hompage";
import UnderConstruction from "./Components/UnderConstruction";
import PostDetailPage from "./Pages/PostDetailPage";
import PageNotFound from "./Components/PageNotFound";
import Navbar from "./Components/Navbar";
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
        <Route path="/createcommunity" element={<CreateCommunityPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/community/:communityid" element={<CommunityPostsPage />} />
        <Route path="/notifications" element={<UnderConstruction />} />
        <Route path="/profile" element={<UnderConstruction />} />J
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
