<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { FormField } from "@/components/ui/form";
import type { SignupFormData } from "@/types/auth";

interface Props {
  loading?: boolean;
}

interface Emits {
  (e: "signup", values: SignupFormData): void;
}

const { loading = false } = defineProps<Props>();
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

const onSubmit = handleSubmit((values) => {
  emit("signup", values);
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

    <Button type="submit" :disabled="loading" class="w-full">
      <Spinner v-if="loading" class="mr-2 -ml-1 h-4 w-4 text-white" />
      {{ loading ? "Creating account..." : "Create Account" }}
    </Button>
  </form>
</template>
