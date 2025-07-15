import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { useDeleteCloudinaryImgMutation } from "@/redux/cloudinary/cloudinaryApi";

const useCloudinary = (
  file: { url: string; id: string },
  setFormData?: React.Dispatch<React.SetStateAction<string[]>>,
  setImgUrl?: React.Dispatch<React.SetStateAction<string>>
) => {
  const [
    deleteCloudinaryImg,
    { data: delData, isError: delError, isLoading: delLoading },
  ] = useDeleteCloudinaryImgMutation();
  const [item, setItem] = useState<{ url: string | null; id: string }>(file);
  
  const { addToast } = useToast();
  
  // Toast utilities
  const notifyError = (message: string) => addToast(message, 'error');
  const notifySuccess = (message: string) => addToast(message, 'success');

  // set image url
  useEffect(() => {
    setItem({url:file.url,id:file.id})
  },[file.id, file.url])

  // update state when delData was changes
  useEffect(() => {
    if (delData && setFormData) {
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        const index = updatedFormData.findIndex(
          (item) => item === file.url
        );
        console.log('index',index)
        if (index !== -1) {
          updatedFormData.splice(index, 1);
        } 
        return updatedFormData;
      });
    }
    if (delData && !delError && setImgUrl) {
      setItem({ url: null, id: "" });
      setImgUrl("");
    }
  }, [delData, delError, file.url, setFormData, setImgUrl]);

  // handle delete image 
  const handleDeleteImg = async (file: { url: string; id: string }) => {
    try {
      const { id } = file;
      const folder_name = id.split("/")[0];
      const public_id = id.split("/")[1];
      const res = await deleteCloudinaryImg({
        folder_name: folder_name,
        id: public_id,
      });
      
      if ("error" in res) {
        // Handle different error response structures
        if ("data" in res.error && res.error.data) {
          const errorData = res.error.data as any;
          
          // Handle array of error messages (validation errors)
          if (errorData.errorMessages && Array.isArray(errorData.errorMessages)) {
            const errorMessage = errorData.errorMessages.map((err: any) => err.message).join(", ");
            return notifyError(errorMessage);
          }
          
          // Handle single error message
          if (errorData.message) {
            return notifyError(errorData.message);
          }
          
          // Handle error field directly
          if (errorData.error) {
            return notifyError(errorData.error);
          }
        }
        
        // Handle error object directly
        if (res.error && typeof res.error === 'object' && 'message' in res.error) {
          return notifyError(res.error.message);
        }
        
        // Handle status-based errors
        if (res.error && typeof res.error === 'object' && 'status' in res.error) {
          if (res.error.status === 400) {
            return notifyError("Invalid image data. Please try again.");
          }
          if (res.error.status === 404) {
            return notifyError("Image not found.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to delete image. Please try again.");
      } else {
        notifySuccess("Image deleted successfully");
        setItem({ url: null, id: "" });
      }
    } catch (error) {
      // Handle the error
      console.log(error)
      notifyError("Something went wrong");
    }
  };

  return {
    handleDeleteImg,
    delError,
    delLoading,
    item,
    setItem,
  };
};

export default useCloudinary;
