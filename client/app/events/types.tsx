export enum STATUS {
  ACTIVE = "ACTIVE",
  DONE = "DONE",
  CANCELED = "CANCELED",
}

export enum TYPE {
  ONLINE = "ONLINE",
  INPERSON = "INPERSON",
}

export type EventProps = {
  id: number;
  uuid: string;
  categoriesId: number;
  title: string;
  description: string;
  dhStart: Date;
  dhEnd: Date;
  zipCode: string;
  address: string;
  peopleLimit: number;
  status: STATUS;
  image_path: string;
  price: number;
  confirmed: number;
  declined: number;
  link: string;
  type: string;
};
