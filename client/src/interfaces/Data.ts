export interface UniversalItem {
  id: string;
  name: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
}
