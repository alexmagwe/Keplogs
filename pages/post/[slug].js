/* eslint-disable @next/next/no-img-element */
import imageUrlBuilder from "@sanity/image-url";
import { useState, useEffect } from "react";
import styles from "../../styles/post.module.css";
import BlockContent from "@sanity/block-content-to-react";
export const Post = ({ title, body, image, projectId, dataset }) => {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId,
      dataset,
    });
    setImageUrl(imgBuilder.image(image));
  }, [image]);
  return (
    <div className={styles.main}>
      <h1 className={styles.mainTitle}>{title}</h1>
      {imageUrl && (
        <img className={styles.mainImage} src={imageUrl} alt="loading..." />
      )}
      <BlockContent blocks={body} />
    </div>
  );
};
export const getServerSideProps = async (ctx) => {
  const projectId = process.env.PROJECT_ID;
  const dataset = process.env.PROJECT_DATASET;
  const postSlug = ctx.query.slug;
  if (!postSlug) {
    return {
      notFound: true, //404 response
    };
  }
  const query = encodeURIComponent(
    `*[_type=="post" && slug.current=="${postSlug}"]`
  );
  const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${query}`;
  const resp = await fetch(url).then((res) => res.json());
  const post = resp.result[0];
  if (!post) {
    return { notFound: true };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
        projectId,
        dataset,
      },
    };
  }
};
export default Post;
