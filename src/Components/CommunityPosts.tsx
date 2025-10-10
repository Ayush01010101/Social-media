import type { FC, ReactNode } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import type { CommunitiesType } from "./Communities";
import CommunityPostsList from "./CommunityPostsList";
import SupabaseClient from "../Instances/SupabaseClient";

// A dedicated skeleton component for the header
const CommunityHeaderSkeleton: FC = (): ReactNode => (
  <div className="animate-pulse px-4">
    <div className="h-8 w-2/5 rounded-md bg-neutral-700 mb-4"></div>
    <div className="h-4 w-4/5 rounded-md bg-neutral-700"></div>
  </div>
);

const CommunityPosts: FC = (): ReactNode => {
  const { communityid } = useParams();

  async function fetchCommunityDetails(): Promise<CommunitiesType> {
    if (!communityid) {
      throw new Error("No community ID provided.");
    }
    const { data, error } = await SupabaseClient.from("Communities")
      .select('*')
      .eq('id', communityid)
      .single();

    if (error) throw new Error('Failed to fetch community data');
    return data as CommunitiesType;
  }

  // BUG FIX: The queryKey must include the dynamic `communityid`
  const {
    data: communityData,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['communityDetails', communityid],
    queryFn: fetchCommunityDetails
  });

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CommunityHeaderSkeleton />
        {/* You could also show the PostSkeleton here for a better UX */}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-400">
        <h2 className="text-xl font-semibold">Could not load community</h2>
        <p className="text-neutral-400">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Community Header Section */}
      <header className="mb-10 pb-6 border-b border-neutral-800">
        <h1 className="text-3xl font-bold text-purple-500 mb-2">
          {communityData?.name}
        </h1>
        <p className="text-lg text-gray-300">
          {communityData?.description}
        </p>
      </header>

      {/* Posts Section */}
      <main>
        <CommunityPostsList />
      </main>
    </div>
  );
};

export default CommunityPosts;
