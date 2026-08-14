# ScrollVerse Media Launch Kit

> **Review-ready materials only.** This kit creates no lead records, sends no emails, posts no Discord message, imports no contact list, and connects to no CRM or inbox.

## 1. Contact Database Template

The accompanying `scrollverse_media_contacts_template.csv` is intentionally empty: it contains a field row only, so it can become the owner-reviewed source of truth for research candidates without fabricating a single contact, address, outlet, consent record, or relationship.

| Field | Purpose | Completion standard |
|---|---|---|
| `record_id` | Stable internal reference for the record | Use a non-identifying, unique ID such as `SV-MEDIA-0001` after owner review. |
| `outlet_name` / `vertical` / `sub_vertical` | Classify the outlet and editorial context | Use **Tech**, **Fashion**, **Music**, or **Community**, then a factual topical subcategory. |
| `geography` / `audience_language` | Support regional and language-aware outreach | Record only public audience information or an owner-approved research note. |
| `outlet_url` / `editorial_contact_path` | Preserve the source page and preferred pitch route | Prefer a public editorial guidelines page, pitch form, or contact page over a guessed address. |
| `contact_type` / `contact_name` / `professional_email` | Identify the contact path with minimal data | Enter a name or email only when publicly provided for professional outreach or supplied with a documented basis. |
| `contact_source_url` / `source_checked_at_utc` | Preserve provenance and review date | Each usable record needs a public source URL and a UTC check time. |
| `contact_basis` / `privacy_region` / `consent_status` | Record why contact is appropriate and what safeguards apply | Examples: `public editorial pitch page`, `opted in`, `existing relationship`. Never infer consent from a name alone. |
| `do_not_contact` / `outreach_status` / `owner_review_status` | Prevent repeat or unapproved activity | Use controlled values: `yes/no`, `research_candidate/approved/contacted/responded/closed`, and `pending/approved/rejected`. |
| `story_angle` / `personalization_note` | Make each message relevant rather than mass-produced | Write a factual reason the outlet’s readers may care; do not invent familiarity, praise, or prior contact. |
| `sender_identity` / `campaign_classification` | Keep commercial purpose and sender accountable | Name the actual sending organization and distinguish editorial inquiry, commercial promotion, or opt-in newsletter. |
| `physical_address_record` / `opt_out_method` | Preserve sending requirements before any commercial message | Complete before sending; use a valid business postal address and a straightforward reply or unsubscribe path. |
| `last_outreach_at_utc` / `follow_up_eligible_at_utc` / `response_status` | Keep cadence respectful and auditable | No automated follow-up. Record dates only after an owner-approved send. |
| `retention_review_at_utc` / `evidence_notes` / `access_classification` | Control retention and access | Note any limitations, deletion request, or public/protected status. |

### Controlled Status Values

| Field | Allowed values |
|---|---|
| `vertical` | `Tech`, `Fashion`, `Music`, `Community` |
| `contact_type` | `public_pitch_form`, `editorial_desk`, `named_editor_publicly_listed`, `opted_in_contact`, `other_review_required` |
| `consent_status` | `not_applicable_editorial_path`, `documented_opt_in`, `existing_relationship`, `unknown_do_not_send` |
| `outreach_status` | `research_candidate`, `qualified`, `owner_review_required`, `approved_to_send`, `contacted`, `responded`, `closed` |
| `owner_review_status` | `pending`, `approved`, `rejected`, `needs_source_check` |
| `response_status` | `none`, `interested`, `not_now`, `declined`, `unsubscribe_or_do_not_contact` |
| `access_classification` | `public_source`, `owner_supplied_protected`, `restricted_to_campaign_owner` |

## 2. Before-Use Checklist

Commercial email should have an accurate sender identity and routing information, a truthful subject line, a valid postal address, and a clear opt-out route; opt-outs must be honored.[1] Some jurisdictions impose consent requirements for messages to individuals, including certain professional addresses, so each record must retain its contact basis and exclusion state.[2]

| Review checkpoint | Required answer before approving a send |
|---|---|
| Editorial fit | Why does this outlet’s audience benefit from this specific story angle? |
| Source | Where is the professional contact or pitch route publicly listed? |
| Accuracy | Can every statement be supported by a public route, owner-supplied record, or clearly labeled plan? |
| Sender | Is the actual sender identity, reply route, and business postal address complete? |
| Choice | Does the message state a simple no-follow-up/opt-out path? |
| Community rules | Does the outlet or community permit this channel and type of message? |
| Owner review | Has a human owner approved this recipient, subject line, body copy, and any attachment? |

## 3. Personalized Outreach Draft — Tech Editor

**Subject options**

1. `Story idea: a source-labeled control plane for an independent creator portfolio`
2. `Pitch: how ScrollVerse maps projects, evidence, and future integrations without hidden connections`

**Email draft**

Hello **[Editor Name]**, 

I’m **Chais “Sabir Kajir” Hill the Great**, creator of **ScrollVerse**. I’m reaching out because **[insert one factual observation about the outlet’s reporting on independent software, creator tools, digital ownership, or transparent technology]** aligns with a project we have made public for review.

The story angle is not a claim that every project or account is integrated. It is the opposite: ScrollVerse’s new **Consortium** page shows how an independent portfolio can label public sources, owner-supplied context, protected records, and future connection requests without hiding the difference. Visitors can see what is active, what is planned, and what remains fail-closed—especially around credentials, automation, and on-chain actions.

