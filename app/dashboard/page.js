import Dashboard from "@/components/Dashboard";
import MainComponent from "@/components/MainComponent";

export const metadata = {
  title: "Snooze You Lose ⋅ Dashboard"
};

export default function DashboardPage() {

  return (
    <MainComponent>
      <Dashboard />
    </MainComponent>
  )
}