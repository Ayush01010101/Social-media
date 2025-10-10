import type { Dispatch, FC, FormEvent, ReactNode } from "react";
import type { DragEvent } from "react";
import { ArrowUp01Icon, CircleX, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { fetchCommunities } from "./Communities";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import SupabaseClient from "../Instances/SupabaseClient";

interface PostType {
  title: string;
  content: string;
  imageURL?: string | null;
  avatar_url: string | null;
  author_name: string;
  community_id: string | null;

}

const Createpost: FC<{ handleClick: () => void }> = ({ handleClick }): ReactNode => {
  const { User } = useAuth()
  const [selectedFile, setSelectedFile] = useState<null | File>(null)
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryclient = useQueryClient()
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [community, setCommunity] = useState<string>('')


  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);


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
    onSuccess() {
      queryclient.invalidateQueries({ queryKey: ['postlist'] })
    }
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
        handleClick()

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

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (files[0].type.startsWith("image/")) {
        setSelectedFile(files[0]);

        console.log(selectedFile)
      }
    }
  };





  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (files[0].type.startsWith("image/")) {
        setSelectedFile(files[0]);
      } else {
      }
    }
  };

  return (
    <div className="fixed h-screen w-screen backdrop-blur-sm ">
      <div className="mt-2.5 relative h-2/3 no-scrollbar overflow-auto translate-y-17 sm:w-1/2 mx-auto  p-6 bg-[#121212] rounded-2xl text-gray-200">

        <div className="absolute right-10 " onClick={() => handleClick()}> <CircleX /></div>



        <form className="flex  flex-col gap-5" onSubmit={HandleSubmit}>
          <div>
            <label className="text-lg font-medium mb-2 block">Create Post</label>
            <input
              className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              type='text'
            />
          </div>

          <div>
            <label className="text-lg font-medium mb-2 block">Description</label>
            <textarea
              rows={4}
              className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is this post about?"
            />
          </div>

          <div >
            <label className="text-lg font-medium mb-2 block">Post Image (Optional)</label>
            <div
              className={`flex justify-center items-center w-full p-6 border-2 ${isDragging ? 'border-purple-500' : 'border-gray-600'} border-dashed rounded-xl cursor-pointer transition-colors`}

              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDrag={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}

            >
              <input
                type="file"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
              />
              {preview ? (
                <div className="relative w-full max-w-xs">
                  <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" /> <button
                    type="button"

                    onClick={() => setPreview(null)}
                    className="absolute  top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 leading-none">&times;
                  </button>
                </div>
              ) : (
                <div className="text-center">

                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold text-purple-400 flex gap-2" ><ArrowUp01Icon color="white" /> Click to upload</span> or drag and         drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, or GIF</p>

                </div>
              )}
            </div>

          </div>

          <button
            className="text-gray-200 mt-5 bg-[#9333EA] rounded-xl text-xl font-medium p-4 hover:bg-purple-700 transition-colors disabled:bg-gray-500"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Post'}
          </button>

          {isError && <p className="text-red-500 text-sm text-center mt-2">{error.message}</p>}
        </form>
      </div>
    </div >
  );
};

export default Createpost;


