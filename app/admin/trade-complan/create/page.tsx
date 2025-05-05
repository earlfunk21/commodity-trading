import TradeComplanCreateForm from "@/app/admin/trade-complan/create/_components/create-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TradeComplanCreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Trade Complan</CardTitle>
        <CardDescription>
          Create a new trade complan for the trading.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TradeComplanCreateForm />
      </CardContent>
    </Card>
  );
}
