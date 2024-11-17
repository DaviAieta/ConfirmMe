import { NavBar } from "@/components/navbar"
import { ListGuests } from "../../_components/list-guests"

export default function Page({ params }: { params: { uuid: string } }) {
    return (
        <NavBar >
            <ListGuests params={params} />
        </NavBar>
    )
}