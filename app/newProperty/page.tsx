import SimpleHeader from "../components/header/simpleHeader";
import PropertyBody from "./PropertyBody";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function NewProperty() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    redirect("/login");
  }                    //(`${process.env.NEXT_PUBLIC_URL}/api/checkHost`, {
  const res = await fetch("http://localhost:3000/api/checkHost", {
    headers: {
      cookie: `sessionToken=${sessionToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok || !data.isHost) {
    redirect("/becomeAnHost");
  }
  return (

    <div>
      <SimpleHeader />
<PropertyBody />
    </div>
  );
}