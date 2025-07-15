"use client";
import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthCom from "@/app/components/auth/auth-com";
import { ToastProvider } from "@/components/ui/Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AuthCom>{children}</AuthCom>
      </ToastProvider>
    </Provider>
  );
}
