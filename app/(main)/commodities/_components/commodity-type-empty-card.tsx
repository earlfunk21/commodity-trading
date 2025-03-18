import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommodityTypeEmptyCard() {
  return (
    <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle>
          <div className="h-6 w-32 rounded" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {/* Last Price Card */}
          <div className="rounded-xl p-3">
            <div className="mb-1 h-4" />
            <div className="h-4 w-16 rounded" />
          </div>

          {/* Change Card */}
          <div className="rounded-xl p-3">
            <div className="mb-1.5 h-4" />
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full" />
              <div className="h-4 w-12 rounded" />
            </div>
          </div>

          {/* Volume Card */}
          <div className="rounded-xl p-3">
            <div className="mb-1 h-4" />
            <div className="h-4 w-16 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
