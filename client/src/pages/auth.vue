<script setup lang="ts">
import { FormField } from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const isLogin = ref(true);

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
);

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

const { handleSubmit: handleLoginSubmit, resetForm: resetLoginForm } = useForm({
  validationSchema: loginSchema,
  validateOnMount: false,
});

const { handleSubmit: handleSignupSubmit, resetForm: resetSignupForm } = useForm({
  validationSchema: signupSchema,
  validateOnMount: false,
});

const onLoginSubmit = handleLoginSubmit((values) => {
  console.log("Login:", values);
});

const onSignupSubmit = handleSignupSubmit((values) => {
  console.log("Signup:", values);
});

const toggleMode = async () => {
  isLogin.value = !isLogin.value;
  await nextTick();
  resetLoginForm();
  resetSignupForm();
};

const onGoogleAuth = () => {
  console.log("Google OAuth");
};

const onGithubAuth = () => {
  console.log("GitHub OAuth");
};
</script>

<template>
  <div
    class="relative container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <!-- Left Column - Hero/Branding -->
    <div class="relative hidden h-full flex-col p-10 text-white lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Your App
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            "This library has saved me countless hours of work and helped me deliver stunning
            designs to my clients faster than ever before."
          </p>
          <footer class="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>

    <!-- Right Column - Auth Form -->
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]">
        <!-- Header -->
        <div class="flex flex-col space-y-4 text-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ isLogin ? "Welcome to Your App" : "Create your account" }}
            </h1>
            <p class="mt-2 text-sm text-gray-600">
              {{ isLogin ? "Don't have an account? " : "Already have an account? " }}
              <button
                type="button"
                @click="toggleMode"
                class="text-gray-900 underline hover:no-underline"
              >
                {{ isLogin ? "Sign up" : "Sign in" }}
              </button>
            </p>
          </div>
        </div>

        <!-- Auth Form Card -->
        <div class="grid gap-6">
          <!-- Login Form -->
          <Transition v-bind="formSwitchTransition" mode="out-in">
            <form v-if="isLogin" key="login" class="space-y-4" @submit="onLoginSubmit">
              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel class="text-sm font-medium text-gray-700"> Email </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormLabel class="text-sm font-medium text-gray-700"> Password </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <Button
                type="submit"
                class="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
              >
                Login
              </Button>
            </form>

            <!-- Signup Form -->
            <form v-else key="signup" class="space-y-4" @submit="onSignupSubmit">
              <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                  <FormLabel class="text-sm font-medium text-gray-700"> Full Name </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel class="text-sm font-medium text-gray-700"> Email </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormLabel class="text-sm font-medium text-gray-700"> Password </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="confirmPassword">
                <FormItem>
                  <FormLabel class="text-sm font-medium text-gray-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <Button
                type="submit"
                class="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
              >
                Create Account
              </Button>
            </form>
          </Transition>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500"> Or </span>
            </div>
          </div>

          <!-- OAuth Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              class="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              @click="onGithubAuth"
            >
              <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Continue with GitHub
            </Button>

            <Button
              variant="outline"
              type="button"
              class="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              @click="onGoogleAuth"
            >
              <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-xs text-gray-500">
            By clicking continue, you agree to our
            <a href="#" class="text-gray-700 underline hover:no-underline"> Terms of Service </a>
            and
            <a href="#" class="text-gray-700 underline hover:no-underline"> Privacy Policy </a>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
