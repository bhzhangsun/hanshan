<script setup lang="ts">
import { reactive } from "vue";

const data = reactive<any>({
  text: "",
});

const states = {
  s: <any>[],
  idx: 0, // 下一状态位置，idx-1为当前状态位置
  pop() {
    if (this.idx > 0) {
      this.idx--;
    }
    console.log("pop:", this.s[this.idx - 1]);
    return this.s[this.idx - 1];
  },
  next() {
    if (this.idx < this.s.length) {
      this.idx++;
    }
    return this.s[this.idx - 1];
  },
  add(st: any) {
    this.s = [...this.s.slice(0, this.idx), st];
    this.idx++;
  },
  set(idx: number) {
    return this.s[this.idx];
  },
  clear() {
    this.idx = 0;
    this.s = [];
  },
};

const handleChange = (e) => {
  console.log("data:", e.target.value);
  states.add(e.target.value); // 状态更改后记录状态，放在行为触发时手动记录。 不建议放在响应式状态的计算属性里，自动添加，撤销或者前进可能再次导致text发生更改进而触发记录
};

const back = () => {
  data.text = states.pop();
};

const forward = () => {
  data.text = states.next();
};
const reset = () => {
  states.clear();
  data.text = "";
};
</script>

<template>
  <div>
    <p>input Text:<input v-model="data.text" @change="handleChange" /></p>
    <button @click="back">回退</button>
    <button @click="forward">前进</button>
    <button @click="reset">重置</button>
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
