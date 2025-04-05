
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { encryptData, fileToBase64, generateSHA512Hash } from "@/utils/cryptoUtils";
import { AlertCircle, Copy, FileImage, FileText, Lock, ShieldCheck, Upload } from "lucide-react";

type EncryptionType = 'text' | 'file';

const Encrypt = () => {
  const [encryptionKey, setEncryptionKey] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [hashData, setHashData] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleEncrypt = async (type: EncryptionType) => {
    if (!encryptionKey) {
      toast({
        title: "Encryption Key Required",
        description: "Please enter an encryption key before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    try {
      let dataToEncrypt = "";
      let fileName = "";

      if (type === 'text') {
        if (!plaintext) {
          toast({
            title: "Text Required",
            description: "Please enter text to encrypt.",
            variant: "destructive",
          });
          setIsEncrypting(false);
          return;
        }
        dataToEncrypt = plaintext;
      } else if (type === 'file') {
        if (!file) {
          toast({
            title: "File Required",
            description: "Please select a file to encrypt.",
            variant: "destructive",
          });
          setIsEncrypting(false);
          return;
        }
        fileName = file.name;
        dataToEncrypt = await fileToBase64(file);
      }

      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 500));

      // Encrypt the data
      const encrypted = encryptData(dataToEncrypt, encryptionKey);
      const hash = generateSHA512Hash(dataToEncrypt);
      
      setEncryptedData(encrypted);
      setHashData(hash);

      toast({
        title: "Encryption Successful",
        description: type === 'text' ? "Text encrypted successfully." : `File "${fileName}" encrypted successfully.`,
      });
    } catch (error) {
      console.error("Encryption error:", error);
      toast({
        title: "Encryption Failed",
        description: "An error occurred during encryption. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create a preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard successfully.`,
      });
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Encrypt Medical Data</h1>
        <p className="text-muted-foreground">
          Securely encrypt sensitive medical information using AES encryption and SHA-512 hashing.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Encryption Key</CardTitle>
          <CardDescription>Enter a strong key that will be used to encrypt and later decrypt your data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Enter encryption key" 
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              className="max-w-md"
            />
            <p className="text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              Remember this key! Without it, you won't be able to decrypt your data.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="text">
            <FileText className="h-4 w-4 mr-2" />
            Text Data
          </TabsTrigger>
          <TabsTrigger value="file">
            <FileImage className="h-4 w-4 mr-2" />
            File Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Encrypt Text</CardTitle>
              <CardDescription>
                Encrypt text data like patient notes, medical records, or any sensitive information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  placeholder="Enter text to encrypt..."
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleEncrypt('text')} 
                disabled={!plaintext || !encryptionKey || isEncrypting}
                className="mr-2"
              >
                {isEncrypting ? 
                  "Encrypting..." : 
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Encrypt Text
                  </>
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>Encrypt File</CardTitle>
              <CardDescription>
                Encrypt medical image files, CSV data files, or other medical documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={triggerFileInput}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,.csv,.xlsx"
                  />
                  {file ? (
                    <div className="space-y-3">
                      <Badge variant="outline" className="py-1">
                        {file.type || "Unknown type"}
                      </Badge>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                      {filePreview && (
                        <div className="w-full flex justify-center mt-2">
                          <img 
                            src={filePreview} 
                            alt="Preview" 
                            className="max-h-48 max-w-full rounded-md object-contain" 
                          />
                        </div>
                      )}
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setFilePreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}>
                        Change File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">
                        Supports images, CSV files (max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleEncrypt('file')} 
                disabled={!file || !encryptionKey || isEncrypting}
              >
                {isEncrypting ? 
                  "Encrypting..." : 
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Encrypt File
                  </>
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {encryptedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
              Encryption Results
            </CardTitle>
            <CardDescription>
              Your data has been encrypted. Copy the encrypted data or hash to share securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">AES Encrypted Data</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => copyToClipboard(encryptedData, 'Encrypted data')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy encrypted data</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="p-3 rounded-md bg-muted overflow-auto max-h-32 code-container">
                  <code className="text-xs break-all whitespace-pre-wrap">{encryptedData}</code>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">SHA-512 Hash</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => copyToClipboard(hashData, 'SHA-512 hash')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy SHA-512 hash</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="p-3 rounded-md bg-muted overflow-auto max-h-32 code-container">
                  <code className="text-xs break-all whitespace-pre-wrap">{hashData}</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Security Information</AlertTitle>
        <AlertDescription>
          This tool demonstrates encryption and hashing techniques for educational purposes. In a real medical environment, additional security measures would be implemented including secure key management and HIPAA-compliant storage.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Encrypt;
