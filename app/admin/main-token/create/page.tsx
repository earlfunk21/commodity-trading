import MainTokenCreateForm from "@/app/admin/main-token/create/_components/create-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MainTokenCreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Main Token</CardTitle>
        <CardDescription>
          Create a new main token for the pooling.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MainTokenCreateForm />
      </CardContent>
    </Card>
  );
}
