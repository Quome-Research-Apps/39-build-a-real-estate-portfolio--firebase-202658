"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DocumentUploader } from "./document-uploader";
import Image from "next/image";

const formSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "A valid zip code is required"),
  purchasePrice: z.coerce.number().positive("Must be a positive number"),
  currentValue: z.coerce.number().positive("Must be a positive number"),
  downPayment: z.coerce.number().positive("Must be a positive number"),
  interestRate: z.coerce.number().min(0).max(100),
  loanTerm: z.coerce.number().int().positive(),
});

export function AddPropertyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "", city: "", state: "", zip: "",
      purchasePrice: 0, currentValue: 0, downPayment: 0,
      interestRate: 0, loanTerm: 30,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Property Added!",
        description: `${values.address} has been added to your portfolio.`,
      });
      router.push("/dashboard");
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Property Details</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-6">
            <div className="space-y-4">
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-6">
                <Image src="https://picsum.photos/600/200" alt="Property" width={600} height={200} className="rounded-lg object-cover w-full h-full" data-ai-hint="house exterior" />
              </div>
              <FormField name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="state" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl><Input placeholder="CA" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="zip" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl><Input placeholder="12345" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="financials" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="purchasePrice" render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
                  <FormControl><Input type="number" placeholder="500000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="currentValue" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Estimated Value</FormLabel>
                  <FormControl><Input type="number" placeholder="650000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="downPayment" render={({ field }) => (
                <FormItem>
                  <FormLabel>Down Payment</FormLabel>
                  <FormControl><Input type="number" placeholder="100000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="interestRate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate (%)</FormLabel>
                  <FormControl><Input type="number" step="0.01" placeholder="3.5" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="loanTerm" render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Loan Term (Years)</FormLabel>
                  <FormControl><Input type="number" placeholder="30" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </TabsContent>
          <TabsContent value="documents" className="pt-6">
              <DocumentUploader />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Property to Portfolio
          </Button>
        </div>
      </form>
    </Form>
  );
}
