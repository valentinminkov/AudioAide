import { Image } from "../../interfaces/Spotify";
import styles from "./Data.module.scss";

interface Props {
  id: string;
  title: string;
  images: Image[];
  onClick: (id: string) => void;
}

const Data = ({ id, title, images, onClick }: Props) => {
  const imageUrl = images?.length > 0 ? images[0]?.url : null;
  return (
    <div className={styles.container} onClick={() => onClick(id)}>
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
