<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let select_item = ref({ car_number: "1", car_name: "VELLFIRE" });
const items = [
  { car_number: "1", car_name: "VELLFIRE" },
  { car_number: "2", car_name: "RANDCRUISER" },
  { car_number: "3", car_name: "HIACE" },
];
const nextScreen = () => {
  router.push({
    path: "/tree_create",
    query: {
      number: select_item.value.car_number,
      name: select_item.value.car_name,
    },
  });
};
</script>

<template>
  <div>
    <v-select
      label="製品"
      v-model="select_item"
      :items="items"
      item-title="car_name"
      item-value="car_number"
      :hint="`${select_item.car_name}, ${select_item.car_number}`"
      persistent-hint
      return-object
    ></v-select>
    <v-btn @click="nextScreen">次へ</v-btn>
  </div>
</template>


<style scoped>
</style>
