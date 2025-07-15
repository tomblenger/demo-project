import { useToast } from "@/components/ui/Toast";
import { useAddCategoryMutation, useEditCategoryMutation } from "@/redux/category/categoryApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'

const useCategorySubmit = () => {
  const [categoryImg, setCategoryImg] = useState<string>("");
  const [parent, setParent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [categoryChildren, setCategoryChildren] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  
  const { addToast } = useToast();
  
  // Toast utilities
  const notifyError = (message: string) => addToast(message, 'error');
  const notifySuccess = (message: string) => addToast(message, 'success');
  
  // add
  const [addCategory,{}] = useAddCategoryMutation();
  // edit
  const [editCategory,{ }] = useEditCategoryMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitCategory
  const handleSubmitCategory = async (data: any) => {
    try {
      const category_data = {
        img: categoryImg,
        parent: data?.parent,
        description: data?.description,
        children: categoryChildren,
      };
      if(categoryChildren.length === 0){
        return notifyError('Children is required')
      }
      const res = await addCategory({ ...category_data });
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
            return notifyError("Category with this name already exists.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to create category. Please check your input and try again.");
      } else {
        notifySuccess("Category added successfully");
        setIsSubmitted(true);
        reset();
        setCategoryChildren([]);
        setCategoryImg("");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditCategory = async (data: any, id: string) => {
    try {
      const category_data = {
        img: categoryImg,
        parent: data?.parent,
        description: data?.description,
        children: categoryChildren,
      };
      if(categoryChildren.length === 0){
        return notifyError('Children is required')
      }
      const res = await editCategory({ id, data: category_data });
      // console.log(res)
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
            return notifyError("Category not found.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to update category. Please check your input and try again.");
      } else {
        notifySuccess("Category update successfully");
        router.push('/category')
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
    setValue,
    errors,
    control,
    categoryImg,
    setCategoryImg,
    parent,
    setParent,
    description,
    setDescription,
    categoryChildren,
    setCategoryChildren,
    handleSubmitCategory,
    error,
    isSubmitted,
    handleSubmitEditCategory,
  };
};

export default useCategorySubmit;
