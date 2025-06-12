<script setup lang="ts">
import { FormField } from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const router = useRouter();

interface Props {
  isLoading: boolean;
}

interface Emits {
  (e: "update:loading", value: boolean): void;
  (e: "error", message: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const signupSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
);

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: signupSchema,
  validateOnMount: false,
});

const onSubmit = handleSubmit(async (values) => {
  emit("update:loading", true);
  emit("error", "");

  await signUp.email(
    {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "USER",
    },
    {
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        emit("error", ctx.error.message || "Sign up failed");
        console.error("Signup error:", ctx.error);
      },
    },
  );

  emit("update:loading", false);
});
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Full Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="John Doe" class="mt-1" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="m@example.com" class="mt-1" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Create a password"
            class="mt-1"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="confirmPassword" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Confirm your password"
            class="mt-1"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" :disabled="isLoading" class="w-full">
      <svg
        v-if="isLoading"
        class="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ isLoading ? "Creating account..." : "Create Account" }}
    </Button>
  </form>
</template>
