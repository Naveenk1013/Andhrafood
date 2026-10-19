/**
 * Utility to inject Cloudinary automatic format and quality transformations.
 * Reduces bandwidth by 70-85% while preserving visual clarity.
 */
export function optimizeCloudinaryUrl(
  url?: string,
  width?: number,
  quality: string = "auto"
): string {
  if (!url || typeof url !== "string") return url || "";
  if (!url.includes("res.cloudinary.com") || url.includes("/f_auto")) {
    return url;
  }

  const transform = width
    ? `f_auto,q_${quality},w_${width},c_limit`
    : `f_auto,q_${quality}`;

  return url.replace("/upload/", `/upload/${transform}/`);
}
