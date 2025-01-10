import { ConfirmAttendance } from "../../../../components/AttendanceConfirmation";

export default function Page({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  return <ConfirmAttendance params={params} />;
}
