export function slugify(str: string): string {
  return String(str)
    .trim()
    .replaceAll(" ", "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/[!@#$%^&*+=/\\;:'"|<>(){}[\],?،؟]/g, "")
    .toLowerCase();
}
