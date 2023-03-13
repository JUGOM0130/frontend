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
    let eq_lv_counter = 0;
    tree.value.forEach((e, i) => {
      //セレクトボックスの選択値と配列のidが一致したら要素を保存
      if (e.id == selected.value.id) {
        target = e;
        index = i;
      }
    });
    //同じレベルの要素が何個あるかカウント
    tree.value.forEach((e) => {
      if (e.parentId == target.parentId) {
        eq_lv_counter++;
      }
    });
    console.log(index);
    obj.lv = String(Number(target.lv) + 1);
    obj.parentId = target.id;
    tree.value.splice(index + 1 + eq_lv_counter, 0, obj);
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
    <div class="table_wrappar">
      <table class="table">
        <tr>
          <th>部品名</th>
          <th>名称</th>
          <th>製品名称</th>
          <th>版数</th>
          <th>員数</th>
          <th>母数</th>
          <th>型式</th>
          <th>材質</th>
          <th>内外策</th>
          <th>ステータス</th>
          <th>主要材料費</th>
          <th>補助材料費</th>
          <th>外注加工費</th>
          <th>直接労務費</th>
        </tr>
        <tr v-for="t in tree" :key="t.id">
          <td>
            <div>
              <div class="space" v-for="k in t.lv - 1" :key="k"></div>
              {{ t.name }}
            </div>
          </td>
          <!--
          <td><v-text-field label="名称" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="製品名称" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="版数" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="員数" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="母数" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="型式" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="材質" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="内外作" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="ステータス" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="主要材料費" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="補助材料費" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="外注加工費" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          <td><v-text-field label="直接労務費" hide-details="auto" single-line="true" class="compact_input"></v-text-field></td>
          -->
          <td><input type="text" class="myset_input" placeholder="名称" /></td>
          <td>
            <input type="text" class="myset_input" placeholder="製品名称" />
          </td>
          <td><input type="text" class="myset_input" placeholder="版数" /></td>
          <td><input type="text" class="myset_input" placeholder="員数" /></td>
          <td><input type="text" class="myset_input" placeholder="母数" /></td>
          <td><input type="text" class="myset_input" placeholder="型式" /></td>
          <td><input type="text" class="myset_input" placeholder="材質" /></td>
          <td>
            <input type="text" class="myset_input" placeholder="内外作" />
          </td>
          <td>
            <input type="text" class="myset_input" placeholder="ステータス" />
          </td>
          <td>
            <input type="text" class="myset_input" placeholder="主要材料費" />
          </td>
          <td>
            <input type="text" class="myset_input" placeholder="補助材料費" />
          </td>
          <td>
            <input type="text" class="myset_input" placeholder="外注加工費" />
          </td>
          <td>
            <input type="text" class="myset_input" placeholder="直接労務費" />
          </td>
        </tr>
      </table>
    </div>
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
<style scoped>
.space {
  display: inline-block;
  height: 20px;
  width: 30px;
}

.myset_input {
  width: auto;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  margin-left: 2.5px;
  margin-right: 2.5px;
  margin-top: 2.5px;
}

.table_wrappar {
  grid-area: content;
  overflow: scroll;
  border-style: solid;
  border-width: 1px;
  margin: 5px;
}
.table_wrappar * {
  padding: 0px;
}
.table {
}
.table_wrappar th {
  text-align: center;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-right-style: solid;
  border-bottom-style: solid;
  border-right-color: black;
  border-bottom-color: black;
}

.table th:nth-child(1) {
  width: fit-content;
  min-width: 200px;
  position: sticky;
  left: 0;
  z-index: 2;
  background-color: gainsboro;
}

.table td:nth-child(1) {
  background-color: white;
  width: fit-content + 30px;
  min-width: 200px;
  position: sticky;
  left: 0;
  z-index: 1;

  border-right-style: solid;
  border-right-color: black;
  border-right-width: 1px;

  font-size: 24px;
  vertical-align: middle;
}
</style>
