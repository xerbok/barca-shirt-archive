"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteShirt } from "@/lib/shirts";

type DeleteShirtFormState = {
  message: string;
};

export async function deleteShirtAction(
  id: string,
  previousState: DeleteShirtFormState,
): Promise<DeleteShirtFormState> {
  void previousState;

  try {
    await deleteShirt(id);
  } catch {
    return {
      message:
        "No s'ha pogut eliminar la samarreta. Torna-ho a provar més tard.",
    };
  }

  revalidatePath("/");
  redirect("/");
}
