import type { Metadata } from "next";
import VendorSidebar from "./components/sidebar";
import VendorHeader from "./components/header";
export const metadata: Metadata = {
  title: "Vendor | Solakoko",
  description: "Manage inventory, sales, payments and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex h-screen bg-gray-100"> 
            <VendorSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <VendorHeader />
                <div className="overflow-scroll scroll-smooth">
                    {children}
                </div>
            </div>
        </div>
  );
}
