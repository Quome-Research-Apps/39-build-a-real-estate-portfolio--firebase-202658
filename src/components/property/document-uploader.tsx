"use client";

import { UploadCloud, File, X } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

export function DocumentUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors
        ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
        {isDragActive ? (
          <p className="font-semibold text-primary">Drop the files here ...</p>
        ) : (
          <p className="text-muted-foreground">
            Drag & drop some files here, or click to select files
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
            <h4 className="font-medium text-sm">Files to upload:</h4>
            <ul className="space-y-2">
                {files.map(file => (
                    <li key={file.name} className="flex items-center justify-between rounded-md border bg-muted/50 p-2 text-sm">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <File className="h-4 w-4 shrink-0"/>
                            <span className="truncate">{file.name}</span>
                            <span className="text-muted-foreground text-xs shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(file.name)}>
                            <X className="h-4 w-4"/>
                            <span className="sr-only">Remove file</span>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
}
