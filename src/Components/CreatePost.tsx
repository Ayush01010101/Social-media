import type { FormEvent, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { fetchCommunities } from "./Communities";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";

interface PostType {
  title: string;
  content: string;
  imageURL?: string | null;
  avatar_url: string | null;
  author_name: string;
  community_id: string | null;

}

const Createpost = (): ReactNode => {
  const { User } = useAuth()
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [community, setCommunity] = useState<string>('')
  const { error: CommunityError, data: CommunityData } = useQuery({ queryFn: fetchCommunities, queryKey: ['communities'], refetchOnMount: false, refetchOnWindowFocus: false })

  const {
    mutate,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (post: PostType) => {
      const { data, error } = await SupabaseClient.from("Posts").insert(post);
      if (error) throw error;
      return data;
    },
  });

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!User) return
    let imageURL: string | null = null;

    if (selectedFile) {
      const filepath = `${selectedFile.name}-${Date.now()}`;
      const { data, error } = await SupabaseClient.storage
        .from("images")
        .upload(filepath, selectedFile);

      if (error) {
        // Optionally handle upload error
        return;
      }

      if (data) {
        const { data: imagepublicURL } = await SupabaseClient.storage
          .from("images")
          .getPublicUrl(data.path);
        imageURL = imagepublicURL?.publicUrl ?? null;
      }
    }

    mutate({
      title,
      content,
      ...(imageURL ? { imageURL } : {}),
      avatar_url: User.user_metadata.avatar_url,
      author_name: User.email ? User.email.split("@")[0] : '',
      community_id: community ? community : null
    });
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="bg-[#232946] shadow-2xl p-8 border-white rounded-2xl mx-4 sm:mx-0">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#E5E5E5]">
          Create a New Post
        </h2>
        <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
          <div>
            <label
              className="block text-[#B8C1EC] font-semibold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              className="w-full px-4 py-2 rounded-lg bg-[#121629] text-[#E5E5E5] border border-[#393053] focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              placeholder="Enter Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div>
            <label
              className="block text-[#B8C1EC] font-semibold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              placeholder="Enter your content"
              className="w-full px-4 py-3 rounded-lg bg-[#121629] text-[#E5E5E5] border border-[#393053] focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none min-h-[120px]"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
          </div>
          <select onChange={(e) => setCommunity(e.target.value)} className="text-gray-200 border-[1px] border-pink-500 outline-none rounded-md  p-3">

            <option className="rounded-md text-black" value={''} selected>general</option>
            {CommunityData && CommunityData.map((community) => {
              return (<option className="text-black" value={community.id} key={community.id}>{community.name}</option>)
            })}

          </select>
          <div>
            <label
              className="block text-[#B8C1EC] font-semibold mb-2"
              htmlFor="image"
            >
              Image (optional)
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="block w-full text-[#B8C1EC] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#393053] file:text-[#E5E5E5] hover:file:bg-purple-700 transition"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />


            {selectedFile && (
              <div className="mt-2 text-sm text-[#E5E5E5]">
                Selected:{" "}
                <span className="font-medium">{selectedFile.name}</span>
              </div>
            )}
          </div>
          {isError && (
            <div className="text-red-700 font-light text-sm ">
              {error instanceof Error ? error.message : String(error)}
            </div>
          )}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </div >
  );
};

export default Createpost;

