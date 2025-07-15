import { useToast } from "@/components/ui/Toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAddStaffMutation, useUpdateProfileMutation } from "@/redux/auth/authApi";
import dayjs from "dayjs";

const useStaffSubmit = () => {
  const [staffImg, setStaffImg] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  
  const { addToast } = useToast();
  
  // Toast utilities
  const notifyError = (message: string) => addToast(message, 'error');
  const notifySuccess = (message: string) => addToast(message, 'success');
  
  // add
  const [addStaff, { data: addStuffData }] = useAddStaffMutation();
  // edit
  const [updateProfile, { data: updateData }] = useUpdateProfileMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitStuff
  const handleSubmitStuff = async (data: any) => {
    try {
      const stuff_data = {
        image: staffImg,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        password: data?.password,
        role: role,
        joiningDate: data?.joiningdate
          ? data.joiningdate
          : dayjs(new Date()).format("YYYY-MM-DD"),
      };
      const res = await addStaff({ ...stuff_data });
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
            return notifyError("Admin with this email already exists.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to add staff member. Please check your input and try again.");
      } else {
        notifySuccess("Stuff added successfully");
        setIsSubmitted(true);
        reset();
        setStaffImg("");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Profile
  const handleSubmitEditProfile = async (data: any, id: string) => {
    try {
      const stuff_data = {
        image: staffImg,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        role: role,
        joiningDate: data?.joiningdate
          ? data.joiningdate
          : dayjs(new Date()).format("YYYY-MM-DD"),
      };
      const res = await updateProfile({ id, data: stuff_data });
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
            return notifyError("Staff member not found.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to update staff member. Please check your input and try again.");
      } else {
        notifySuccess("Profile updated successfully");
        router.push('/our-staff')
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
    control,
    errors,
    staffImg,
    setStaffImg,
    role,
    setRole,
    handleSubmitStuff,
    isSubmitted,
    handleSubmitEditProfile,
    setIsSubmitted,
  };
};

export default useStaffSubmit;
