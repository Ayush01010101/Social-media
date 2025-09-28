import type { ReactNode } from "react";
import { Laptop, Guitar, Volleyball } from "lucide-react";
import PostList from "./PostList";
const Home = (): ReactNode => {
  return (
    <>
      <h1 className="text-4xl">
      </h1>

      <div className="flex max-w-7xl mt-3 mx-auto gap-3 ">
        <div className=" md:flex hidden flex-col gap-6">

          <div className="flex flex-col w-md gap-3 text-[#E1E1E1]   bg-[#121212] mx-ap-5 rounded-xluto rounded-xl  p-6 px-7">

            <h2 className="text-xl font-medium">Quick Action</h2>

            <button className="p-3 w-full rounded-xl bg-[#9333EA] font-bold transition-all duration-200 shadow-gray-800 hover:scale-101 hover:shadow-2xl  cursor-pointer">Create community</button>
            <button className="p-3 rounded-xl bg-[#1A1A1A]">Create Post</button>
          </div>

          <div className="flex flex-col w-md gap-3 text-[#E1E1E1]   bg-[#121212] mx-ap-5 rounded-xluto rounded-xl  p-6 px-7">
            <h2 className="text-xl font-medium">Trending Community</h2>

            <span className="flex gap-3 mt-3"><Volleyball />Sports</span>
            <span className="flex gap-3"><Guitar />Music</span>
            <span className="flex gap-3 "><Laptop /> Gaming</span>
          </div>

        </div>

        <div className="overflow-auto no-scrollbar max-h-[90vh]">
          <PostList />

        </div>


      </div >
    </>
  )

}

export default Home
