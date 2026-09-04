import { DashboardShell } from "@/components/DashboardShell";
import { CompetitionsHub } from "@/components/competitions/CompetitionsHub";
import { competitions } from "@/components/competitions/data";

export default function Home() {
  return (
    <DashboardShell>
      <CompetitionsHub competitions={competitions} />
    </DashboardShell>
  );
}
