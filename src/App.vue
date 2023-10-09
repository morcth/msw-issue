<script setup>
import { supabase } from "./supabase";
import { ref } from "vue";

const loading = ref(false);

const onSubmit = async () => {
  await supabase.from("todos").insert({ name: "inputValue" });
  await fetch("https://www.google.com");
    // Revalidate the todos table.
    // Ideally you'd use a server state manager that handles
    // this for you, like supabase-query
  const newTodos = await supabase.from("todos").select();
  const { error } = await supabase.auth.signInWithOtp({
      email: "test@test.com",
    });
  //alert('hello');
}
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
  
    <div v-else>
      <div>
        Loaded
      </div>
      <form @submit.prevent="onSubmit">
        <input
          aria-label="Todo name"
        />
        <button>Add todo</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
