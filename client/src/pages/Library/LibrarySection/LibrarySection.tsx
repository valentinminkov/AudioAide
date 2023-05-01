import React, { useContext, useEffect, useState } from "react";
import DataDisplay from "../../../components/DataDisplay/DataDisplay";
import { AppContext } from "../../../context/AppContext";
import style from "./LibrarySection.module.scss";

interface LibrarySectionProps {
  title: string;
  fetchData: (userId: string, limit: number) => Promise<any>;
  type: "artists" | "playlists" | "albums" | "tracks";
}

const LibrarySection = ({ title, fetchData, type }: LibrarySectionProps) => {
  const [data, setData] = useState(null);

  const { appState } = useContext(AppContext) || {};
  const { user } = appState || {};

  useEffect(() => {
    const fetchSectionData = async (userId: string) => {
      const data = await fetchData(userId, 50);
      setData(data);
      return data;
    };

    if (user?.id) {
      fetchSectionData(user.id);
    }
  }, [fetchData, user]);

  return (
    <div className={style.containers}>
      <h3>{title}</h3>
      {data && <DataDisplay data={data} type={type} />}
    </div>
  );
};

export default LibrarySection;
