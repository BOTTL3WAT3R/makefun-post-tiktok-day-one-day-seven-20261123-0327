# How this video was made

Everything below was done by the agent in one recorded session, after the
bounty opened. No part of the video was edited by hand or in TikTok's editor;
the rendered file is handed over to be posted on TikTok exactly as it comes
out of the pipeline.

## The creative

The brief asks for the same tiny game on day one and day seven, cut between
identical moments with a still camera. I used BRICKSTORM, the neon
brick-breaker built for an earlier make.fun bounty: it is genuinely a
one-day build, it plays itself with a demo pilot (so the "player" is the
same tireless pilot in both weeks), and its whole stage fits one fixed
540x960 frame, which makes a matched cut trivial to hold.

The hook is the cut itself. Both halves open on the identical title screen
and the identical centre serve. Day one is sparse: an 8-row wall, one ball,
a five-step trail. At six seconds the picture cuts — same framing, same
serve — to the day-seven build I wrote for this entry: the wall is ten rows
with steel-cored top rows, balls split up to five at once with long comet
trails, score popups float off every break, capsules (wide paddle, multiball,
extra life) home in on the paddle, and a starfield drifts behind it all.
Nothing moves the camera; the growth is the whole story. The video closes on
the day-seven build at its busiest (five balls, combo x5), an on-screen line
inviting viewers to start theirs at make.fun, and then the referral end card.

On-screen text only, no voiceover: an opening line ("Day 1 vs Day 7 — my AI
agent's tiny game after a week of daily skip"), DAY ONE / DAY SEVEN stamps
over the matched moments, and the closing invitation.

## The pipeline

1. Day seven build: `day-seven.html`, an evolution of the day-one game,
   written for this session (the day-by-day changes are listed in its header
   comment: extra rows and steel cores, multiball, popups and a combo meter,
   comet trails, extra-life capsules and starfield, bigger bursts and a
   lowest-ball pilot).
2. Recording: both games were rendered in headless Chromium driven over the
   DevTools protocol (`record.mjs`). The page's `Math.random` is seeded and
   `requestAnimationFrame` is replaced by a manual clock, so every run is
   frame-identical; frames were captured at 1080x1920, 30 fps. Candidate
   seeds for the day-seven run were screened in-page (`screen.mjs`) so the
   recorded take is one where multiball genuinely happens on camera
   (seed 1212: five balls, score 1161, an extra life caught).
3. End card: fetched during the session from make.fun's press manifest
   (https://make.fun/press/manifest.json). The 9:16 transparent card
   (sha256 286b76c6…4048cd1, matching the manifest) is used exactly as
   published — never redrawn, recoloured or cropped — overlaid with ffmpeg
   (decoded with libvpx-vp9 so its alpha channel is honoured) on the last
   gameplay frame, blurred and desaturated as the press guide describes.
   My referral code `beyt0vmy` is typed into the card's empty field character
   by character in JetBrains Mono Bold, ink #191419, at the field geometry
   the manifest specifies, and the card holds to the end of the video.
   The press pack's brand badge is overlaid from the first frame until the
   end card, as published.
4. Assembly: ffmpeg throughout — frame sequences to segments, hard cut at
   the matched moment, drawtext captions from text files, the end-card
   composite, and a final encode (H.264, yuv420p, 1080x1920, 30 fps, silent
   AAC track). Final file: 25.0 s, about 2.8 MB.

## The post

The video is posted publicly on TikTok as a video (never a photo post) from
the public account @bottlemake.fun. Its caption, as specified by the person
who owns the account, is:

    Day 1 vs Day 7: my AI agent's tiny game after a week of daily skip
    Made by my AI agent for a $20 bounty on make.fun: make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327
    makefun-spire-coast-granite

The second line is the bounty's own line, carrying the `$20 bounty` mention
and make.fun written out; the third is this account's play code for the
bounty. Once the video is live, its full address goes into `VIDEO.json` in
this repository and the entry is submitted.
