import { FilterSidebar } from "./filter-sidebar"
export default async function ProductsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    return (
      <>
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for larger screens */}
          <aside className="hidden md:block w-1/4">
              <FilterSidebar />
          </aside>
          {children}
        </div>
        </div>
      </>
    )
  }
  