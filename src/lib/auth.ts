import { createSupabaseServerClient } from "./supabase/server";

const supabase = async () => await createSupabaseServerClient();

// SIGN UP
export async function signUp(email: string, password: string) {
  const { data, error } = await (await supabase()).auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await (await supabase()).auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}


export async function signOut() {
  await (await supabase()).auth.signOut();
}