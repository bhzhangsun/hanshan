<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'

// @ts-ignore
import Demo from "./components/Demo.vue";
import { a_string, a_input, sample } from "./amis.config";
import { b_string, b_input } from "./builder.config";
import { testFunction } from "./test/__state.test";
testFunction();
</script>

<template>
  <Demo :amisConfig="a_string" :builderConfig="b_string"></Demo>
  <Demo :amisConfig="sample" :builderConfig="b_input"></Demo>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
