<script setup>
import { defineProps, ref } from "vue";
import TreeViewComponent from "@/pages/tree/TreeViewComponent.vue";
const props = defineProps({
  data1: Array,
});

let data = ref(props.data1);
</script>
<template>
  <div>
    <ul v-for="d in data" :key="d.id">
      <li>
        {{ d.name }}
        <TreeViewComponent
          :data1="d.child"
          v-if="d.child.length > 0"
        ></TreeViewComponent>
      </li>
    </ul>
  </div>
</template>
