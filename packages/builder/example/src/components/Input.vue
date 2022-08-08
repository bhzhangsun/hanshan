<script setup lang="ts">
import { reactive } from "vue";

defineProps<{ msg: string }>();

const data = reactive<any>({
  text: "",
});

setTimeout(() => {
  data.append = "hello";
}, 1000);
</script>

<template>
  <div>
    <p>input Text:<input v-model="data.text" /></p>
    <p>input Append Text:<input v-model="data.append" /></p>
    <p>{{ data.append }}</p>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
