export type GuestProps = {
    id: number;
    name: string;
    cpf: string;
    email: string;
    phone?: string;
    eventId: number;
    confirmed: boolean;
    declined: boolean;
}
