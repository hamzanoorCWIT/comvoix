export const cookieCategories = [
  { id: "necessary", name: "Necessary", status: "Always Active", text: "Required for the site to function - session security, load balancing and core functionality. Always on.", locked: true },
  { id: "analytics", name: "Analytics", status: "Optional", text: "Helps us understand how visitors use the site so we can improve it. Off until you allow it.", locked: false },
  { id: "marketing", name: "Marketing", status: "Optional", text: "Used to measure the performance of our campaigns. Off until you allow it.", locked: false },
] as const;
