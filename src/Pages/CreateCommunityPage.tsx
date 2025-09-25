import type { ReactNode, FC } from "react";
import { useParams } from "react-router";
import CreateCommunity from "../Components/CreateCommunity";

const CreateCommunityPage: FC = (): ReactNode => {
  return (
    <div className="min-h-screen pt-24 bg-[rgba(10,10,10,1)] ">

      <CreateCommunity />
    </div>
  )
}

export default CreateCommunityPage
