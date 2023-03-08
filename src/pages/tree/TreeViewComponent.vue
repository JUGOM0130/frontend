<script setup>
import { defineProps, ref } from "vue";
import TreeViewComponent from "@/pages/tree/TreeViewComponent.vue";

const props = defineProps({
  data1: Array,
});
let style = ref(["style-none"]);
let data = ref(props.data1);

const over = (e) => {
  style.value[0] = "style";
  console.log(`over : ${style.value[0]}  e : ${e}`);
  console.log(e);
  console.log(e.target);
};
const leave = () => {
  style.value[0] = "style-none";
};
</script>
<template>
  <div>
    <ul v-for="d in data" :key="d.id">
      <li class="item" draggable="true">
        <div @dragenter="over" @dragleave="leave" :class="style">
          {{ d.name }}
        </div>
      </li>

      <TreeViewComponent
        :data1="d.child"
        v-if="d.child.length > 0"
      ></TreeViewComponent>
    </ul>
  </div>
</template>

<style>
.item {
  background-color: aquamarine;
  margin-top: 5px;
  margin-bottom: 5px;
}
.style {
  background-color: red;
}
.style-none {
  background-color: beige;
}
</style>
