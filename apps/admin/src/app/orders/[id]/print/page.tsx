"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetSingleOrderQuery } from "@/redux/order/orderApi";
import InvoicePrint from "../../../components/orders/invoice-print";
import Head from "next/head";

const PrintInvoicePage = () => {
  const { id } = useParams();
  const { data: orderData, isLoading, isError } = useGetSingleOrderQuery(id as string);

  useEffect(() => {
    if (orderData) {
      setTimeout(() => window.print(), 500);
    }
  }, [orderData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !orderData) return <div>Error loading invoice.</div>;

  return (
    <>
      <Head>
        <title>Invoice - GadgetHub</title>
        <style>{`
          @media print {
            @page { margin: 0; size: auto; }
            body { margin: 0; }
            html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
        `}</style>
      </Head>
      <div style={{ background: '#fff', padding: 24, minHeight: '100vh' }}>
        <InvoicePrint orderData={orderData} />
      </div>
    </>
  );
};

export default PrintInvoicePage; 