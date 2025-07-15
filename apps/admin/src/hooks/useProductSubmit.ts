"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";
import { useToast } from "@/components/ui/Toast";
import { IAddProduct } from "@/types/product-type";

type IBCType = {
  name: string;
  id: string;
};

const useProductSubmit = () => {
  const [img, setImg] = useState<string>("");
  const [relatedImages, setRelatedImages] = useState<string[]>([]);
  const [brand, setBrand] = useState<IBCType>({ name: '', id: '' });
  const [category, setCategory] = useState<IBCType>({ name: '', id: '' });
  const [parent, setParent] = useState<string>('');
  const [children, setChildren] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);

  const router = useRouter();
  const { addToast } = useToast();
  
  // Toast utilities
  const notifyError = (message: string) => addToast(message, 'error');
  const notifySuccess = (message: string) => addToast(message, 'success');

  // useAddProductMutation
  const [addProduct, { data: addProductData, isError, isLoading }] =
    useAddProductMutation();
  // useAddProductMutation
  const [editProduct, { data: editProductData, isError: editErr, isLoading: editLoading }] =
    useEditProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();
  // resetForm

  // handle submit product
  const handleSubmitProduct = async (data: any) => {
    console.log('data', data)
    // product data
    const productData: IAddProduct = {
      sku: data.sku,
      title: data.title,
      parent: parent,
      children: children,
      tags: tags,
      image: img,
      originalPrice: Number(data.price),
      price: Number(data.price),
      discount: Number(data.discount),
      relatedImages: relatedImages,
      description: data.description,
      brand: brand,
      category: category,
      unit: data.unit,
      quantity: Number(data.quantity),
      colors: colors,
    };
    console.log('productData-------------------..>', productData)
    if (!img) {
      return notifyError("Product image is required");
    }
    if (!category.name) {
      return notifyError("Category is required");
    }
    if (Number(data.discount) > Number(data.price)) {
      return notifyError("Product price must be gether than discount");
    } else {
      const res = await addProduct(productData);

      if ("error" in res) {
        // Handle different error response structures without console.error
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
            return notifyError("Product with this SKU already exists.");
          }
          if (res.error.status === 500) {
            return notifyError("Server error. Please try again later.");
          }
        }
        
        // Fallback error message
        return notifyError("Failed to create product. Please check your input and try again.");
      }
      else {
        notifySuccess("Product created successFully");
        setIsSubmitted(true);
        router.push('/product-grid')
      }
    }
  };
  // handle edit product
  const handleEditProduct = async (data: any, id: string) => {
    // product data
    const productData: IAddProduct = {
      sku: data.sku,
      title: data.title,
      parent: parent,
      children: children,
      tags: tags,
      image: img,
      originalPrice: Number(data.price),
      price: Number(data.price),
      discount: Number(data.discount),
      relatedImages: relatedImages,
      description: data.description,
      brand: brand,
      category: category,
      unit: data.unit,
      quantity: Number(data.quantity),
      colors: colors,
    };

    const res = await editProduct({ id: id, data: productData })
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
          return notifyError("Product not found.");
        }
        if (res.error.status === 500) {
          return notifyError("Server error. Please try again later.");
        }
      }
      
      // Fallback error message
      return notifyError("Failed to update product. Please check your input and try again.");
    }
    else {
      notifySuccess("Product edit successFully");
      setIsSubmitted(true);
      router.push('/product-grid')
    }
  };

  return {
    img,
    setImg,
    parent,
    brand,
    setBrand,
    category,
    setCategory,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    setParent,
    setChildren,
    setTags,
    setColors,
    setRelatedImages,
    tags,
    isSubmitted,
    relatedImages,
    colors,
  };
};

export default useProductSubmit;
