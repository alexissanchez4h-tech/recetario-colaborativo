// src/lib/actions.ts
"use server";

import { supabase } from "./supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Crear receta
export async function createRecipe(formData: FormData) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Debes iniciar sesión para crear una receta");
  }

  const titulo = formData.get("titulo") as string;
  const descripcion = formData.get("descripcion") as string;
  const instrucciones = formData.get("instrucciones") as string;
  const tipo = formData.get("tipo") as string;
  const tiempo_prep = parseInt(formData.get("tiempo_prep") as string) || null;
  const porciones = parseInt(formData.get("porciones") as string) || null;
  const imagen_url = formData.get("imagen_url") as string || null;
  const ingredientes = (formData.get("ingredientes") as string)?.split(",").map(i => i.trim()) || [];
  const tags = (formData.get("tags") as string)?.split(",").map(t => t.trim()) || [];

  // Obtener el perfil del usuario (para verificar que es chef)
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "chef") {
    throw new Error("Solo los chefs pueden crear recetas");
  }

  const { error } = await supabase
    .from("recipes")
    .insert({
      chef_id: profile.id,
      titulo,
      descripcion,
      instrucciones,
      tipo,
      tiempo_prep,
      porciones,
      imagen_url,
      ingredientes,
      tags,
    });

  if (error) {
    console.error("Error al crear receta:", error);
    throw new Error("Error al crear la receta");
  }

  revalidatePath("/");
  revalidatePath("/explorar");
  revalidatePath("/mis-recetas");
  redirect("/");
}

// Actualizar receta
export async function updateRecipe(formData: FormData) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Debes iniciar sesión para editar una receta");
  }

  const recipeId = formData.get("id") as string;
  const titulo = formData.get("titulo") as string;
  const descripcion = formData.get("descripcion") as string;
  const instrucciones = formData.get("instrucciones") as string;
  const tipo = formData.get("tipo") as string;
  const tiempo_prep = parseInt(formData.get("tiempo_prep") as string) || null;
  const porciones = parseInt(formData.get("porciones") as string) || null;
  const imagen_url = formData.get("imagen_url") as string || null;
  const ingredientes = (formData.get("ingredientes") as string)?.split(",").map(i => i.trim()) || [];
  const tags = (formData.get("tags") as string)?.split(",").map(t => t.trim()) || [];

  // Verificar que el usuario es dueño de la receta
  const { data: recipe } = await supabase
    .from("recipes")
    .select("chef_id")
    .eq("id", recipeId)
    .single();

  if (!recipe) {
    throw new Error("Receta no encontrada");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (recipe.chef_id !== profile?.id) {
    throw new Error("No tienes permiso para editar esta receta");
  }

  const { error } = await supabase
    .from("recipes")
    .update({
      titulo,
      descripcion,
      instrucciones,
      tipo,
      tiempo_prep,
      porciones,
      imagen_url,
      ingredientes,
      tags,
      updated_at: new Date().toISOString(),
    })
    .eq("id", recipeId);

  if (error) {
    console.error("Error al actualizar receta:", error);
    throw new Error("Error al actualizar la receta");
  }

  revalidatePath("/");
  revalidatePath("/explorar");
  revalidatePath("/mis-recetas");
  revalidatePath(`/receta/${recipeId}`);
  redirect(`/receta/${recipeId}`);
}

// Eliminar receta
export async function deleteRecipe(formData: FormData) {
  "use server";
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Debes iniciar sesión para eliminar una receta");
  }

  const recipeId = formData.get("id") as string;

  // Verificar que el usuario es dueño de la receta
  const { data: recipe } = await supabase
    .from("recipes")
    .select("chef_id")
    .eq("id", recipeId)
    .single();

  if (!recipe) {
    throw new Error("Receta no encontrada");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (recipe.chef_id !== profile?.id) {
    throw new Error("No tienes permiso para eliminar esta receta");
  }

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId);

  if (error) {
    console.error("Error al eliminar receta:", error);
    throw new Error("Error al eliminar la receta");
  }

  revalidatePath("/");
  revalidatePath("/explorar");
  revalidatePath("/mis-recetas");
  redirect("/mis-recetas");
}