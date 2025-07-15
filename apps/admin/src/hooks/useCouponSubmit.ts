import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/Toast";
import { useAddCouponMutation, useEditCouponMutation, useGetCouponQuery } from "@/redux/coupon/couponApi";
import dayjs from "dayjs";

const useCouponSubmit = () => {
  const [logo, setLogo] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [selectProductType, setSelectProductType] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const router = useRouter();
  
  const { addToast } = useToast();
  
  // Toast utilities
  const notifyError = (message: string) => {
    console.log('🔴 Calling notifyError with message:', message);
    addToast(message, 'error');
  };
  const notifySuccess = (message: string) => {
    console.log('🟢 Calling notifySuccess with message:', message);
    addToast(message, 'success');
  };
  
  // Test function to verify toast is working
  const testToast = () => {
    console.log('🧪 Testing toast notifications...');
    notifyError("Test error message - if you can see this, toast is working!");
    setTimeout(() => {
      notifySuccess("Test success message - toast system is functional!");
    }, 1000);
  };

  // add coupon
  const [addCoupon, { }] = useAddCouponMutation();
  // edit coupon
  const [editCoupon, { }] = useEditCouponMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<any>();


  useEffect(() => {
    if (!openSidebar) {
      setLogo("")
      setSelectProductType("");
      reset();
    }
  }, [openSidebar, reset])
  // submit handle
  const handleCouponSubmit = async (data: any) => {
    console.log('🎟️ Starting coupon submission with data:', data);
    console.log('🎟️ Selected product type:', selectProductType);
    console.log('🎟️ Logo:', logo);
    
    try {
      // Validate required fields
      if (!data?.name || !data?.code || !data?.endtime || !data?.discountpercentage || !data?.minimumamount) {
        console.error('❌ Missing required fields:', {
          name: !!data?.name,
          code: !!data?.code,
          endtime: !!data?.endtime,
          discountpercentage: !!data?.discountpercentage,
          minimumamount: !!data?.minimumamount
        });
        return notifyError("Please fill in all required fields");
      }
      
      if (!selectProductType) {
        console.error('❌ Missing product type');
        return notifyError("Please select a product type");
      }
      
      // Validate discount percentage
      const discountPercentage = Number(data.discountpercentage);
      if (isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage > 100) {
        console.error('❌ Invalid discount percentage:', data.discountpercentage);
        return notifyError("Discount percentage must be between 1 and 100");
      }
      
      // Validate minimum amount
      const minimumAmount = Number(data.minimumamount);
      if (isNaN(minimumAmount) || minimumAmount < 0) {
        console.error('❌ Invalid minimum amount:', data.minimumamount);
        return notifyError("Minimum amount must be a valid positive number");
      }
      
      // Validate and format end time
      const endTime = dayjs(data.endtime);
      if (!endTime.isValid()) {
        console.error('❌ Invalid end time:', data.endtime);
        return notifyError("Please select a valid end date");
      }
      
      if (endTime.isBefore(dayjs())) {
        console.error('❌ End time is in the past:', endTime.format());
        return notifyError("End date must be in the future");
      }

      const coupon_data = {
        logo: logo || 'https://via.placeholder.com/150',
        title: data.name.trim(),
        couponCode: data.code.trim().toUpperCase(),
        endTime: endTime.toISOString(),
        discountPercentage: discountPercentage,
        minimumAmount: minimumAmount,
        productType: selectProductType,
      };

      console.log('🎟️ Sending coupon data to API:', coupon_data);

      const res = await addCoupon({ ...coupon_data });
      
      console.log('🎟️ API Response:', res);
      
      if ("error" in res) {
        console.error('❌ API returned error:', res.error);
        
        // Handle different error response structures
        if ("data" in res.error && res.error.data) {
          const errorData = res.error.data as any;
          console.error('❌ Error data:', errorData);
          
          // Handle array of error messages (validation errors)
          if (errorData.errorMessages && Array.isArray(errorData.errorMessages)) {
            const errorMessage = errorData.errorMessages.map((err: any) => err.message).join(", ");
            console.error('❌ Validation errors:', errorMessage);
            return notifyError(errorMessage);
          }
          
          // Handle single error message
          if (errorData.message) {
            console.error('❌ Error message:', errorData.message);
            return notifyError(errorData.message);
          }
          
          // Handle error field directly
          if (errorData.error) {
            console.error('❌ Direct error:', errorData.error);
            return notifyError(errorData.error);
          }
        }
        
        // Handle error object directly
        if (res.error && typeof res.error === 'object' && 'message' in res.error) {
          console.error('❌ Error object message:', res.error.message);
          return notifyError(res.error.message);
        }
        
        // Handle status-based errors
        if (res.error && typeof res.error === 'object' && 'status' in res.error) {
          console.error('❌ Status-based error:', res.error.status);
          if (res.error.status === 400) {
            return notifyError("Invalid coupon data. Please check all fields.");
          }
          if (res.error.status === 409) {
            return notifyError("Coupon with this code already exists.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        console.error('❌ Fallback error');
        return notifyError("Failed to create coupon. Please check your input and try again.");
      } else {
        console.log('✅ Coupon created successfully:', res);
        notifySuccess("Coupon added successfully");
        setIsSubmitted(true);
        setLogo("")
        setOpenSidebar(false);
        setSelectProductType("");
        reset();
      }
    } catch (error) {
      console.error('❌ Unexpected error in coupon submission:', error);
      notifyError("Something went wrong: " + (error.message || "Unknown error"));
    }
  };

   //handle Submit edit Coupon
   const handleSubmitEditCoupon = async (data: any, id: string) => {
    try {
      // Validate required fields
      if (!data?.name || !data?.code || !data?.endtime || !data?.discountpercentage || !data?.minimumamount) {
        return notifyError("Please fill in all required fields");
      }
      
      if (!selectProductType) {
        return notifyError("Please select a product type");
      }
      
      // Validate discount percentage
      const discountPercentage = Number(data.discountpercentage);
      if (isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage > 100) {
        return notifyError("Discount percentage must be between 1 and 100");
      }
      
      // Validate minimum amount
      const minimumAmount = Number(data.minimumamount);
      if (isNaN(minimumAmount) || minimumAmount < 0) {
        return notifyError("Minimum amount must be a valid positive number");
      }
      
      // Validate and format end time
      const endTime = dayjs(data.endtime);
      if (!endTime.isValid()) {
        return notifyError("Please select a valid end date");
      }
      
      if (endTime.isBefore(dayjs())) {
        return notifyError("End date must be in the future");
      }

      const coupon_data = {
        logo: logo || 'https://via.placeholder.com/150',
        title: data.name.trim(),
        couponCode: data.code.trim().toUpperCase(),
        endTime: endTime.toISOString(),
        discountPercentage: discountPercentage,
        minimumAmount: minimumAmount,
        productType: selectProductType,
      };

      const res = await editCoupon({ id, data: coupon_data });
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
            return notifyError("Invalid coupon data. Please check all fields.");
          }
          if (res.error.status === 404) {
            return notifyError("Coupon not found.");
          }
          if (res.error.status === 409) {
            return notifyError("Coupon with this code already exists.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to update coupon. Please check your input and try again.");
      } else {
        notifySuccess("Coupon updated successfully");
        setIsSubmitted(true);
        setOpenSidebar(false);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return {
    handleCouponSubmit,
    isSubmitted,
    setIsSubmitted,
    logo,
    setLogo,
    register,
    handleSubmit,
    errors,
    openSidebar,
    setOpenSidebar,
    control,
    selectProductType,
    setSelectProductType,
    handleSubmitEditCoupon,
    setEditId,
    testToast, // For debugging toast notifications
  };
};

export default useCouponSubmit;
