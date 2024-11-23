import { ConfirmAttendance } from "../../../../components/ConfirmAttendance"

export default function Page({ params }: { params: { uuid: string } }) {
    return (
        <ConfirmAttendance params={params} />
    )
}