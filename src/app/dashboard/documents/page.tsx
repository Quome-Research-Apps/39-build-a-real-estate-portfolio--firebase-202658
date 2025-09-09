import { DocumentUploader } from "@/components/property/document-uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const documents = [
  {
    name: "Lease Agreement - Unit 1A.pdf",
    property: "123 Maple St",
    date: "2023-08-15",
    size: "1.2 MB",
  },
  {
    name: "Purchase Deed - 456 Oak Ave.pdf",
    property: "456 Oak Ave",
    date: "2021-03-20",
    size: "5.6 MB",
  },
  {
    name: "Insurance Policy 2024.pdf",
    property: "123 Maple St",
    date: "2024-01-10",
    size: "850 KB",
  },
  {
    name: "HVAC Repair Invoice.pdf",
    property: "456 Oak Ave",
    date: "2023-11-05",
    size: "300 KB",
  },
];

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground">
          Manage all your important property documents in one place.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">All Documents</CardTitle>
              <CardDescription>
                A list of all your uploaded documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Property</TableHead>
                    <TableHead className="hidden md:table-cell">Date Added</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{doc.property}</TableCell>
                      <TableCell className="hidden md:table-cell">{doc.date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Upload New Document</CardTitle>
              <CardDescription>
                Drag and drop a file or click to select.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentUploader />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
