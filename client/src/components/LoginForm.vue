<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { FormField } from "@/components/ui/form";
import type { LoginFormData } from "@/types/auth";

interface Props {
  loading?: boolean;
}

interface Emits {
  (e: "login", values: LoginFormData): void;
}

const { loading = false } = defineProps<Props>();
const emit = defineEmits<Emits>();

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
);

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: loginSchema,
  validateOnMount: false,
});

const onSubmit = handleSubmit((values) => {
  emit("login", values);
});
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
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
            placeholder="Enter your password"
            class="mt-1"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" :disabled="loading" class="w-full">
      <Spinner v-if="loading" class="mr-2 -ml-1 h-4 w-4 text-white" />
      {{ loading ? "Signing in..." : "Login" }}
    </Button>
  </form>
</template>
