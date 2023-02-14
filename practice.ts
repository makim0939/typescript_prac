//typescriptの基礎。なんか、typescriptというよりjavascript...

//■ typescriptの実行
//packege.jsonを作成    $ yarn init -y
//パッケージをインストール $ yarn add typescript --dev
//tsconfig.jsonを作成   $ yarn run tsc --init 
//ビルド                $ yarn tsc

console.log("takoyaki");

//■ 変数宣言

let a;//初期値なしでの宣言可能。この場合値はundefined
const b = 10;//基本はconstを使うのが良い。

//静的型付けでは後から異なる型の値を代入できない
let num: number = 100;
//num = "takoyaki";//←error


//constはオブジェクトの要素の変更は許す。//オブジェクトは連想配列と違って値に関数を設定できる。
const obj1 = {
    name: "takashi",
    email: "takyashi@takoyaki.tk",
    message: message(),
};
obj1.name = "saburou";
console.log(obj1.name);
console.log(obj1.message);

function message() {
    return "Hello";
};

//stringはプリミティブ型、Stringはオブジェクト
//javascriptではプリミティブ型でもオブジェクトみたいに扱えるからあんま意味ないのかな
const str_obj = new String("takoykai");
const str_prim: string = "takoyaki";
console.log(str_obj);
console.log(str_prim);

//特定の値だけを代入できるリテラル型
let literal: "takoyaki";
//literal = "okonomiyaki"　←エラー
literal = "takoyaki"

//特定の型を指定しないany型
let any: any = "takoykai";
any = 1;


//オブジェクトをletで宣言する場合は事前に型を指定できる。
let obj_annotation : {
    id: number,
    name: string,
};

//読み取り専用
let obj_readonly: {
    readonly id: number
    name: string
};
obj_readonly = {
    id: 1,
    name: "takyashi"
};
//obj_readonly.id = 1 ←エラー
obj_readonly.name = "saburou";

//オブジェクトas constでconst ✖︎ 読み取り専用
const constantAndReadonly = {
    id: 1,
    name: "takyashi",
    email: "takyaki@takoyaki.tk",
}as const;


//● 持たなくてもいいプロパティ(オプションプロパティ)
let obj_optional : {
    id: number,
    name: string,
    hobby?: string
}

obj_optional = {
    id: 1,
    name: "takyashi"
}
console.log(obj_optional)//hobbyプロパティを持たないオブジェクトを作成できる

obj_optional = {
    id: 1,
    name: "takyashi",
    hobby: "guitar"
}
console.log(obj_optional)


//フィールド名を指定せずオブジェクトを作成できる
let obj_index: {
    [key1: string]: number
}

obj_index = {
    "takoyaki": 1,
    "okonomiyaki": 2,
    "taiyaki": 3,
}

//カスタムタイプを作成
type Person = {
    id: number,
    name: string,
    email: string,
    tel: string,
    address: string,
    hobby?: string,
}
//Pickで指定したキーだけ抜き出した型作る
type User = Pick<Person, "id"|"name"|"email">;
let user: User;
user = {
    id: 1,
    name: "takashi",
    email: "takashi@takyoaki.tk"
}

//Omitで指定したキーを除外した型を作る
type UserInfo = Omit<Person, "name"|"email">
let userInfo = {
    id: 1,
    address: "222-2222",
    tel: "090-2222-2222",
    hobby: "tennis"
}
console.log(user, userInfo);

//...で要素を展開
const array1 = [1, 2, 3, 4, 5]
console.log(array1);
console.log(...array1);

//配列の連結
const array2 = [6, 7, 8, 9, 10]
const array12 = [...array1, ...array2]
console.log(array12)

//型アサーション
const value: any = "12345";
const strlen: number = (value as string).length;
console.log(strlen)

// ===== 文 =====

//三項演算子//真の場合と偽の場合で代入する値を分けられる
//条件式？: 真の場合の値:偽の場合の値
const naniyaki = (1<2) ? "takoyaki":"okonomiyaki";
console.log(naniyaki)

//拡張for文
const array = ["a", "b", "c", "d", "e", "f"]

for(const val of array) {
    console.log(val)
}
//array.entries 拡張for文でインデックスを取得
for(const [i, val] of array.entries()) {
    console.log(i + ":" + val)
}


//関数の宣言
function takoyaki(){
    console.log("takoyaki")
}
//関数式
const fn2 = function () {
    console.log("takoyaki")
}
//アロー関数
const fn_arrow = () => {
    console.log("takoyaki")
}

//● 非同期処理//わからんくなってきた...

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Promiseのコンストラクタに渡した関数の中のsetTimeout(5s)")
        resolve('promiseResolve');
      }, 5000);
  });
  
  p.then((value) => {
    console.log("p.then");
    console.log(value)//valueにはresolveが来る
  });
  
//   for(let i=0; i<1000; i++) {
//     console.log("takoyaki")
//   }

//async/await
function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("awaitで指定した関数の中のsetTimeout(3s)")
        resolve('acyncResolve');
      }, 3000);
    });
  }
  
  async function asyncCall() {
    console.log('asyncCallの中のawaitの前');
    const result = await resolveAfter2Seconds();//resolveが帰る
    console.log("asyncCallの中awaitの後");
    console.log(result)
    // Expected output: "resolved"
  }
  
  asyncCall();
