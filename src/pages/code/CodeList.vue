<template>
  <div>
    <div class="row g-2">
      <div class="col">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="kind0" id="kind0" value="0" v-model="ctkind" checked />
          <label class="form-check-label" for="kind0"> ALL </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="kind1" id="kind1" value="1" v-model="ctkind" />
          <label class="form-check-label" for="kind1"> XXX-AxxxxZ000 </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="kind2" id="kind2" value="2" v-model="ctkind" />
          <label class="form-check-label" for="kind2"> XXX-AAxxxZ000 </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="kind3" id="kind3" value="3" v-model="ctkind" />
          <label class="form-check-label" for="kind3"> XX-xxxxZ0 </label>
        </div>
      </div>
      <div class="col">
        <input class="form-control" type="text" name="serchword" id="serchword" placeholder="検索キーワード"
          v-model="serchword" />
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in datas" :key="data" v-show="data.isDisplay">
          <th scope="row">{{ data.ctid }}</th>
          <td>{{ data.ctkind }}</td>
          <td>{{ data.cthead }}</td>
          <td>{{ data.ctenumber }}</td>
          <td>{{ data.ctnumber }}</td>
          <td>{{ data.ctfoot }}</td>
          <td>{{ data.format }}</td>
          <td>{{ data.pname }}</td>
          <td>
            <button type="button" class="btn btn-outline-success" @click="moveNextScreen(data)">
              登録・更新
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import constant from "../../const";
export default {
  data() {
    return {
      serchword: "",
      ctkind: 0,
      columns: [
        "ID",
        "種別",
        "ヘッダ",
        "英番号",
        "番号",
        "フッダ",
        "フォーマット",
        "名称",
        "",
      ],
      datas: [
        {
          isDisplay: false,
          ctid: "",
          ctkind: "",
          cthead: "",
          ctenumber: "",
          ctnumber: "",
          ctfoot: "",
          format: "",
          pname: "",
          pid: "",
        },
      ],
    };
  },
  methods: {
    /**
     * コード一覧取得
     */
    getList: function () {
      const TO = constant.BACK_END_IP + "/code_taikei/read/" + this.ctkind;
      axios
        .get(TO)
        .then((req) => {
          const list = req.data;
          this.datas = [];
          for (let i = 0; i < list.length; i++) {
            this.datas.push({
              isDisplay: true,
              ctid: list[i].ctid,
              ctkind: list[i].ctkind,
              cthead: list[i].cthead,
              ctenumber: list[i].ctenumber,
              ctnumber: list[i].ctnumber,
              ctfoot: list[i].ctfoot,
              format: "",
              pname: list[i].pname,
              pid: list[i].pid,
            });
            //登録種別でフォーマットを変える
            if (this.ctkind == 1 || this.ctkind == 3) {
              this.datas[i].format =
                list[i].cthead +
                "-" +
                list[i].ctenumber +
                ("0000" + list[i].ctnumber).slice(-4) +
                list[i].ctfoot;
            } else {
              this.datas[i].format =
                list[i].cthead +
                "-" +
                list[i].ctenumber +
                ("000" + list[i].ctnumber).slice(-3) +
                list[i].ctfoot;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * 詳細画面に遷移する
     */
    moveNextScreen: function (data) {
      console.log(data);
      this.$store.commit("dataset", {
        id: data.ctid,
        cd: data.format,
        parts_id: Number(data.pid),
      });
      this.$router.push({
        path: "/code_data_regist",
      });
    },
    /**
     * 検索ワードと一致するものを検索
     */
    serch: function () {
      this.datas.forEach((e, idx) => {
        //検索ワードと一致するものを検索
        if (this.serchword != "") {
          if (e.pname == null || e.pname == "") {
            e.pname = ""; 
          }
          if (e.pname.indexOf(this.serchword) != -1) {
              this.datas[idx].isDisplay = true;
            } else if (e.format.indexOf(this.serchword) != -1) {
              this.datas[idx].isDisplay = true;
            } else {
              this.datas[idx].isDisplay = false;
          }
        } else {
          this.datas[idx].isDisplay = true;
        }
      });
    },
  },
  /**
   * 変数の状態監視
   * ctkind（ラジオ）に変化があれば一覧を更新する
   */
  watch: {
    ctkind: function () {
      this.getList();
    },
    serchword: function () {
      this.serch();
    },
  },
  /**
   * ライフサイクルフックcreated
   */
  created() {
    this.getList();
  },
};
</script>
