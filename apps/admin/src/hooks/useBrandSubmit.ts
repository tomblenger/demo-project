import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { useAddBrandMutation, useEditBrandMutation } from "@/redux/brand/brandApi";
import { useToast } from "@/components/ui/Toast";

const useBrandSubmit = () => {
  const [logo, setLogo] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  
  const { addToast } = useToast();
  
  // Toast utilities
  const notifyError = (message: string) => addToast(message, 'error');
  const notifySuccess = (message: string) => addToast(message, 'success');
  
  // add
  const [addBrand,{ data:brandData }] = useAddBrandMutation();
  // add
  const [editBrand, { data: brandEditData}] = useEditBrandMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handle
  const handleSubmitBrand = async (data: any) => {
    try {
      const brand_data = {
        name: data?.name,
        description: data?.description,
        email: data?.email,
        website: data.website,
        location: data.location,
        logo: logo,
        status: status
      };
      const res = await addBrand({ ...brand_data });
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
            return notifyError("Invalid input data. Please check all required fields.");
          }
          if (res.error.status === 409) {
            return notifyError("Brand with this name already exists.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to create brand. Please check your input and try again.");
      } else {
        notifySuccess("Brand added successfully");
        setIsSubmitted(true);
        reset();
        setLogo("");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Category
  const handleSubmitEditBrand = async (data: any, id: string) => {
    try {
      const brand_data = {
        name: data?.name,
        description: data?.description,
        email: data?.email,
        website: data.website,
        location: data.location,
        logo: logo,
        status: status
      };
      const res = await editBrand({ id, data: brand_data });
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
            return notifyError("Invalid input data. Please check all required fields.");
          }
          if (res.error.status === 404) {
            return notifyError("Brand not found.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to update brand. Please check your input and try again.");
      } else {
        notifySuccess("Brand update successfully");
        router.push('/brands')
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setLogo,
    setStatus,
    handleSubmitBrand,
    isSubmitted,
    setIsSubmitted,
    handleSubmitEditBrand,
  };
};

export default useBrandSubmit;
