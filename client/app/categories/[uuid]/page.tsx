import { CategoryDetails } from "@/components/CategoryDetails";
import { NavBar } from "../../../components/Navbar";


export default function Page({ params }: { params: { uuid: string } }) {
    return (
        <NavBar >
            <CategoryDetails params={params} />
        </NavBar>
    )
}