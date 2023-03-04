<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TreeViewComponent from "./TreeViewComponent.vue";
import { treeDataAdd, getTreeList, test as aaa } from "./Tree";

const route = useRoute();

let obj = ref([]);
let name = ref("");
let settingId = ref("");
let selected = ref({ id: "", name: "", child: [] });
let items = ref([]);

const add = () => {
  let sId = settingId.value;
  let sName = name.value;
  let data = { id: sId, name: sName, child: [] };
  let parentObjectId = String(selected.value.id);
  let o = treeDataAdd(parentObjectId, JSON.stringify(obj.value), data);

  obj.value = o;

  console.log("object↓");
  console.log(obj.value);

  items = ref(getTreeList(o));
};

const test = () => {
  aaa(obj);
};

onMounted(() => {
  const query = route.query;
  items.value.push({ id: query.number, name: query.name, child: [] });
  obj.value.push({ id: query.number, name: query.name, child: [] });
  selected = ref({ id: query.number, name: query.name, child: [] });
  console.log(obj);
});
</script>
<template>
  <div>
    <TreeViewComponent :data1="obj" :key="items"></TreeViewComponent>
    <v-select
      v-model="selected"
      label="対象の子ノードに下記要素を追加"
      :items="items"
      item-title="name"
      item-value="id"
      return-object
    ></v-select>
    <v-text-field label="追加要素" v-model="name"></v-text-field>
    <v-text-field label="追加要素ID" v-model="settingId"></v-text-field>

    <v-btn @click="add">追加</v-btn>
    <v-btn @click="test">test</v-btn>
  </div>
</template>
