import { redirect } from "react-router";
import { toast } from "sonner";
import { LoginForm } from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import type { Route } from "./+types/signin";
import {
  FormProvider,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type React from "react";
import { Form, useNavigation } from "react-router";
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
import ErrorList from "@/components/form/ErrorList";
import { Shell } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session?.user) {
    return redirect("/leaderboard");
  }

  return {};
}

// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const formData = await request.clone().formData();
//   const submission = parseWithZod(formData, { schema: formSchema });

//   if (submission.status !== "success") {
//     return toast.error("Invalid form data.");
//   }

//   const { email, password } = submission.value;
//   const { error } = await authClient.signIn.email({
//     email,
//     password,
//   });

//   if (error) {
//     return toast.error(error.message || "Sign in failed.");
//   }

//   return redirect("/leaderboard");
// }

export default function SignIn({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    // constraint: getZodConstraint(formSchema),
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
    defaultValue: {
      email: "",
      password: "",
    },
  });

  const navigation = useNavigation();
  const isPending = (provider: string) =>
    navigation.formData?.get("provider") === provider &&
    navigation.state !== "idle";
  const isSignInPending = isPending("sign-in");

  return (
    <div
      className={cn(
        "flex h-full min-h-screen w-full items-center justify-center",
        'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat',
      )}
    >
      {/*<LoginForm className="mx-auto max-w-7xl" />*/}
      <div
        className={cn(
          "flex min-w-80 flex-col gap-6 lg:min-w-100",
          "mx-auto max-w-7xl",
        )}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle>
              <h1 className="font-brutal text-5xl text-brand">Risiko!</h1>
            </CardTitle>
            <CardDescription>
              <h2 className="font-brutal text-5xl text-brand">
                654 tiro base!
              </h2>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider context={form.context}>
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
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
