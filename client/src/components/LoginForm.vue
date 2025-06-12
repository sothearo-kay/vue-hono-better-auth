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

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
);

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: loginSchema,
  validateOnMount: false,
});

const onSubmit = handleSubmit(async (values) => {
  emit("update:loading", true);
  emit("error", "");

  await signIn.email(
    {
      email: values.email,
      password: values.password,
    },
    {
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        emit("error", ctx.error.message || "Sign in failed");
        console.error("Login error:", ctx.error);
      },
    },
  );

  emit("update:loading", false);
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

    <Button type="submit" :disabled="isLoading" class="w-full">
      <Spinner v-if="isLoading" class="mr-2 -ml-1 h-4 w-4 text-white" />
      {{ isLoading ? "Signing in..." : "Login" }}
    </Button>
  </form>
</template>
