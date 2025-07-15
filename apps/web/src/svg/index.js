import Cart from "./cart";
import Heart from "./heart";
import Search from "./search";
import User from "./user";
import RightArrow from "./right-arrow";
import CartTwo from "./cart-2";
import HeartTwo from "./heart-2";
import Compare from "./compare";
import Eye from "./eye";
import Payment from "./payment";
import Refund from "./refund";
import ShippingCar from "./shipping-car";
import Support from "./support";
import Minus from "./minus";
import Plus from "./plus";
import Times from "./times";
import Website from "./website";
import Mobile from "./mobile";
import Dashboard from "./dashboard";
import RightArrowTwo from "./right-arrow-2";
import Play from "./play";
import Line from "./line";
import ShapeLine from "./shape-line";
import Home from "./home";
import Lists from "./lists";
import Dots from "./dots";
import NextArrow from "./next-arrow";
import PrevArrow from "./prev-arrow";
import DotsTwo from "./dots-2";
import General from "./general";
import EyeCut from "./eye-cut";
import Lock from "./lock";
import UserTwo from "./user-2";
import Email from "./email";
import ErrorSvg from "./error-svg";
import RightArrowThree from "./right-arrow-3";
import EmailTwo from "./email-2";
import MobileTwo from "./mobile-2";
import Location from "./location";
import Box from "./box";
import Truck from "./truck";
import Delivery from "./delivery";
import Processing from "./processing";
import LoadMore from "./load-more";
import Received from "./received";
import Sales from "./sales";
import MonthSales from "./month-sales";
import TotalOrders from "./total-orders";
import React from 'react';

export const Edit = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export const Delete = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3,6 5,6 21,6"/>
    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

export const CloseTwo = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const Invoice = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

export const View = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export const SmClose = ({ ...props }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const Drug = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5Z"/>
    <path d="M12 5L8 21l4-7 4 7-4-16"/>
  </svg>
);

export const CameraTwo = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

export const Next = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

export const Prev = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="15,18 9,12 15,6"/>
  </svg>
);



export {
  Box,
  Delivery,
  Processing,
  LoadMore,
  Truck,
  Cart,
  Heart,
  Search,
  User,
  RightArrow,
  Location,
  MobileTwo,
  EmailTwo,
  CartTwo,
  Compare,
  Eye,
  HeartTwo,
  Payment,
  Refund,
  ShippingCar,
  Support,
  Minus,
  Plus,
  Times,
  Dashboard,
  Mobile,
  Website,
  RightArrowTwo,
  Play,
  Line,
  ShapeLine,
  Home,
  Dots,
  Lists,
  NextArrow,
  PrevArrow,
  DotsTwo,
  General,
  EyeCut,
  Lock,
  UserTwo,
  Email,
  ErrorSvg,
  RightArrowThree,
  Received,
  Sales,
  MonthSales,
  TotalOrders,
}