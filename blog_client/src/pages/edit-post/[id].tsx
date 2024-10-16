import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from "../../styles/Home.module.css";
import { useRouter } from 'next/router';
import axios from 'axios';
import Post from '../posts/[id]';


// Post 型のオブジェクト（post）を props として受け取る
type Props = {
  post: Post;
};

// getServerSideProps: サーバーサイドでのみ実行されるNext.jsの関数で、クライアントがページにアクセスした際に、そのリクエストのたびに実行され、ページのデータを動的に取得

export async function getServerSideProps(context: any) {
  const id = context.params.id;

  const res = await fetch(`http://127.0.0.1:3001/api/v1/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}



const EditPost = ({post}):Props => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  // e は、イベントオブジェクトを表す。フォームが送信されたときの「イベント情報」が渡さる。
  // FormEvent は、TypeScriptの型で、特にフォーム送信イベントに関連するオブジェクトを表す。
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(title,content);

    // APIを叩く
    try {
      // axios.postでurlにpostリクエストを送る(title と content のデータを一緒に送る)
      await axios.put(`http://localhost:3001/api/v1/posts/${post.id}`,{
        title: title,
        content: content,
      });

      router.push("/")
    } catch (err) {
      alert("編集に失敗しました");

    }
  };

  return (
  <div className={styles.container}>
    <h1 className={styles.title}>ブログの編集</h1>
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>タイトル</label>
      {/* onChange イベントが、ユーザーがフォームに入力するたびに発生します。入力フィールドの値が変更されるたびに、その値（e.target.value）が setTitle または setContent 関数に渡され、対応する状態（title または content）が更新されます。 */}
      {/* e.target.value は、ユーザーが入力した値です。onChange イベントハンドラーの中で、この値を setTitle に渡すことで、title の状態が更新されます。 */}
      {/* ChangeEvent:フォーム要素（例えば、<input> や <textarea>）の値が変更されたときに発生するイベントの型 */}
      {/* <HTMLInputElement>:この部分は、ChangeEvent がどのHTML要素に対するイベントなのかを指定 */}
      <input type="text" className={styles.input} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} value={title}/>
      <label className={styles.label}>本文</label>
      <textarea className={styles.textarea} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} value={content}/>
        <button type="submit" className={styles.button}>編集</button>
    </form>
  </div>
  );
}

export default EditPost
