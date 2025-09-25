import type { ReactNode, FC } from "react";
import CommunityPosts from "../Components/CommunityPosts";
const CommunityPostsPage: FC = (): ReactNode => {
  return (
    <div className="min-h-screen pt-24 bg-[rgba(10,10,10,1)] ">
      <CommunityPosts />
    </div >
  )
}

export default CommunityPostsPage
