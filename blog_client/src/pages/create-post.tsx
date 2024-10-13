import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from "../styles/Home.module.css";

const CreatePost = () => {
  // useStateフックは、Reactコンポーネントで状態（state）を管理するために使用
  // useState は、Reactの組み込みフックで、コンポーネントの中で状態を定義するために使用される。引数として初期状態の値を渡し、その値が状態の初期値となります。
  // つまり、useState("") で title に初期値として空の値（空文字列 ""）をセットしておき、その後、ユーザーが入力した値を setTitle を使って更新する仕組み
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // e は、イベントオブジェクトを表す。フォームが送信されたときの「イベント情報」が渡さる。
  // FormEvent は、TypeScriptの型で、特にフォーム送信イベントに関連するオブジェクトを表す。
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(title,content);
  };

  return (
  <div className={styles.container}>
    <h1 className={styles.title}>ブログ新規登録</h1>
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>タイトル</label>
      {/* onChange イベントが、ユーザーがフォームに入力するたびに発生します。入力フィールドの値が変更されるたびに、その値（e.target.value）が setTitle または setContent 関数に渡され、対応する状態（title または content）が更新されます。 */}
      {/* e.target.value は、ユーザーが入力した値です。onChange イベントハンドラーの中で、この値を setTitle に渡すことで、title の状態が更新されます。 */}
      {/* ChangeEvent:フォーム要素（例えば、<input> や <textarea>）の値が変更されたときに発生するイベントの型 */}
      {/* <HTMLInputElement>:この部分は、ChangeEvent がどのHTML要素に対するイベントなのかを指定 */}
      <input type="text" className={styles.input} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
      <label className={styles.label}>本文</label>
      <textarea className={styles.textarea} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
        <button type="submit" className={styles.button}>投稿</button>
    </form>
  </div>
  );
}

export default CreatePost
