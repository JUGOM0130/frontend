<script setup>
import { onMounted, ref, defineProps } from "vue";
const props = defineProps({
  root: Array,
});
let tree = ref(props.root);
let selected = ref(tree.value[0]);
let add_id = ref("");
let add_name = ref("");
const treeListSort = () => {
  let new_tree = [];
  //配列オブジェクトにソートをかける
  tree.value.sort((a, b) => a.parentId - b.parentId);
  //配列の並びをツリー形式に見えるように変換
  tree.value.forEach((e) => {
    if (e.parentId > 0) {
      //parentIdが１以上のもの
      let idx = 0;
      new_tree.forEach((el, i) => {
        if (el.id == e.parentId) {
          idx = i;
        }
      });
      new_tree.splice(idx, 0, e);
    } else {
      //ルート要素
      new_tree.unshift(e);
    }
  });
  new_tree = new_tree.reverse();
  tree.value = [];
  new_tree.forEach((e, i) => {
    let obj = e;
    obj.order = i;
    tree.value.push(obj);
  });

  console.log(new_tree);
};
const treeAdd = () => {
  let id = add_id.value;
  let name = add_name.value;
  let flag = true;
  let obj = { id: id, name: name, lv: 0, parentId: 0, order: "" };

  //idが登録されているかチェック
  tree.value.forEach((e) => {
    if (e.id == id) {
      flag = false;
      console.log("既にIDが登録されています");
    }
  });

  //IDの重複が慣れけば配列に追加する
  if (flag) {
    let target = {};
    let index = 0;
    tree.value.forEach((e, i) => {
      //セレクトボックスの選択値と配列のidが一致したら要素を保存
      if (e.id == selected.value.id) {
        target = e;
        index = i;
      }
    });
    console.log(index);
    obj.lv = String(Number(target.lv) + 1);
    obj.parentId = target.id;
    tree.value.splice(index + 1, 0, obj);
    tree.value.forEach((e, i) => {
      e.order = i;
    });
  }
  console.log(tree.value);
};
onMounted(() => {
  treeListSort();
});
</script>
<template>
  <div>
    <table>
      <tr>
        <th>名称</th>
      </tr>
      <tr v-for="t in tree" :key="t.id">
        <td draggable="true">
          <div class="space" v-for="k in t.lv - 1" :key="k"></div>
          {{ t.name }}
        </td>
      </tr>
    </table>
    <v-select
      label="製品"
      v-model="selected"
      :items="tree"
      item-title="name"
      item-value="id"
      :hint="`${selected.name} ,${selected.id}`"
      persistent-hint
      return-object
    >
    </v-select>
    <v-text-field label="追加要素" v-model="add_name"></v-text-field>
    <v-text-field label="追加要素ID" v-model="add_id"></v-text-field>
    <v-btn @click="treeAdd()">追加</v-btn>
  </div>
</template>
<style>
.space {
  display: inline-block;
  height: 20px;
  width: 20px;
}
</style>
