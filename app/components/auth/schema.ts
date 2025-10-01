// import { z } from "zod/v4";
import * as z from "zod";

export const formSchema = z
  .object({
    email: z.email({ message: "Email non valida" }),
    password: z.string().min(6, { message: "Password non valida" }),
  })
  .required();
