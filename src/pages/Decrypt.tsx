
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { decryptData, getFileInfoFromBase64, base64toFile } from "@/utils/cryptoUtils";
import { AlertCircle, Download, FileImage, FileText, KeyRound, ShieldCheck, Unlock } from "lucide-react";

type DecryptionResult = {
  success: boolean;
  data: string;
  isFile: boolean;
  fileName?: string;
  fileType?: string;
};

const Decrypt = () => {
  const [encryptionKey, setEncryptionKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptionResult, setDecryptionResult] = useState<DecryptionResult | null>(null);
  const { toast } = useToast();

  const handleDecrypt = async () => {
    if (!encryptionKey) {
      toast({
        title: "Decryption Key Required",
        description: "Please enter the decryption key.",
        variant: "destructive",
      });
      return;
    }

    if (!encryptedText) {
      toast({
        title: "Encrypted Data Required",
        description: "Please paste the encrypted data to decrypt.",
        variant: "destructive",
      });
      return;
    }

    setIsDecrypting(true);
    try {
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 800));

      // Decrypt the data
      const decrypted = decryptData(encryptedText, encryptionKey);
      
      // Check if the decrypted data is a base64 image/file
      const isBase64File = decrypted.startsWith('data:');
      
      if (isBase64File) {
        const fileInfo = getFileInfoFromBase64(decrypted);
        setDecryptionResult({
          success: true,
          data: decrypted,
          isFile: true,
          fileType: fileInfo.type,
          fileName: `decrypted-file.${fileInfo.extension}`
        });
      } else {
        setDecryptionResult({
          success: true,
          data: decrypted,
          isFile: false
        });
      }

      toast({
        title: "Decryption Successful",
        description: isBase64File ? "File decrypted successfully." : "Text decrypted successfully.",
      });
    } catch (error) {
      console.error("Decryption error:", error);
      setDecryptionResult(null);
      toast({
        title: "Decryption Failed",
        description: "Invalid key or corrupted data. Please check your decryption key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsDecrypting(false);
    }
  };

  const downloadDecryptedFile = () => {
    if (decryptionResult?.isFile && decryptionResult.data) {
      const fileName = decryptionResult.fileName || 'decrypted-file';
      const file = base64toFile(decryptionResult.data, fileName);
      
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast({
        title: "File Downloaded",
        description: `${fileName} has been downloaded successfully.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Decrypt Medical Data</h1>
        <p className="text-muted-foreground">
          Securely decrypt your encrypted medical information using the original encryption key.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <KeyRound className="h-5 w-5 mr-2 text-primary" />
            Decryption Key
          </CardTitle>
          <CardDescription>Enter the key that was used to encrypt your data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Enter decryption key" 
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Encrypted Data</CardTitle>
          <CardDescription>
            Paste the AES encrypted data that you want to decrypt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea
              placeholder="Paste encrypted data here..."
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value)}
              className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleDecrypt} 
            disabled={!encryptedText || !encryptionKey || isDecrypting}
            className="mr-2"
          >
            {isDecrypting ? 
              "Decrypting..." : 
              <>
                <Unlock className="h-4 w-4 mr-2" />
                Decrypt Data
              </>
            }
          </Button>
        </CardFooter>
      </Card>
      
      {decryptionResult && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-accent" />
              Decryption Results
            </CardTitle>
            <CardDescription>
              Your data has been successfully decrypted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {decryptionResult.isFile ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Decrypted File</h3>
                      <p className="text-sm text-muted-foreground">
                        Type: {decryptionResult.fileType || "Unknown"}
                      </p>
                    </div>
                    <Button onClick={downloadDecryptedFile}>
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                  
                  {decryptionResult.data.startsWith('data:image/') && (
                    <div className="border rounded-md p-3 flex justify-center bg-muted/30">
                      <img 
                        src={decryptionResult.data} 
                        alt="Decrypted image" 
                        className="max-h-60 object-contain"
                      />
                    </div>
                  )}
                  
                  {decryptionResult.data.startsWith('data:text/csv') && (
                    <div className="border rounded-md p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium">CSV File Preview</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        CSV file detected. Download to view the contents.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Decrypted Text</h3>
                  </div>
                  <div className="p-3 rounded-md border bg-muted/30 overflow-auto max-h-60">
                    <p className="whitespace-pre-wrap">{decryptionResult.data}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          For maximum security, never share your encryption keys over insecure channels. Always verify that you're decrypting data from trusted sources.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Decrypt;
