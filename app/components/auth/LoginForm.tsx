import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type React from "react";
import { Form, useNavigation } from "react-router";
// import type { z } from 'zod';
import { formSchema } from "@/components/auth/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ErrorList from "../form/ErrorList";
import { Shell } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [form, fields] = useForm({
    // constraint: getZodConstraint(formSchema),
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
  });

  const navigation = useNavigation();
  const isPending = (provider: string) =>
    navigation.formData?.get("provider") === provider &&
    navigation.state !== "idle";
  const isSignInPending = isPending("sign-in");

  return (
    <div
      className={cn("flex min-w-80 flex-col gap-6 lg:min-w-100", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle>
            <h1 className="font-brutal text-5xl text-brand">Risiko!</h1>
          </CardTitle>
          <CardDescription>
            <h2 className="font-brutal text-5xl text-brand">654 tiro base!</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...getFormProps(form)} method="post">
            <div className="flex flex-col gap-2">
              <label htmlFor={fields.email.id}>Email:</label>
              <Input
                placeholder="la tua email"
                {...getInputProps(fields.email, { type: "email" })}
              />
              {fields.email.errors?.length ? (
                <ErrorList id="email-error" errors={fields.email.errors} />
              ) : null}

              <label htmlFor={fields.password.id}>Password:</label>
              <Input
                placeholder="la tua password"
                {...getInputProps(fields.password, {
                  type: "password",
                })}
              />
              {fields.password.errors?.length ? (
                <ErrorList
                  id="password-error"
                  errors={fields.password.errors}
                />
              ) : null}

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSignInPending}
                >
                  {isSignInPending ? "Accesso in corso..." : "Entra"}
                  {isSignInPending && (
                    <Shell size={24} className="animate-spin" />
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
