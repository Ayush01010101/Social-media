import type { ReactNode } from "react";
import Home from "../Components/Home";
import { useState } from "react";
import Createpost from "../Components/CreatePost";

const Hompage = (): ReactNode => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false)
  return (
    <>
      <div className="bg-[rgba(10,10,10,1)] min-h-screen pt-24">
        {isCreatePostOpen && <Createpost handleClick={() => setIsCreatePostOpen(!isCreatePostOpen)} />}
        <Home handleclick={() => setIsCreatePostOpen(!isCreatePostOpen)} />
      </div>
    </>
  )
}
export default Hompage
