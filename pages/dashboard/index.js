import RootLayout from "@/components/wrapper";
import UserDashboard from "@/components/dashboardComponents/UserDashboard";
export default function Dashboard() {
  return (
    <RootLayout>
      <div>
        <UserDashboard />;
      </div>
    </RootLayout>
  );
}
