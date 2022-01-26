/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import imageUrlBuilder from "@sanity/image-url";
export default function Home({ posts, projectId, dataset }) {
  const [mappedPosts, setMappedPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId,
      dataset,
    });
    setMappedPosts(
      posts.map((post) => ({
        ...post,
        mainImage: imgBuilder.image(post.mainImage).width(500).height(250),
      }))
    );
  }, [posts]);
  console.log(posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Keplogs</title>
        <meta name="description" content="Keplalabs blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {mappedPosts.length ? (
          mappedPosts.map((post, i) => (
            <div
              onClick={() => router.push(`/post/${post.slug.current}`)}
              key={i}
              className={styles.post}
            >
              <a>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <img
                  src={post.mainImage}
                  className={styles.postImage}
                  alt={post.title}
                />
              </a>
            </div>
          ))
        ) : (
          <div>
            <h2>No Posts yet</h2>
          </div>
        )}
      </main>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const query = encodeURIComponent(`*[_type=="post"]`);
  const projectId = process.env.PROJECT_ID;
  const dataset = process.env.PROJECT_DATASET;
  const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${query}`;
  const resp = await fetch(url).then((res) => res.json());
  const posts = resp.result;
  if (!posts || !posts.length) {
    return {
      props: {
        posts: [],
        projectId: process.env.PROJECT_ID,
        dataset: process.env.PROJECT_DATASET,
      },
    };
  } else {
    return {
      props: {
        posts: posts,
        projectId,
        dataset,
      },
    };
  }
};
