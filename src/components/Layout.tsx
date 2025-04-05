
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6 md:py-10">
        {children}
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container">
          MediShield DataVault &copy; {new Date().getFullYear()} - Secure Medical Data Storage
        </div>
      </footer>
    </div>
  );
}

export default Layout;
