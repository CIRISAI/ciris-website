# CIRIS Website

Next.js website for the CIRIS project. Uses Tailwind CSS, fumadocs for documentation.

## Build & Deploy

```bash
npm run build    # Build the site
npm run dev      # Development server
```

Deployed via GitHub - pushes to main auto-deploy.

## Infrastructure (for /architecture page)

**US Region (Vultr, Chicago)**
- Domain: ciris-services-1.ai
- Proxied through Cloudflare (DDoS protection)
- Services: CIRISBilling, CIRISProxy, PostgreSQL, Redis, Caddy
- US-only: CIRISLens (observability)

**EU Region (Hetzner, Falkenstein Germany)**
- Domain: ciris-services-2.ai
- Direct DNS (NOT Cloudflare proxied)
- Services: CIRISBilling, CIRISProxy, PostgreSQL, Redis, Caddy

**Key Architecture Points**
- Split DNS strategy: US via CF, EU direct = zero single point of failure
- No geo-routing - separate domains per region, clients choose
- PostgreSQL bi-directional replication between regions
- Active/active setup - both regions serve requests simultaneously

## Validation

Use DeepWiki MCP to query CIRIS repos for accurate infrastructure info:
- `mcp__deepwiki__ask_question` with repoName: "CIRISAI/CIRISBridge"

## Licensing

All CIRIS repos use AGPL-3.0 (network copyleft).
