<template>
  <div class="demo">
    <div class="demo-item demo-builder">
      <div class="demo-builder-warper">
        <div ref="builderRef"></div>
      </div>
      <div class="demo-codebox">
        <JsonViewer :value="builderConfig"></JsonViewer>
      </div>
    </div>
    <div class="demo-item demo-amis">
      <div ref="amisRef"></div>
      <div class="demo-codebox">
        <JsonViewer :value="amisConfig"></JsonViewer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createApp, ref, onMounted } from "vue";

import "../../node_modules/amis/sdk/sdk.js";
import "../../node_modules/amis/sdk/sdk.css";
import "../../node_modules/amis/sdk/helper.css";
import "../../node_modules/amis/sdk/iconfont.css";

import { builder } from "../utils/builder";

import JsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";

const builderRef = ref();
const amisRef = ref();

const props = defineProps({
  amisConfig: Object,
  builderConfig: Object,
});

onMounted(() => {
  console.log("ref:", amisRef, builderRef);
  // @ts-ignore
  const amis = amisRequire("amis/embed");
  amis.embed(amisRef.value, props.amisConfig);

  const app = builder(props.builderConfig);
  createApp(app).mount(builderRef.value);
});
</script>

<style lang="less" scoped>
.demo {
  width: 100%;
  display: flex;
  padding: 16px;
  &-item {
    flex: 1;
    margin: 10px;
    padding: 16px 10px;
    position: relative;
    border: solid 1px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    &::before {
      display: inline-block;
      content: "";
      background-color: black;
      color: #ffffff;
      padding: 2px 8px;
      border-radius: 7px 8px 8px 0px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &-builder {
    &-warper {
      padding: 12px;
    }
    &::before {
      content: "builder";
    }
  }
  &-amis {
    &::before {
      content: "amis";
    }
  }
  &-codebox {
    justify-content: start;
    margin-top: auto;
  }
}
.amis-scope,
.amis-scope {
  height: auto;
}
</style>
