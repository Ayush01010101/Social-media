import type { ReactNode, FC } from "react";
import Communities from "../Components/Communities";

const CommunitiesPage: FC = (): ReactNode => {
  return (
    <div className="min-h-screen pt-24 bg-[rgba(10,10,10,1)] ">

      <Communities />
    </div>
  )
}

export default CommunitiesPage
