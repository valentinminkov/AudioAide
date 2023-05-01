import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import style from "./LibrarySection.module.scss";

interface LibrarySectionProps {
  title: string;
  fetchData: (userId: string, limit: number) => Promise<any>;
}

const LibrarySection = ({ title, fetchData }: LibrarySectionProps) => {
  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};

  useEffect(() => {
    const fetchSectionData = async (userId: string) => {
      const data = await fetchData(userId, 50);
      return data;
    };

    if (user?.id) {
      fetchSectionData(user.id);
    }
  }, [fetchData, user]);

  return (
    <div className={style.containers}>
      <h3>{title}</h3>
    </div>
  );
};

export default LibrarySection;
