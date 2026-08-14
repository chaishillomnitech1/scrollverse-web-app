# Protected Owner Voice Readiness Record

> **Protected source record.** This document records an owner-provided consent confirmation and recording intake for a potential future ScrollVerse voice feature. It does not publish, train, clone, synthesize, transfer, or authorize a voice model, nor does it store the source recording in this repository.

| Field | Current state |
| --- | --- |
| Voice source | Owner-provided video recording received August 14, 2026. |
| Owner statement | The owner stated that the supplied voice is their own and consented to its use for a ScrollVerse voice option. |
| Intended direction | Possible future narration, AI guide responses, and voice-enabled learning experiences, subject to scoped terms and service approval. |
| Publication/training state | **Not active.** No public release, model training, voice cloning, provider upload, or generated-audio feature has been created. |
| Source handling | The supplied recording remains a protected intake asset outside the repository and public routes. |
| Revocation state | The owner may withdraw or narrow authorization before any provider submission or activation. A production feature must preserve an owner-controlled disable/review state. |

## Source-Quality Review

The supplied recording contains audible single-speaker speech but also continuous overlapping television dialogue. The speech is understandable; however, the recording does not contain an entirely clean segment suitable for a high-quality custom-voice sample. A future provider submission should use a newly recorded clean sample rather than attempting to isolate or infer a voice from mixed background audio.

### Updated Protected Recording Review

A second owner-supplied recording was received on August 14, 2026 with the owner’s consent statement. A bounded audio review found intelligible single-speaker consent language, low background sound, and continuous clear speech segments suitable for a potential clean reference sample. The raw recording remains protected and is not copied into the repository or any public route. Because the local transcription utility could not authenticate, this review does **not** verify that the spoken statement matches any particular provider’s exact consent script; a provider-specific script and format check remains required before any submission.

## Permissioned Voice Options

OpenAI’s text-to-speech documentation describes built-in voice options, multilingual text input, an AI-generated-voice disclosure requirement, and a custom-voice route restricted to eligible customers. Its custom-voice path requires separate consent and sample recordings, and notes that recording quality affects output. [1] Microsoft’s Personal Voice documentation describes explicit verbal consent, an audio prompt, approved access, responsible-AI limitations, and multilingual synthesis across supported locales. [2] Browser-native Web Speech can expose device synthesis voices, language, pitch, volume, and speech controls; availability varies by browser/device and must be detected at runtime. [3]

| Mode | Potential use | Current state | Required next step |
| --- | --- | --- | --- |
| Browser/device voice | Read page text aloud with a visitor’s local device voice | Buildable as a visitor-controlled fallback | Detect voice availability, present language/voice list, transcript, stop/mute, and support limitation. |
| Built-in provider voice | Prepared narration or AI-guide response using a catalog voice | Concept only | Select provider, accept terms, add secret through the project workflow, disclose synthetic audio, and add usage controls. |
| Owner custom voice | Consented owner narration/AI guide voice | Cleaner protected recording is reference-ready; no provider submission or model exists | Obtain/confirm clean provider-required consent phrase and sample format; confirm account eligibility, scoped intended use, review, and explicit owner release. |

## Production Boundary

The attached video is not used as a provider sample. The system must never scrape or ingest Spotify/provider audio as an alternate sample. Any future generated voice should visibly disclose whether it is an AI-generated catalog voice or an owner-approved synthetic voice, provide a transcript/captions and stop/mute controls, offer a non-audio path, and avoid implying a human is speaking live.

## Rendered Route Verification

On August 14, 2026, the `/voice-language-studio` development route rendered its language selector, device-voice selector, rate and pitch controls, visible transcript field, playback/mute controls, consent-readiness notice, and revocation boundary. The test browser reported zero device voices for the selected language, so the production-safe fallback state was visible and the playback control remained disabled. This is a device/browser capability outcome, not a claim that the route will have the same voice inventory for every visitor.

## References

[1] [OpenAI — Text to Speech](https://developers.openai.com/api/docs/guides/text-to-speech)

[2] [Microsoft Learn — What is Personal Voice for Text to Speech?](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-overview)

[3] [MDN — Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
