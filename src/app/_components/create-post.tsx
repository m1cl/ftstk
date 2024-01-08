"use client";

import {useRouter} from "next/navigation";
import {ChangeEvent, useState} from "react";

import {api} from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const createImage = api.image.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setImages([]);
    },
  });
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (files[0]?.name && files[0].length !== 0) {
      const file = await files[0].text();
      if (file) {
        createImage.mutate({name: files[0].name, file});
      }
      console.log();

    }
    setImages([...files, ...images]);
  };


  const showImages = () => {
    if (images) {
      return images.map((image, index) => {
        return (
          <img
            className="my-8 border-[24px] border-white shadow-2xl"
            key={index}
            src={URL.createObjectURL(image)}
            alt="image"
          />
        );
      });
    }
  };

  return (
    <div>
      {showImages()}
      <label className="mx-auto mt-2 flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-5 text-center dark:border-gray-700 dark:bg-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8 text-gray-500 dark:text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
          Click to upload or drag and drop
        </h2>
        <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 512x512px)
        </p>
        <input
          id="dropzone-file"
          type="file"
          accept=".jpg, .png, .gif, .jpeg"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}
