import React from 'react';

export interface ISidebarMenus {
  id: number;
  icon: () => React.JSX.Element;
  link: string;
  title: string;
  subMenus?: {
    title: string;
    link: string;
  }[]
}