import { ref, Ref, $ref } from 'vue/reactivity';

function useState(initValue: unknown): Ref<unknown> {
  return ref(initValue);
}
