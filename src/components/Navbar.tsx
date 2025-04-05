
import { Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <div className="relative">
            <Shield className="h-6 w-6 text-medishield-600" />
            <Lock className="h-3 w-3 absolute bottom-0 right-0 text-medishield-700" />
          </div>
          <Link to="/" className="flex items-center ml-2">
            <span className="font-bold text-xl text-medishield-700">MediShield</span>
            <span className="ml-1 text-sm font-light text-muted-foreground">DataVault</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/encrypt"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Encrypt
          </Link>
          <Link
            to="/decrypt"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Decrypt
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
