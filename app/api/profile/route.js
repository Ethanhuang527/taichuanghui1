import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProfile, profileCookieValue, PROFILE_COOKIE } from "@/lib/profile";

export async function POST(req) {
  const form = await req.formData();
  const g = (k) => (form.get(k) || "").toString().trim();
  const prev = getProfile();

  const obj = {
    name: g("name") || prev.name,
    email: g("email") || prev.email,
    birthdate: g("birthdate"),
    gender: g("gender"),
    phone: g("phone"),
    isCompanyPerson: !!form.get("isCompanyPerson"),
    company: g("company"),
    title: g("title"),
    field: g("field"),
    taxId: g("taxId"),
    address: g("address"),
    education: g("education"),
    school: g("school"),
    major: g("major"),
    bio: g("bio"),
  };

  cookies().set(PROFILE_COOKIE, profileCookieValue(obj), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.redirect(new URL("/account/settings?saved=1", req.url), { status: 303 });
}
