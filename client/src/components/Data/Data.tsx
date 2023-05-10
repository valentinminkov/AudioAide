import { Image } from "../../interfaces/Spotify";
import styles from "./Data.module.scss";

interface Props {
  id: string;
  title: string;
  subTitle: string;
  images: Image[];
  onClick: (id: string) => void;
}

const Data = ({ id, title, images, onClick, subTitle }: Props) => {
  const imageUrl = images?.length > 0 ? images[0]?.url : null;
  return (
    <div className={styles.container} onClick={() => onClick(id)}>
      {imageUrl ? (
        <img src={imageUrl} alt={title} className={styles.img} />
      ) : (
        <p>No image available</p>
      )}
      <div className={styles.labelsContainer}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subTitle}>{subTitle}</span>
      </div>
    </div>
  );
};

export default Data;
