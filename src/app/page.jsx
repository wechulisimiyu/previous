import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          A simple design with Next js.
        </h1>
        <p className={styles.desc}>
          Trying out blog functionality. With a portfolio. Will be able to fetch data soon.
        </p>
        <Button url="/portfolio" text="See Our Works"/>
      </div>
      <div className={styles.item}>
        <Image src="/hero.png" 
          alt="Hero Image" 
          className={styles.img} 
          width={1000} 
          height={500} />
      </div>
    </div>
  );
}