Useful public starting points are the **[ScrollVerse Consortium](https://scrollverse.co/consortium-nexus)**, the **[Domain & Discovery Map](https://scrollverse.co/domain-discovery-map)**, and the public **[GitHub Showcase](https://scrollverse.co/github-showcase)**. I would be glad to provide a short written walkthrough, answer factual questions, or clarify the evidence labels used on the routes.

If this is not a fit for your desk, reply **“no follow-up”** and we will close the record. This is a review request, not a paid-placement request or a claim of affiliation.

Regards,  
**Chais “Sabir Kajir” Hill the Great**  
**SCROLL VERSE LLC**  
`[approved sender email]` · `[valid business postal address]` · `[unsubscribe or no-follow-up route]`

## 4. Personalized Outreach Draft — Fashion Editor

**Subject options**

1. `Story idea: a source-led fashion worldbuilding process across apparel, media, and creator education`
2. `Pitch: how ScrollVerse documents fashion concepts before claiming a commercial release`

**Email draft**

Hello **[Editor Name]**, 

I’m **Chais “Sabir Kajir” Hill the Great**, building **ScrollVerse** and **XLVIII BLOCKS LLC** as connected creator spaces for fashion, music, editorial work, and public learning. Your coverage of **[insert one factual editorial focus, designer, style movement, or regional culture covered by the outlet]** made me think this might be a relevant process story.

Rather than presenting unverified concepts as launches, ScrollVerse documents clothing-line ideas, source/rights status, protected media intake, collaboration readiness, and visual research before any commercial claim. The public **[Empire Asset Navigator](https://scrollverse.co/empire-asset-navigator)** and **[Brand Feature Studio](https://scrollverse.co/brand-feature-studio)** show this approach; the **[XLVIII Blocks Monograph](https://scrollverse.co/xlviii-blocks-monograph)** provides the interiors-and-place editorial lane.

The potential angle is how an independent creator can develop fashion culture with visible provenance and respectful feature boundaries, rather than confusing a style study or community highlight with a partnership, endorsement, prize, or product release.

If this is not relevant to your editorial calendar, reply **“no follow-up”** and we will not send another pitch. I can supply a concise source sheet or clarify which material is public, protected, or still under review.

Regards,  
**Chais “Sabir Kajir” Hill the Great**  
**SCROLL VERSE LLC & XLVIII BLOCKS LLC**  
`[approved sender email]` · `[valid business postal address]` · `[unsubscribe or no-follow-up route]`

## 5. Personalized Outreach Draft — Music Editor

**Subject options**

1. `Story idea: artist-controlled release readiness across music, media, and direct audience learning`
2. `Pitch: a transparent release-planning system for music, visual worlds, and direct-to-fan preparation`

**Email draft**

Hello **[Editor Name]**, 

I’m **Chais “Sabir Kajir” Hill the Great**, creator of **ScrollVerse**. I’m reaching out after reading **[insert one factual observation about the outlet’s coverage of independent artists, rights, distribution, live performance, music technology, or creative ownership]**.

ScrollVerse has published a **[Music & Creator Release Readiness](https://scrollverse.co/music-creator-release-readiness)** navigator that separates original work, metadata and rights preparation, release packaging, direct-to-fan concepts, and collectible-readiness questions from actual distribution, sale, royalty, or payout claims. It is a transparent workflow for artists who want to understand the work behind a release without misrepresenting what is live.

For additional context, the **[Creator Operations Intelligence](https://scrollverse.co/creator-operations-intelligence)** route documents evidence and specialist-guidance boundaries, while the **[Open Knowledge Verse](https://scrollverse.co/open-knowledge-verse)** keeps learning resources accessible.

If the story is useful for your readers, I would be glad to answer factual questions or provide a source-labeled release-preparation brief. If not, reply **“no follow-up”** and we will close the outreach record.

Regards,  
**Chais “Sabir Kajir” Hill the Great**  
**SCROLL VERSE LLC**  
`[approved sender email]` · `[valid business postal address]` · `[unsubscribe or no-follow-up route]`

## 6. Community and Discord Participation Brief

### Contribution-first operating rule

Participate only in channels where the server’s rules or a moderator explicitly permit the topic. Start with a useful contribution—such as a source, a response to a question, a public resource, or a transparent project update—and ask before sharing a link. Do not send unsolicited DMs, tag groups, coordinate mass joins, automate posts, inflate engagement, or frame a community as an affiliate or partner without written permission.

**Permission request draft**

> Hello **[Moderator Name]** — I’m with ScrollVerse, an independent creator platform. Before sharing anything, may I ask whether there is an appropriate channel for a short source-labeled resource about **[specific topic relevant to the server]**? I will follow your server rules, keep it concise, and will not DM members or repeat the post if it is not welcome. Thank you for the guidance.

### Voluntary newsletter/sign-up language

> **Get occasional ScrollVerse updates.** Enter your email only if you want news about public learning, creator tools, music/fashion/editorial releases, and project updates. You can unsubscribe at any time. We will not sell your email or add you to a hidden contact list.

Any live sign-up form requires a separate privacy, retention, security, and sender-identity review before publication. Discord prohibits unsolicited bulk messages and artificially inflated engagement; its guidance also favors clear rules and moderator-aligned enforcement.[3]

## 7. Execution State

| Activity | State |
|---|---|
| Contact template | **Ready for owner-reviewed use**; empty by design |
| Personalized drafts | **Ready for outlet-specific factual personalization** |
| Contact research | **Not started**; no individuals or addresses collected |
| CRM or inbox connection | **Not connected** |
| Email sending, follow-ups, Discord posts, or DMs | **Disabled** |
| Paid placement, partnership, audience guarantee, or virality claim | **Not represented** |

## References

[1] [U.S. Federal Trade Commission — CAN-SPAM Act: A Compliance Guide for Business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)

[2] [UK Information Commissioner’s Office — Electronic mail marketing](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/)

[3] [Discord — Community Guidelines](https://discord.com/guidelines) and [Developing Server Rules](https://discord.com/community/developing-server-rules)
