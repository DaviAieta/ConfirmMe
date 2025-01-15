import { NavBar } from "@/components/Navbar";
import { ListGuests } from "../../../../components/GuestList";

export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <NavBar>
      <ListGuests params={params} />
    </NavBar>
  );
}
