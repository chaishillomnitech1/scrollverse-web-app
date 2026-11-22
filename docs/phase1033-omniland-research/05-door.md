# The Door That Answers

## Scope

One Omniland capability track: real-time communication, voice/text interaction, presence, AI-assisted citizens, moderation, and human approval. These notes describe standards-backed product options only; they do not claim ScrollVerse external activation.

## Findings

### What the platform primitives support (facts)

- **Real-time voice and generic data:** The W3C WebRTC Recommendation defines browser APIs for sending and receiving media and generic application data with another browser or compatible endpoint. WebRTC connections are coordinated through an application-provided signaling channel; the specification gives WebSocket as a common example. [1] [2]
- **Text, presence signaling, and coordination:** The browser WebSocket API provides a two-way interactive browser-to-server session without polling. It is therefore suitable for chat events, room membership, typing indicators, heartbeat/presence updates, and WebRTC offer/answer/ICE signaling. The latter list is an application design recommendation, not a WebSocket feature guarantee. WebSocket has no built-in backpressure, so an implementation must bound, batch, or drop nonessential events under load. [2]
- **Microphone access is user-controlled:** `getUserMedia()` is restricted to secure contexts, always requires user permission before opening an audio/video input, and browsers must provide indicators for permission/use. A denied or unavailable device can reject the request, and a user may ignore the prompt. This makes explicit “Join by voice” consent, visible mute state, and text fallback necessary. [3]
- **Privacy boundary for peer connections:** WebRTC ICE candidates can expose network/address information to the application and potentially to the communicating party. A low-overhead product should avoid exposing peer identities or network details directly and should prefer a controlled signaling layer and relay policy where the threat model requires it. The relay/privacy trade-off is a recommendation derived from the specification’s privacy warning, not a universal requirement. [1]
- **Human approval and moderation:** NIST’s AI RMF Playbook says organizations should document clear roles and responsibilities for human-AI configurations and oversight. The EU Digital Services Act is a regulatory source for services in its scope, but its operational pattern is broadly useful: disclose moderation policies and tools, including algorithmic decision-making and human review, and provide accessible complaint handling with human review where automated means are used. Treat these as governance patterns; applicability depends on product, users, and jurisdiction. [4] [5]

### Product interpretation (recommendations)

“The Door That Answers” should be a single browser room with three explicit modes: **text**, **voice**, and **AI-assisted citizen**. Text is the default and lowest-cost path. Voice is opt-in and starts only after a deliberate user action. AI citizens should be clearly labeled as AI, have bounded capabilities, and never silently impersonate a human or take irreversible external action.

Presence should be a small, privacy-preserving state machine rather than a social graph: `offline`, `available`, `in conversation`, `away`, and `do not disturb`. Publish only what the user has opted into, use short-lived heartbeats, and expire stale presence automatically. A room-level presence count is safer and cheaper than exposing exact activity to everyone.

Moderation should be staged: cheap local/client checks for obvious malformed input, server-side rate limits and abuse controls, AI-assisted risk triage, then a human approval queue for high-impact actions. Keep the original content, model/tool decision, confidence or reason code, reviewer decision, timestamp, and appeal/reversal path. AI should recommend, quarantine, or ask for approval—not autonomously ban, publish sensitive content, or contact external systems.

## Practical recommendations for a console-less, low-overhead product

1. **Start with one HTTPS page and one room service.** Use WebSocket for text, presence, rate-limit events, and WebRTC signaling. Add WebRTC audio only after text interaction is stable; use a text fallback whenever permission is denied, unavailable, or ignored. [1] [2] [3]
2. **Make consent and control visible.** Put “Join voice,” “Mute,” “Leave,” and “Report” in the primary UI. Request the microphone only from the voice action, show current microphone state, and stop tracks on leave. This follows browser permission and indicator expectations. [3]
3. **Use an append-only event stream with bounded retention.** Record message IDs, room ID, actor type (human/AI), moderation state, and approval transitions. Keep presence ephemeral; retain moderation decisions and reviewer actions only as long as the product’s policy requires.
4. **Define a minimal approval ladder.** Auto-allow low-risk text, hold uncertain or high-impact content, and require a human decision for bans, public AI-citizen responses on sensitive topics, or any external side effect. Provide “approve,” “reject,” “edit,” “escalate,” and “undo” actions. This operationalizes the human-oversight patterns in NIST and the DSA. [4] [5]
5. **Protect against overload and abuse.** Bound WebSocket message size and queue depth, rate-limit chat and presence heartbeats, coalesce typing/presence updates, and close idle connections. WebSocket’s lack of backpressure makes explicit limits important. [2]
6. **Keep AI citizens constrained and inspectable.** Give each citizen a declared purpose, allowed tools, escalation rule, and visible AI badge. Store a compact reason code and evidence pointer for each moderation or approval recommendation so a human can review it without a separate console.

## Sources

[1]: https://www.w3.org/TR/webrtc/ "WebRTC: Real-Time Communication in Browsers — W3C Recommendation"

[2]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API "WebSocket API (WebSockets) — MDN Web Docs"

[3]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia "MediaDevices: getUserMedia() method — MDN Web Docs"

[4]: https://airc.nist.gov/airmf-resources/playbook/govern/ "NIST AI RMF Playbook — Govern"

[5]: https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022R2065 "Regulation (EU) 2022/2065 — Digital Services Act"
