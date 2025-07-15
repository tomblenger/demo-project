import React from "react";
import Image from "next/image";
const upload_default = "/assets/img/icons/upload.png";
import { SmClose } from "@/svg";
import useCloudinary from "@/hooks/useCloudinary";
import SafeImage from "@/components/ui/SafeImage";

type IPropType = {
  file: { url: string; id: string };
  setFormData?: React.Dispatch<React.SetStateAction<string[]>>;
  setImgUrl?: React.Dispatch<React.SetStateAction<string>>;
  isCenter?:boolean;
};
const UploadImage = ({ file,setFormData,setImgUrl,isCenter=false }: IPropType) => {
  const {handleDeleteImg,item} = useCloudinary(file,setFormData,setImgUrl);
  return (
    <>
      <div className={`flex flex-row flex-wrap ${isCenter?'items-center justify-center':''}`}>
        <div className="relative">
          <SafeImage
            className="inline-flex border rounded-md border-gray6 w-24 max-h-24 p-2"
            src={item.url}
            alt="productImg"
            width={100}
            height={100}
            fallbackSrc={upload_default}
          />
          {item.url && item.url.trim() !== "" && (
            <button
              onClick={() => handleDeleteImg(file)}
              type="button"
              className="absolute -top-4 -right-3 text-red-500 focus:outline-none"
            >
              <SmClose />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadImage;
