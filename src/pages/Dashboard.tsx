
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, FileText, ShieldCheck, PieChart, Upload, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          MediShield Data Vault
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto md:mx-0">
          Secure medical data storage with AES encryption and SHA-512 hashing for protecting sensitive patient information.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/encrypt" className="group">
          <Card className="group-hover:border-primary group-hover:shadow-sm transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Encrypt Data</CardTitle>
              <Upload className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Securely encrypt medical files using AES encryption and generate SHA-512 hashes
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/decrypt" className="group">
          <Card className="group-hover:border-primary group-hover:shadow-sm transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Decrypt Data</CardTitle>
              <Download className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Decrypt encrypted medical data for authorized access with the correct encryption key
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Security Features</CardTitle>
            <ShieldCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-primary" />
                AES-256 Encryption
              </li>
              <li className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                SHA-512 Hashing
              </li>
              <li className="flex items-center">
                <PieChart className="h-4 w-4 mr-2 text-primary" />
                Visual Encryption Status
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-2">1</span>
                  Upload Medical Files
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload images or CSV files containing medical data that needs to be secured.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-2">2</span>
                  Secure Encryption
                </h3>
                <p className="text-sm text-muted-foreground">
                  Files are encrypted using AES and hashed with SHA-512 for maximum security.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-2">3</span>
                  Access Control
                </h3>
                <p className="text-sm text-muted-foreground">
                  Only those with the correct encryption key can decrypt and access the data.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
