import { AddPropertyForm } from "@/components/property/add-property-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddPropertyPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-headline text-3xl font-bold">Add New Property</h1>
        <p className="text-muted-foreground">
          Enter the details of your new property to add it to your portfolio.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Property Information</CardTitle>
          <CardDescription>
            Fill out the form below. All fields are required unless marked optional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddPropertyForm />
        </CardContent>
      </Card>
    </div>
  );
}
