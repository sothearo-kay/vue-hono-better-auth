<script setup lang="ts">
import { toast } from "vue-sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const router = useRouter();
const session = useSession();
const isLoading = ref(false);

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const handleLogout = async () => {
  isLoading.value = true;

  await signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push(`${import.meta.env.VITE_BASE_URL}/auth`);
      },
      onError: (context) => {
        console.error("Logout error:", context.error);
        toast.error("Failed to logout. Please try again.");
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
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Welcome Home</h1>

        <!-- Logout Button - only show if user is logged in -->
        <div v-if="session.data?.user">
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
      <div v-if="session.data?.user" class="mb-6 rounded-lg border bg-white p-6 shadow-sm">
        <div class="flex items-start space-x-4">
          <!-- Avatar -->
          <Avatar size="base">
            <AvatarImage
              :src="session.data.user.image || ''"
              :alt="`${session.data.user.name}'s avatar`"
            />
            <AvatarFallback>
              {{ getInitials(session.data.user.name || "User") }}
            </AvatarFallback>
          </Avatar>

          <!-- User Details -->
          <div class="flex-1">
            <div class="mb-2 flex items-center space-x-2">
              <h2 class="text-xl font-semibold text-gray-900">{{ session.data.user.name }}</h2>
              <Badge v-if="session.data.user.role" variant="secondary" class="capitalize">
                {{ session.data.user.role }}
              </Badge>
            </div>
            <p class="mb-1 text-gray-600">{{ session.data.user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
