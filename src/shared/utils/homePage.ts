export function get(): "network-map" | "dashboard" {
  let value = localStorage.getItem("homePage");
  if (value !== "network-map" && value !== "dashboard") return "dashboard";
  return value;
}

export function set(value: "network-map" | "dashboard"): void {
  localStorage.setItem("homePage", value);
}
