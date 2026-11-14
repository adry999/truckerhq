export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { integrationStatus, describeIntegrations } = await import("@/server/integrations");
  const { isLiveProduction } = await import("@/server/env");
  const { line, missingRequired } = describeIntegrations(integrationStatus());
  console.info(line);
  // Log loudly but never throw: a crash loop is worse than a degraded site.
  if (isLiveProduction() && missingRequired.length > 0) {
    console.error(`[startup] production is missing required config: ${missingRequired.join(", ")}`);
  }
}
