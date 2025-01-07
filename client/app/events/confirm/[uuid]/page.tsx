import { ConfirmAttendance } from "../../../../components/ConfirmAttendance"

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
    return (
        <ConfirmAttendance params={params} />
    )
}