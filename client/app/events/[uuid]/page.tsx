import { EventDetails } from "../../../components/EventDetails";
import { NavBar } from "../../../components/Navbar";

export default function Page({ params }: { params: { uuid: string } }) {
    return (
        <NavBar >
            <EventDetails params={params} />
        </NavBar>
    )
}