import NavigationBar from "@/components/navbar";
import { Footer } from "@/components/footer";
export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <>
        <NavigationBar/>
        {children}
        <Footer />
    </>
  )
}
