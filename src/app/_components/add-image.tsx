
'use client'

import { ChangeEvent, FormEvent, useState } from "react"

interface HTMLInputEvent extends Event {
 target: HTMLInputElement & EventTarget & { files: FileList };
}

function ImageUploader() {
 const [images, setImages] = useState<File[]>([])
 const handleUpload = (e: HTMLInputEvent) => {
  if (!e.target.files) return
  const files = Array.from(e.target.files)
  setImages([...files, ...images])
 }

 const showImages = () => {
  if (images) {
   return Array.from(images).map((image, index) => {
    return <img
     className="border-[24px] border-white shadow-2xl my-8"
     key={index} src={URL.createObjectURL(image)} alt="image" />
   })
  }
 }
 return (
  <div>
   {showImages()}
   <label className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
    <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Click to upload or drag and drop</h2>
    <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 512x512px)</p>
    <input id="dropzone-file" type="file" className="hidden" onChange={handleUpload} />
   </label>
  </div>
 )
}

export default ImageUploader