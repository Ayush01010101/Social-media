import type { ReactNode } from "react";
import { Laptop, Guitar, Volleyball } from "lucide-react";
import PostList from "./PostList";
const Home = (): ReactNode => {
  return (
    <>
      <h1 className="text-4xl">
      </h1>

      <div className="flex mx-auto flex-wrap gap-3 mt-5">
        <div className="w-full flex flex-col gap-6">

          <div className="flex flex-col w-md gap-3 text-[#E1E1E1] mx-auto  bg-[#121212] mx-ap-5 rounded-xluto rounded-xl  p-6 px-7">

            <h2 className="text-xl font-medium">Quick Action</h2>

            <button className="p-3 w-full rounded-xl bg-[#9333EA] font-bold transition-all duration-200 shadow-gray-500 hover:scale-101 hover:shadow-2xl  cursor-pointer">Create community</button>
            <button className="p-3 rounded-xl bg-[#1A1A1A]">Create Post</button>
          </div>

          <div className="flex flex-col w-md gap-3 text-[#E1E1E1] mx-auto  bg-[#121212] mx-ap-5 rounded-xluto rounded-xl  p-6 px-7">
            <h2 className="text-xl font-medium">Trending Community</h2>

            <span className="flex gap-3 mt-3"><Volleyball />Sports</span>
            <span className="flex gap-3"><Guitar />Music</span>
            <span className="flex gap-3 "><Laptop /> Gaming</span>
          </div>

        </div>
        <PostList />
      </div >
    </>
  )

}

export default Home
