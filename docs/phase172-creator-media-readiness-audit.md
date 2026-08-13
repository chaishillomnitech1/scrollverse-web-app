# Phase 172 — Creator Media Readiness Audit

## Existing first-party capability

The current Creator Media Studio provides provider-aware live-stream guidance and release preparation. Media Dock already supports authenticated private staging for selected image, audio, video, PDF, and text files up to 12 MB. Each media record carries visibility, consent attestation, provenance note, file name, MIME type, byte size, and a non-distribution status. Staging does not publish or send material to a distributor.

## External delivery requirements used as readiness guidance

| Destination guidance | Source-backed requirement | First-party readiness use | Boundary |
|---|---|---|---|
| YouTube | The official guidance names MP4, H.264 video, and AAC-LC, Opus, or Eclipsa Audio as recommended upload encoding elements. [1] | Flag a staged video as broadly YouTube-aligned only when its MIME type is MP4; preserve a note that codec and bitrate cannot be proven from browser file metadata alone. | ScrollVerse is not YouTube Studio and does not publish to YouTube. |
| Spotify | Spotify prefers FLAC, accepts qualifying WAV, requests a native stereo master at 44.1 kHz or higher and 24-bit when native; it cautions against creator-side downsampling and bit-depth reduction. [2] | Mark FLAC/WAV as lossless-master candidates and retain a metadata/rights checklist. Browser MIME metadata alone does not reveal sample rate, bit depth, or channel count. | ScrollVerse is not a Spotify delivery partner or rights administrator. |
| Apple Music | Apple’s specification describes a package containing audio/video/image assets plus metadata, requests checksums for delivered content, and its April 2026 update adds an AI-transparency tag for materially AI-generated music-video content. [3] | Generate a first-party release package record containing an asset SHA-256, asset facts, metadata completeness, provenance, rights, and an AI-transparency disclosure choice. | The first-party SHA-256 is an integrity record; it is not Apple package acceptance or an Apple delivery. |

## Build conclusion

The next first-party improvement can safely add browser-local file inspection and a persisted provider-preparation record. It must label browser-detectable facts separately from facts that require mastering software, a distribution provider, or a signed rights/provenance record.

## References

[1]: https://support.google.com/youtube/answer/1722171?hl=en-GB "YouTube recommended upload encoding settings"
[2]: https://support.spotify.com/us/artists/article/audio-file-formats/ "Spotify audio file formats"
[3]: https://help.apple.com/itc/musicspec/en.lproj/static.html "Apple Music Specification 5.3.26"
