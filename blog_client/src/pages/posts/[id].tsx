import React from "react";
import { Post } from "@/types";
import { useRouter } from "next/router";
import styles from "@/styles/Post.module.css";

// Post 型のオブジェクト（post）を props として受け取る
type Props = {
  post: Post;
}

// getStaticPaths 関数は、Next.jsの静的生成（Static Generation）で動的ルート（例えば /posts/[id]）を生成する
export async function getStaticPaths() {
  // posts_controllerのindex アクションが実行され、Post.all でデータベース内のすべての投稿（@posts）を取得し、それをJSON形式でレスポンスとして返す
  const res = await fetch("http://127.0.0.1:3001/api/v1/posts");
  // posts という変数に Post[] 型（Post 型の配列）として格納
  const posts: Post[] = await res.json();

  // posts の各要素を map でループし、params オブジェクトに id を文字列形式で設定
  const paths = posts.map((post) => ({
    params: {id: post.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({params}: {params: {id:string}}) {
  // fetch 関数は、指定されたURLからHTTPリクエストを送り、レスポンスを待ちます。
  // posts_controllerのshow アクションが実行され、Post.find(params[:id]) で指定された id に基づいて特定の投稿（@post）をデータベースから取得し、それをJSON形式で返す
  const res = await fetch(`http://127.0.0.1:3001/api/v1/posts/${params.id}`);
  const post = await res.json();

  console.log(post);

  // return 文で、posts を props オブジェクトとして返します。これにより、コンポーネント内で props.posts として取得したデータを使用することができます。
  return{
    props: {
      post,
    },
    revalidate: 60,
  };
}

const Post = ({ post }: Props) => {
  const router = useRouter()

  if(router.isFallback){
    return <div>Loading...</div>
  }
  return (
  <div className={styles.container}>
    <div className={styles.title}>{post.title}</div>
    <div className={styles.date}>{post.created_at}</div>
    <p className={styles.content}>{post.content}</p>
  </div>
  );
};

export default Post;
