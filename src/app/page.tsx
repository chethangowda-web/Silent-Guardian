import { redirect } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Home() {
  const currentUser = auth.currentUser;

  if (currentUser) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}

