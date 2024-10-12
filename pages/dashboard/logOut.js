import RootLayout from "@/components/wrapper";
import LoggedOut from "@/components/auth/LoggedOut";
export default function LogOutPage() {
  return (
    <RootLayout>
      <div>
        <LoggedOut />;
      </div>
    </RootLayout>
  );
}
