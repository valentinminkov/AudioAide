import React from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./List.module.scss";
import StickyContainer from "../StickyContainer/StickyContainer";

interface Props {
  columns: any[][];
  columnHeaders: string[];
}

const List = ({ columnHeaders, columns }: Props) => {
  return (
    <div className={style.container}>
      <ol>
        <StickyContainer>
          <div className={style.header}>
            {columnHeaders.map((header) => (
              <span key={uuidv4()}>{header}</span>
            ))}
          </div>
        </StickyContainer>
        {columns.map((rows) => (
          <li key={uuidv4()}>
            {rows.map((row) => (
              <span key={uuidv4()}>{row}</span>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default List;
