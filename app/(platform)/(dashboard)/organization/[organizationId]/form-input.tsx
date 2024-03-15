"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: Record<string, any>;
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col space-y-2">
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />

      {errors?.title ? (
        <div className="pb-2">
          {errors.title.map((error: string) => (
            <p key={error} className="text-rose-500 text-sm">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
