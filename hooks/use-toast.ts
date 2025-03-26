import * as React from "react";
import { toast } from "@/components/ui/toast";

export function useToast() {
  return React.useMemo(
    () => ({
      toast,
      dismiss: toast.dismiss,
    }),
    []
  );
}