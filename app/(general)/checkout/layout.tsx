import OrderSummary from "./summary"
export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {children}
            <OrderSummary />
        </div>
    </div>
  )
}
