import type { FC, FormEvent, ReactNode } from "react";
import type { DragEvent } from "react";
import { ArrowUp01Icon, CircleX, LoaderCircle, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { fetchCommunities, type CommunitiesType } from "./Communities";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import SupabaseClient from "../Instances/SupabaseClient";
interface CommunitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (community: CommunitiesType) => void;
}

const CommunitySelectionModal: FC<CommunitySelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: communities, isLoading, isError } = useQuery({
    queryKey: ['communitiesList'],
    queryFn: fetchCommunities,
  });

  const filteredCommunities = useMemo(() => {
    if (!communities) return [];
    return communities.filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [communities, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[#1E1E1E] rounded-2xl w-11/12 md:w-1/2 lg:w-1/3 max-h-[80vh] flex flex-col p-6 border border-neutral-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Select a Community</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CircleX />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white w-full bg-[#121212] p-3 pl-10 rounded-xl border border-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar pr-2">
          {isLoading && <div className="text-center p-4 text-gray-400">Loading...</div>}
          {isError && <div className="text-center p-4 text-red-500">Failed to load communities.</div>}
          {filteredCommunities.length > 0 ? (
            <ul className="space-y-2">
              {filteredCommunities.map(community => (
                <li
                  key={community.id}
                  onClick={() => {
                    onSelect(community);
                    {/* NEW COMMUNITY SELECTOR FIELD */ }
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-purple-500/20 transition-colors"
                >
                  <img src={community.Image_url || "https://static.thenounproject.com/png/4154905-200.png"} alt={community.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-medium text-gray-200">{community.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && <div className="text-center p-4 text-gray-500">No communities found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PostType {
  title: string;
  content: string;
  imageURL?: string | null;
  avatar_url: string | null;
  author_name: string;
  community_id: number | null;
}

const Createpost: FC<{ handleClick: () => void }> = ({ handleClick }): ReactNode => {
  const { User } = useAuth();
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryclient = useQueryClient();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');



  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunitiesType | null>(null);

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
      queryclient.invalidateQueries({ queryKey: ['postlist'] });
      if (selectedCommunity) {
        //TODO:Ayush ithe tula jar ka community select kele asel user ni tar parat posts fetch karve laganr manjay invalidateQueries karvi lagnar 
      }
      handleClick();
    }
  });

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!User) return;
    let imageURL: string | null = null;

    if (selectedFile) {
      const filepath = `${User.id}/${selectedFile.name}-${Date.now()}`;
      const { data, error } = await SupabaseClient.storage
        .from("images")
        .upload(filepath, selectedFile);

      if (error) {
        console.error("Image upload error:", error);
        return;
      }

      if (data) {
        const { data: imagepublicURL } = SupabaseClient.storage
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
      community_id: selectedCommunity ? selectedCommunity.id : null
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      setSelectedFile(files[0]);
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      setSelectedFile(files[0]);
    }
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };


  return (
    <>
      <div className="fixed inset-0 h-screen w-screen backdrop-blur-sm z-40">
        <div className="relative mt-10 sm:mt-16 h-[90vh] sm:h-auto sm:max-h-[90vh] no-scrollbar overflow-y-auto sm:w-1/2 mx-auto p-6 bg-[#121212] rounded-2xl text-gray-200">
          <div className="absolute right-6 top-6 cursor-pointer" onClick={handleClick}> <CircleX /></div>
          <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
            <div>
              <label className="text-lg font-medium mb-2 block">Create Post</label>
              <input
                className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
                type='text'
                required
              />
            </div>

            <div>
              <label className="text-lg font-medium mb-2 block">Community (Optional)</label>
              <button
                type="button"
                onClick={() => setIsCommunityModalOpen(true)}
                className="w-full text-left bg-[#1E1E1E] p-4 rounded-xl border border-transparent hover:border-purple-500/50 focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
              >
                {selectedCommunity ? (
                  <span className="text-gray-200">{selectedCommunity.name}</span>
                ) : (
                  <span className="text-gray-500">Click to associate this post to particular community</span>
                )}
              </button>
            </div>

            <div>
              <label className="text-lg font-medium mb-2 block">Description</label>
              <textarea
                rows={4}
                className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is this post about?"
                required
              />
            </div>

            <div>
              <label className="text-lg font-medium mb-2 block">Post Image (Optional)</label>
              <div
                className={`flex justify-center items-center w-full p-6 border-2 ${isDragging ? 'border-purple-500' : 'border-gray-600'} border-dashed rounded-xl cursor-pointer transition-colors`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input type="file" onChange={handleFileSelect} ref={fileInputRef} className="hidden" accept="image/*" />
                {preview ? (
                  <div className="relative w-full max-w-xs">
                    <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
                    <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 leading-none">&times;</button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold text-purple-400 flex items-center justify-center gap-2"><ArrowUp01Icon color="white" /> Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, or GIF</p>
                  </div>
                )}
              </div>
            </div>

            <button
              className="text-gray-200 mt-5 bg-purple-600 rounded-xl text-xl font-medium p-4 hover:bg-purple-700 transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <LoaderCircle className="animate-spin mx-auto" /> : 'Create Post'}
            </button>
            {isError && <p className="text-red-500 text-sm text-center mt-2">{error.message}</p>}
          </form>
        </div>
      </div>
      <CommunitySelectionModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        onSelect={setSelectedCommunity}
      />
    </>
  );
};

export default Createpost;
