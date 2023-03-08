<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TreeViewComponent from "./TreeViewComponent.vue";
import { treeDataAdd, getTreeList } from "./Tree";

const route = useRoute();
let random_key = ref("aasdfdsaf");
let obj = ref([]);
let name = ref("");
let settingId = ref("");
let selected = ref({ id: "", name: "", child: [] });
let items = ref([]);

const add = () => {
  let sId = settingId.value;
  let sName = name.value;
  let data = { id: sId, name: sName, child: [] };

  //同じ要素があるかチェック
  let flag = true;
  items.value.forEach((element) => {
    if (element.id == sId) {
      //あればフラグをDOWN
      flag = false;
    }
  });

  //同じ要素がない場合オブジェクトに追加処理
  if (flag) {
    let parentObjectId = String(selected.value.id);
    let o = treeDataAdd(parentObjectId, JSON.stringify(obj.value), data);
    obj.value = o;
    items = ref(getTreeList(o));
    random_key.value = Math.random().toString(32).substring(2);
  } else {
    console.log(`ID${sId}は既に存在します。`);
  }
};

const test = () => {
  const o = {
    id: "JUN",
    name: "JUN",
    class: "",
    child: [
      {
        id: "SHOKI",
        name: "SHOKI",
        class: "",
        child: [
          {
            id: "KAEDE",
            name: "KAEDE",
            class: "",
            child: [{ id: "KANON", name: "KANON", child: [] }],
          },
          {
            id: "MEIMI",
            name: "MEIMI",
            class: "",
            child: [{ id: "MAI", name: "MAI", child: [] }],
          },
        ],
      },
      { id: "YOSHIYUKI", name: "YOSHIYUKI", class: "", child: [] },
      { id: "TAKAMITU", name: "TAKAMITU", class: "", child: [] },
    ],
  };
  console.log(obj.value);
  obj = ref([]);
  let b = ref(o);
  obj.value.push(b.value);
  console.log(obj.value);
  random_key.value = Math.random().toString(32).substring(2);
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
    <TreeViewComponent :data1="obj" :key="random_key"></TreeViewComponent>
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
