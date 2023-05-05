import { Image } from "../../interfaces/Spotify";
import styles from "./Data.module.scss";

interface Props {
  title: string;
  images: Image[];
}

const Data = ({ title, images }: Props) => {
  const imageUrl = images?.length > 0 ? images[0]?.url : null;
  return (
    <div className={styles.container}>
      {imageUrl ? (
        <img src={imageUrl} alt={title} className={styles.img} />
      ) : (
        <p>No image available</p>
      )}
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default Data;
