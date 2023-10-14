export interface Project {
  id: number;
  title: string;
  imageSrc: string;
  convertedDataId: number;
  fav: boolean;
  lastEdit: EpochTimeStamp;
}
