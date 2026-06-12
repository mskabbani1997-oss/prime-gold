import { redirect } from "next/navigation";

// The storefront lives under the /ae locale, matching the live site.
export default function RootPage() {
  redirect("/ae");
}
