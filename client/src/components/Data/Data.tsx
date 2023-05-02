import { Image } from "../../interfaces/Spotify";

interface Props {
  title: string;
  images: Image[];
}

const Data = ({ title, images }: Props) => {
  const imageUrl = images?.length > 0 ? images[0]?.url : null;
  return (
    <div>
      <h4>{title}</h4>
      {imageUrl ? (
        <img src={imageUrl} alt={title} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default Data;
