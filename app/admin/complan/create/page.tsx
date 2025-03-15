import ComplanCreateForm from "@/app/admin/complan/create/_components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ComplanCreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new complan</CardTitle>
        <CardDescription>
          Create a new complan for the complan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComplanCreateForm />
      </CardContent>
    </Card>
  );
}
