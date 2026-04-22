import Navbar from "@/modules/layout/templates/nav"
import Footer from "@/modules/layout/templates/footer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
