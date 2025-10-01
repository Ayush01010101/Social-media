import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";
import { Funnel, Search } from "lucide-react";


export interface CommunitiesType {
  id: number;
  created_at: string;
  name: string;
  description: string;
}

export const fetchCommunities = async (): Promise<CommunitiesType[]> => {
  const { data, error } = await SupabaseClient.from("Communities").select('*').order('created_at', { ascending: false }).limit(10);
  if (error) throw new Error('failed to fetch Communities');

  return data as CommunitiesType[]
};


const Communities = (): ReactNode => {
  const navigate = useNavigate();
  const { data, isPending } = useQuery({ queryFn: fetchCommunities, queryKey: ['communities'] });

  const categories = ["All", "Technology", "Gaming", "Art & Design", "Music", "Sports", "Education"];

  return (
    <div className="bg-[rgba(10,10,10,1)]  text-gray-200 min-h-screen p-8 font-sans">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Discover Communities</h1>
          <p className="text-gray-400 mt-2">Find and join communities that match your interests</p>
        </header>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search />
            </span>
            <input
              type="text"
              placeholder="Search by name or topic..."
              className="w-full bg-[#121212] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center justify-center bg-[#121212] border border-gray-700 rounded-md px-4 py-2 hover:bg-gray-700 transition-colors">
            <Funnel />
            Filter
          </button>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat, index) => (
            <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${index === 0 ? 'bg-purple-600 text-white' : 'bg-[#1E1E1E] hover:bg-gray-700'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Communities Grid */}
        {isPending ? (
          <p>Loading communities...</p>
        ) : (
          <div className="grid h-[50vh] overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((community) => {
              return (
                <div key={community.id} className="bg-[#121212] rounded-xl p-6 flex flex-col gap-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer" onCtypescript-language-serverlick={() => navigate(`/community/${community.id}`)}>

                  {/* Card Header */}
                  <div className="flex items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">{community.name}</h2>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                    {community.description}
                  </p>

                  <button className="w-full bg-[#1E1E1E]  hover:bg-gray-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
                    Create Post
                  </button>
                </div>
              );
            })}
          </div>
        )}


      </div>
    </div >
  );
};

export default Communities;
