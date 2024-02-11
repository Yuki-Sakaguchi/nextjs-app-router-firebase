import SideMenu from "@/components/layouts/SideMenu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getTheme } from "@/features/theme/domain/usecase/server";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const theme = getTheme();
  return (
    <html lang="ja" data-theme={theme}>
      <body className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} maxSize={30} minSize={5}>
            {/* @ts-expect-error Server Component */}
            <SideMenu />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <main className="flex-1 p-8 h-full">{children}</main>
          </ResizablePanel>
        </ResizablePanelGroup>
        <ToastContainer />
      </body>
    </html>
  );
}
