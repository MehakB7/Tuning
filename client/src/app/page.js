"use client";
import styles from "./page.module.css";
import { dummyData } from "@/modal/Post";
import PostCard from "@/components/PostCard/PostCard";
import { useGetWhoAmIQuery } from "@/services/whoami";
import { useGetUsersQuery } from "@/services/user";

export default function Home() {
  const { loading, data } = useGetWhoAmIQuery();
  const { data: UserData } = useGetUsersQuery();

  return (
    <main className={styles.main}>
      <header></header>
      <div className={styles.container}>
        {dummyData.map((item, index) => {
          return <PostCard {...item} key={index} />;
        })}
      </div>
    </main>
  );
}
