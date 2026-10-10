import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ryan Andiya Saputra — Informatic Student",
    short_name: "Ryan Andiya",
    description:
      "Portfolio of Ryan Andiya Saputra, an Informatic Student.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#7c3aed",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
