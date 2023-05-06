import React from "react";
import { UniversalItem } from "../../interfaces/Data";
import Data from "../Data/Data";
import Pagination from "../Pagination/Pagination";
import StickyContainer from "../StickyContainer/StickyContainer";
import styles from "./DataDisplay.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

type DataType = "artists" | "playlists" | "albums" | "tracks";

interface DataDisplayProps {
  currentPage: number;
  items: UniversalItem[];
  total: number;
  type: DataType;
  offset: number;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
  onContainerClick: (id: string) => void;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  type,
  total,
  items,
  itemsPerPage,
  currentPage,
  handlePageChange,
  onContainerClick,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div>
      <StickyContainer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => handlePageChange(page)}
        />
      </StickyContainer>
      <div className={styles.content}>
        {items
          ?.filter((item) => item.id) // Filter out items without an id
          .map((item) => {
            const { id, name, images } = item;
            return (
              <Data
                key={id}
                id={id}
                title={name}
                images={images}
                onClick={onContainerClick}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DataDisplay;
