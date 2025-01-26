import { cn } from "@/lib/utils";
import { Input, InputProps, Textarea, TextAreaProps } from "@heroui/react";
import React, { ReactNode } from "react";

export function CustomFormLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex flex-col lg:!flex-row justify-between p-[3.90625vw] lg:!py-[30px] lg:!px-[20px] border-b"
    >
      {children}
    </label>
  );
}

export function CustomFormDt({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between items-center font-bold text-[3.38542vw] lg:!text-xl text-justify tracking-[.04em] leading-6 uppercase w-[27.34375vw] lg:!w-[283px] mb-[2vw] lg:!mb-0">
      {children}
    </div>
  );
}

export interface CustomFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CustomFormInput = React.forwardRef<
  HTMLInputElement,
  CustomFormInputProps & InputProps
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "text-[3.38542vw] lg:!text-base w-full h-fit py-[1.5625vw] px-[2.34375vw] lg:!py-[18px] lg:!px-[15px] rounded-[1.30208vw] lg:!rounded-[10px]",
        className
      )}
      {...props}
    />
  );
});
CustomFormInput.displayName = "CustomFormInput";
export { CustomFormInput };

export interface CustomFormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CustomFormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomFormTextareaProps & TextAreaProps
>(({ className, size, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        "text-[3.38542vw] lg:!text-base w-full h-fit py-[1.5625vw] px-[2.34375vw] lg:!py-[18px] lg:!px-[15px] rounded-[1.30208vw] lg:!rounded-[10px]",
        className
      )}
      {...props}
    />
  );
});
CustomFormTextarea.displayName = "CustomFormTextarea";
export { CustomFormTextarea };
