"use client";
import { ToastContainer } from "react-toastify";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthCom from "@/components/auth/auth-com";

export function Providers({ children }: { children: React.ReactNode }) {
  const ProviderComponent = Provider as any;
  const AuthComponent = AuthCom as any;
  const ToastComponent = ToastContainer as any;
  return (
    <ProviderComponent store={store}>
      <AuthComponent>{children}</AuthComponent>
      <ToastComponent />
    </ProviderComponent>
  );
}
