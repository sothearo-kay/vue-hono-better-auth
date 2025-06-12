<script setup lang="ts">
import { ErrorMessage } from "vee-validate";
import { useFormField } from "./useFormField";

const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage
    as="p"
    :id="formMessageId"
    :name="name"
    class="text-destructive text-sm font-medium"
  />
</template>
