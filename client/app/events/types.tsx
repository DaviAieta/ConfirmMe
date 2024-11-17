export enum STATUS {
    ACTIVE = "ACTIVE",
    DONE = "DONE",
    CANCELED = "CANCELED",
}

export type EventProps = {
    id: number;
    uuid: string;
    title: string;
    description: string;
    dhStart: Date;
    dhEnd: Date;
    address: string;
    people_limit: number;
    status: STATUS;
    image_path: string;
    price: number;
    confirmed: number;
    declined: number;
};
