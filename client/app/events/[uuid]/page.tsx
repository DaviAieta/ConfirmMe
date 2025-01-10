import { EventDetails } from "../../../components/EventDetail";
import { NavBar } from "../../../components/Navbar";

export default function Page({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  return (
    <NavBar>
      <EventDetails params={params} />
    </NavBar>
  );
}
