/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IErrorResponse } from "@/types";
import { toast } from "sonner";

export const handleApiError = (err: any, toastId?: string) => {
  const error: IErrorResponse = err?.data || err;

  if (error?.errorSources && error.errorSources.length > 0) {
    error.errorSources.forEach((e) => {
      toast.error(`${e.path}: ${e.message}`, { id: toastId });
    });
  } else if (error?.message) {
    toast.error(error.message, { id: toastId });
  } else {
    toast.error("Something went wrong", { id: toastId });
  }
};
