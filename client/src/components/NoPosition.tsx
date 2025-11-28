import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

export default function NoPosition() {
  return (
    <Card className="backdrop-blur-sm" data-testid="card-no-position">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Circle className="h-4 w-4 text-muted-foreground" />
          Current Position
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Circle className="h-16 w-16 mb-4 opacity-50 animate-pulse" />
          <p className="text-lg font-medium">No open position</p>
          <p className="text-sm">Waiting for confluence signal</p>
        </div>
      </CardContent>
    </Card>
  );
}
