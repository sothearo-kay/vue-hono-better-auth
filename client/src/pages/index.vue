<script setup lang="ts">
import { signOut, useSession } from "@/lib/auth";

const router = useRouter();
const { data: session } = useSession();
const isLoading = ref(false);

const handleLogout = async () => {
  isLoading.value = true;
  
  await signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push("/auth");
      },
      onError: (context) => {
        console.error("Logout error:", context.error);
      },
    },
  });
  
  isLoading.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome Home</h1>
        
        <!-- Logout Button - only show if user is logged in -->
        <div v-if="session?.user">
          <Button
            variant="outline"
            :disabled="isLoading"
            @click="handleLogout"
            class="flex items-center"
          >
            <Spinner v-if="isLoading" class="mr-2 h-4 w-4" />
            {{ isLoading ? "Signing out..." : "Logout" }}
          </Button>
        </div>
      </div>

      <!-- User Info -->
      <div v-if="session?.user" class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
        <div class="space-y-2">
          <p class="text-gray-600">
            <span class="font-medium">Name:</span> {{ session.user.name }}
          </p>
          <p class="text-gray-600">
            <span class="font-medium">Email:</span> {{ session.user.email }}
          </p>
          <p class="text-gray-600" v-if="session.user.role">
            <span class="font-medium">Role:</span> {{ session.user.role }}
          </p>
        </div>
      </div>

      <!-- Not logged in message -->
      <div v-else class="bg-white rounded-lg shadow-sm border p-6 text-center">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Welcome!</h2>
        <p class="text-gray-600 mb-4">You are not currently logged in.</p>
        <Button @click="router.push('/auth')">
          Sign In
        </Button>
      </div>
    </div>
  </div>
</template>
