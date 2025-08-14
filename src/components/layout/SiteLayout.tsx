
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { HoverSidebar } from './HoverSidebar';

function UniversalSidebarTrigger() {
  const { state } = useSidebar();
  
  if (state !== "collapsed") return null;
  
  return (
    <SidebarTrigger className="fixed top-4 left-4 z-[60] bg-background border shadow-md hover:bg-accent hover:text-accent-foreground" />
  );
}

export function SiteLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full overflow-x-hidden">
        <AppSidebar />
        <HoverSidebar />
        <UniversalSidebarTrigger />
        <SidebarInset>
          <main className="flex-1 p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
