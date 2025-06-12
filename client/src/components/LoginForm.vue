<script setup lang="ts">
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { signIn } from "@/lib/auth";
import { useRouter } from "vue-router";
import * as z from "zod";

const router = useRouter();

interface Props {
  isLoading: boolean;
}

interface Emits {
  (e: 'update:loading', value: boolean): void;
  (e: 'error', message: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
  validateOnMount: false,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    emit('update:loading', true);
    emit('error', "");
    
    const result = await signIn.email({
      email: values.email,
      password: values.password,
    });

    if (result.error) {
      emit('error', result.error.message || "Sign in failed");
    } else {
      router.push("/");
    }
  } catch (error) {
    emit('error', "An unexpected error occurred");
    console.error("Login error:", error);
  } finally {
    emit('update:loading', false);
  }
});
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="m@example.com"
            class="mt-1"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
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
      {{ isLoading ? "Signing in..." : "Login" }}
    </Button>
  </form>
</template>