
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Shield, Lock, Clock, Server } from "lucide-react";

const About = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">About MediShield DataVault</h1>
        <p className="text-muted-foreground">
          Protecting medical data with enterprise-grade encryption
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>
            Providing secure solutions for healthcare data protection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            MediShield DataVault was founded with a simple mission: to protect sensitive medical
            data with robust encryption while maintaining ease of use for healthcare professionals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex space-x-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">HIPAA Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  Our encryption methods are designed to help healthcare organizations meet HIPAA security requirements.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  AES-256 encryption ensures your data remains private and secure throughout the entire process.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit">
                <HeartPulse className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Patient-Centered</h3>
                <p className="text-sm text-muted-foreground">
                  Designed with patients' privacy and security as our top priority.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Fast Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Encrypt and decrypt medical files and data quickly without compromising security.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technical Information</CardTitle>
          <CardDescription>
            How MediShield DataVault protects your information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our platform employs industry-standard encryption algorithms to ensure that your medical data remains private and secure:
          </p>
          
          <ul className="space-y-2 list-disc pl-5 mb-4">
            <li>AES-256 encryption for all data</li>
            <li>SHA-512 hashing for data integrity verification</li>
            <li>Client-side encryption so data never leaves your device unprotected</li>
            <li>No server storage of encryption keys - you maintain complete control</li>
          </ul>
          
          <div className="bg-muted p-4 rounded-md text-sm">
            <p className="text-muted-foreground italic">
              "MediShield DataVault represents the gold standard in medical data encryption technology."
              <br />- Healthcare Security Journal
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
