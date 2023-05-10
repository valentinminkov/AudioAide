import React from "react";
import style from "./DescriptionCard.module.scss";
import { Image } from "../../interfaces/Spotify";
import { v4 as uuidv4 } from "uuid";

export interface DescriptionRow {
  title?: string;
  content: string | JSX.Element;
}

interface Props {
  image: Image;
  title: string;
  rows: DescriptionRow[];
}

const DescriptionCard: React.FC<Props> = ({ image, title, rows }) => {
  const imgSize = 200;
  return (
    <div className={style.container}>
      <div>
        <img
          src={image.url || ""}
          alt={title}
          width={imgSize}
          height={imgSize}
        />
      </div>
      <div>
        <h3>{title}</h3>
        {rows.map(({ title, content }) => (
          <div key={uuidv4()} className={style.descriptionRow}>
            {title && <span>{title}</span>}
            <span>{content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionCard;
