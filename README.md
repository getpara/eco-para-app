# Eco Portal

A demo of a "sign once, bridge anything" UX — the key idea being that with Para's embedded wallet + Permit3, a user can express a cross-chain transfer intent without any popups or manual signing steps.

## How it works

1. **Configure origin** — pick which chain your tokens are on, which token, and how much
2. **Configure destination** — pick which chain you want them to arrive on
3. **Hit Bridge** — Para silently handles three things in sequence:
   - **Approve**: grants Permit3 permission to move your tokens (one-time per token, also silent)
   - **Sign**: signs a Permit3 EIP-712 message encoding the full intent — origin chain, destination chain, token, amount — all in one signature
   - **Submit to Solvers**: broadcasts the signed intent to a solver network (currently mocked), which would then front the funds on the destination and settle using the permit on the origin

The user never sees a wallet popup. That's the whole demo — Para makes the signing invisible.

## Stack

- [Next.js 16](https://nextjs.org) + React 19 + TypeScript
- [Para React SDK](https://docs.getpara.com) — embedded wallet, silent signing
- [Permit3](https://github.com/eco/permit3) — cross-chain authorization primitive
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Add your Para API key to `.env.local`:

```
NEXT_PUBLIC_PARA_API_KEY=your_api_key_here
NEXT_PUBLIC_PARA_ENVIRONMENT=BETA
```

> You can run this app with a regular API key from [Para](https://getpara.com). To set permissions yourself, [get in touch with us](https://getpara.com/talk-to-us) or view the hosted demo link.
