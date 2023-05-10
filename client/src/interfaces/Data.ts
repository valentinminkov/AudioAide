import { DescriptionRow } from "../components/DescriptionCard/DescriptionCard";
import { Image } from "./Spotify";

export interface UniversalOverviewItem {
  id: string;
  title: string;
  subTitle: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
}

export interface UniversalListItem {
  title: string;
  image: Image;
  descriptionRows: DescriptionRow[];
  listColumnHeaders: string[];
  listColumns: any[][];
}
