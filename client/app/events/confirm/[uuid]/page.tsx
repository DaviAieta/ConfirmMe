import { ConfirmAttendance } from "../../_components/confirm"

export default function Page({ params }: { params: { uuid: string } }) {
    return (
        <ConfirmAttendance params={params} />
    )
}