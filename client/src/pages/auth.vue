<script setup lang="ts">
import type { LoginFormData, SignupFormData } from "@/types/auth";

const router = useRouter();

const isLogin = ref(true);
const isLoading = ref(false);
const errorMessage = ref("");

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  errorMessage.value = "";
};

const handleLogin = async (values: LoginFormData) => {
  isLoading.value = true;
  errorMessage.value = "";

  await signIn.email(values, {
    onSuccess: () => {
      router.push("/");
    },
    onError: (ctx) => {
      errorMessage.value = ctx.error.message || "Sign in failed";
      console.error("Login error:", ctx.error);
    },
  });

  isLoading.value = false;
};

const handleSignup = async (values: SignupFormData) => {
  isLoading.value = true;
  errorMessage.value = "";

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
        errorMessage.value = ctx.error.message || "Sign up failed";
        console.error("Signup error:", ctx.error);
      },
    },
  );

  isLoading.value = false;
};

const onGoogleAuth = async () => {
  try {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch (error) {
    errorMessage.value = "Google authentication failed";
    console.error("Google auth error:", error);
  }
};

const onGithubAuth = async () => {
  try {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  } catch (error) {
    errorMessage.value = "GitHub authentication failed";
    console.error("GitHub auth error:", error);
  }
};
</script>

<template>
  <div
    class="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
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
          <!-- Forms -->
          <Transition v-bind="formSwitchTransition" mode="out-in">
            <LoginForm v-if="isLogin" :loading="isLoading" @login="handleLogin" />
            <SignupForm v-else :loading="isLoading" @signup="handleSignup" />
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
            <Button variant="outline" type="button" :disabled="isLoading" @click="onGithubAuth">
              <GitHub class="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>

            <Button variant="outline" type="button" :disabled="isLoading" @click="onGoogleAuth">
              <Google class="mr-2 h-4 w-4" />
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

        <!-- Error Message with Fly Transition -->
        <Transition v-bind="flyTransition">
          <div v-if="errorMessage" class="rounded-md border border-red-200 bg-red-50 p-4">
            <div class="flex">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
