import type { ReactNode } from "react";
import { ArrowUpFromLine } from 'lucide-react'
import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import type { DragEvent } from "react";
import SupabaseClient from "../Instances/SupabaseClient";


interface CreateCommunityType {
  name: string;
  description: string;
  file: File | null;
}

const CreateCommunity: React.FC = (): ReactNode => {

  const queryclient = useQueryClient();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const createcommunity = async (communityData: CreateCommunityType) => {
    const { name, description, file } = communityData;

    if (!name || !description) {
      throw new Error("Provide name and description");
    }
    let imageUrl = null;
    if (file) {
      const { data, error } = await SupabaseClient.storage.from("Community_Images").upload(`${Date.now()}-${name}-Community`, file)
      if (error) return;
      const { data: publicUrl } = await SupabaseClient.storage.from("Community_Images").getPublicUrl(data?.path)

      imageUrl = publicUrl.publicUrl

    }

    const { data, error } = await SupabaseClient.from("Communities").insert({
      name: name,
      description: description,
      Image_url: imageUrl,
    }).select();

    if (error) {
      console.error("Insert Error:", error)
      throw new Error('Failed to create community');
    }
    return data;
  }

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: createcommunity,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['communities'] });
      setName('');
      setDescription('');
      setFile(null);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      return;
    }
    mutate({ name, description, file });
  };

  // --- Drag and Drop Handlers ---
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      // Check if it's an image
      if (files[0].type.startsWith("image/")) {
        setFile(files[0]);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (files[0].type.startsWith("image/")) {
        setFile(files[0]);
      } else {
      }
    }
  };


  return (
    <div className="mt-2.5  sm:w-1/2 mx-auto p-6 bg-[#121212] rounded-2xl text-gray-200">
      <form className="flex  flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-lg font-medium mb-2 block">Community Name</label>
          <input
            className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
            placeholder="e.g., React Developers"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-lg font-medium mb-2 block">Description</label>
          <textarea
            rows={4}
            className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-transparent focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
            placeholder="What is this community about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="text-lg font-medium mb-2 block">Community Image (Optional)</label>
          <div
            className={`flex justify-center items-center w-full p-6 border-2 ${isDragging ? 'border-purple-500' : 'border-gray-600'} border-dashed rounded-xl cursor-pointer transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
            {preview ? (
              <div className="relative w-full max-w-xs">
                <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" /> <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 leading-none">&times;
                </button>
              </div>
            ) : (
              <div className="text-center">

                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold text-purple-400 flex gap-2" ><ArrowUpFromLine color="white" /> Click to upload</span> or drag and drop
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
          {isPending ? 'Creating...' : 'Create Community'}
        </button>

        {isError && <p className="text-red-500 text-sm text-center mt-2">{error.message}</p>}
      </form>
    </div>
  );
}

export default CreateCommunity;
