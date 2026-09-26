import{n as e}from"./speciesidentity-Dv9PKGDT.js";import{C as t,E as n,T as r,w as i}from"./src-BuqmKPas.js";import{n as a}from"./world-roster-D5iZcjrh.js";import{a as o,i as s,n as c,o as l,r as u,s as d}from"./earth-layered-recipe-DTHL9JNN.js";var f=`# Celestial Frontier Art Kit

Art direction and prompt kit, version 4.3, 2026-09-13. Canonical style statement for Nick's approved Living Worlds, Discovery Atlas, Earth landfall and fungal landfall: one painted hand, the game's thirteen star kinds, source-derived subjects, and the retained class layouts and production rules. **Version 4 approved at 6f5c396e; v4.1 accepted; v4.2 approved from d2b8d8cd with the September 12 Arena/key-ground/anchor amendments; v4.3 approved from e89cb621 with the September 13 theme material table.**

Each section is plain text inside a fenced block so it can be copied into a prompt tool exactly as written.

## Contents

1. [0. How to use](#0-how-to-use)
2. [1. Reference lock](#1-reference-lock)
3. [2. Frozen style](#2-frozen-style)
4. [3. The one universe](#3-the-one-universe)
5. [4A. Universe (scene)](#4a-universe-scene)
6. [4B. Stars (scene)](#4b-stars-scene)
7. [4C. Planets (orbital cut-out, biome scene)](#4c-planets-orbital-cut-out-biome-scene)
8. [4D. Flora (cut-out)](#4d-flora-cut-out)
9. [4E. Fauna (cut-out)](#4e-fauna-cut-out)
10. [4F. People (cut-out)](#4f-people-cut-out)
11. [4G. Ships (cut-out)](#4g-ships-cut-out)
12. [4H. Landmarks and props (cut-out)](#4h-landmarks-and-props-cut-out)
13. [4I. Items, loot and resources (cut-out)](#4i-items-loot-and-resources-cut-out)
14. [4J. Emblems: upgrades, abilities, status (cut-out)](#4j-emblems-upgrades-abilities-status-cut-out)
15. [4K. Effects (cut-out sequences)](#4k-effects-cut-out-sequences)
16. [5. Technical output](#5-technical-output)
17. [6. Shared negative](#6-shared-negative)
18. [7. Writing a subject line](#7-writing-a-subject-line)
19. [8. Production discipline](#8-production-discipline)
20. [9. Engine proof before library rollout](#9-engine-proof-before-library-rollout)

## 0. How to use

\`\`\`text
CELESTIAL FRONTIER - ART DIRECTION AND PROMPT KIT
style_id: frontier   |   version 4.3, 2026-09-13   |   one hand for the whole universe

Every image prompt is built in this order:
    REFERENCE LOCK  ->  FROZEN STYLE  ->  SYSTEM CARD  ->  SUBJECT
    ->  ACCURACY  ->  LAYOUT  ->  TECHNICAL OUTPUT  ->  NEGATIVE

Sections 1, 2 and 6 are identical in every prompt and are never reworded.
Section 3 is filled by the one compiler from game data and shared by prompts
for the same system, planet and vista inputs. Nobody types a system card.
Section 4 picks ONE class and supplies its LAYOUT, its OUTPUT and its
NEGATIVE ADDITIONS. Section 5 supplies the technical block for that class's
kind (cut-out or scene). Only the SUBJECT line and the system card change per
image.

RUNTIME PROJECTION: a local model without a negative input receives only the frozen style, the system card's Light, Mineral palette, Atmosphere and pigment lines, the subject, and the layout sentence. Reference-lock text, hashes, technical output and negatives are library-generator instructions and are never sent to such a model.

ACCURACY is used by the cut-out classes only (planets-orbital, flora, fauna,
ships, landmarks, items, emblems, effects, Arena MID and NEAR). Scene classes
including Arena FAR omit it. People are inactive
until the game has people, as section 4F states.

Two kinds of image, and they take opposite rules:
    CUT-OUT   one isolated subject on the key colour, composited in the game
              (orbital planets, flora, fauna, ships, landmarks, items, emblems,
               effects; Arena MID and NEAR use the arena key-painted exception)
    SCENE     a full-bleed painting with no isolation
              (universe, stars, planet biomes, Arena FAR)
Pasting a cut-out negative into a scene prompt, or the reverse, is the one
copy-paste mistake that quietly ruins a batch.

Nobody improves the wording at send time. One interpreter of these rules is
what makes image 1,200 match image 3.
\`\`\`

## 1. Reference lock

\`\`\`text
Paste in every prompt. Attach the ONE reference the class calls for, never both.

For cut-out classes (orbital planets, flora, fauna, ships, landmarks, items,
emblems, Effects; inactive people excluded; Arena MID/NEAR use the rule below):
  Match the exact visual language of the attached approved Discovery Atlas,
  audits/MIDGAME_ART_DIRECTION_20260908/01-discovery-atlas.png,
  style_id "frontier". Do not redesign or reinterpret the style. The atlas is
  a reference only: never crop artwork out of it. Its background, lettering
  and divided layout are not the output layout; use this class's own layout.
  SHA-256: c53add2993caba39b6dc12dc75d5d767be86896a7c41cfaa6c94f356e8d92a62

For scene classes (universe, stars, planet biomes, Arena FAR), and Arena
MID/NEAR key-painted terrain so all arena layers match the same biome hand:
  Match the exact visual language of the attached approved Living Worlds
  triptych, audits/MIDGAME_ART_DIRECTION_20260908/02-inhabited-worlds.png,
  style_id "frontier". Do not redesign or reinterpret the style. The triptych
  is a reference only: never crop artwork out of it. Its lettering and panel
  divisions are not the output layout; use this class's own layout.
  SHA-256: 68f03f0233ec2ca89ddf39238cfaf1a30b83027a58beaea9fbb1735273720a38

The four approved images in audits/MIDGAME_ART_DIRECTION_20260908 define the
art direction: 01-discovery-atlas.png, 02-inhabited-worlds.png,
03-earth-full-landfall.png and 04-alien-full-landfall.png. The existing atlas
and triptych above are the production reference locks; do not paint new locks.
Verify their original bytes against these SHA-256 values before use.
The local model's current riverbank output is a gap to close, not a reference.
\`\`\`

## 2. Frozen style

\`\`\`text
Paste this paragraph verbatim in every prompt. Approved by Nick at 6f5c396e.
Changes to the paragraph require a new kit version; never revise it at send time.

  Rich natural-history fantasy painting, one hand across every subject,
  tactile directional brushwork, believable connected anatomy, weathered rock,
  individual but grouped foliage, deep atmospheric layers, readable silhouettes,
  selective high detail, soft natural light shared by every subject, honest
  ground and water contact, subtle foreground occlusion, premium painted
  science-fiction with discovery and character; Earth species keep real
  anatomy, fur, feather and botany; alien life keeps its data-driven form and
  palette in the same hand; not plastic CGI, not photography, not cartoon,
  not oversharpened, no glowing outlines.

The scene-contact and occlusion language governs composed scenes. A cut-out
retains the same hand and anatomy while obeying its no-ground/no-shadow layout;
contact and shared atmosphere are resolved when composed and finished on a plate.
The companion rule in section 4E is retained for companion-flagged game data;
it does not change counts or the underlying genome.
\`\`\`

## 3. The one universe

\`\`\`text
The game data decides the subject and its palette. Star light falls across
that subject in the same painted hand. This table interprets existing data;
it never changes a seed, star kind, colour gene, body plan or biome.

THE STAR TABLE (exactly the thirteen starClass.kind keys)
Source: port/v2/packages/domain/starcatalog/src/index.ts, starClass and KIND_DESC.
Hex colours below are source values, not new generation colours. Pigment/light
words describe their painted rendition; radius and surface behaviour come from
the actual class data. A dark body is not made luminous by a pigment label.

  BD     #c98a6a  brown dwarf. Pigment: muted copper-brown, dusty sienna.
         Light: low warm copper, subdued contrast.
  M      #ff9a6a  red dwarf. Pigment: pale vermilion, warm salmon-orange.
         Light: warm red-orange, dim relative to the brighter star kinds.
  K      #ffd9a0  orange dwarf. Pigment: pale ochre, warm cream-gold.
         Light: soft golden-orange, warm diffuse fill.
  G      #fff4d8  yellow sun-like star; Sol pinned. Pigment: ivory, warm white.
         Light: near-neutral yellow-white, natural diffuse fill.
  A      #e8efff  hot white star. Pigment: pearl white with a faint blue cast.
         Light: cool white, pale blue fill.
  B      #9ab8ff  blue giant. Pigment: pale cobalt-blue, cool white.
         Light: blue-white, cool blue fill.
  PROTO  #ff9a5a  protostar in a dusty disk. Pigment: warm orange, ochre.
         Light: warm orange filtered by the source-described dusty disk.
  RG     #ff8a4a  swollen red giant. Pigment: orange-red, warm vermilion.
         Light: broad warm orange-red source.
  SG     #ff7a50  red supergiant. Pigment: coral-red, orange vermilion.
         Light: broad coral-red source, scale from its larger source radius.
  WD     #eef4ff  white dwarf. Pigment: chalk white with a faint ice-blue cast.
         Light: compact cool-white source.
  NS     #dceaff  neutron star. Pigment: pale ice blue, cool white.
         Light: compact blue-white source; source-described radiation beams
         are painted structure, not glowing outlines on organisms.
  MAG    #cfe0ff  magnetar. Pigment: pale blue, cool pearl white.
         Light: compact cool blue-white source; magnetic structure is painted
         with readable edges, not a second invented sun.
  BH     #9a86c8  stellar-mass black hole. Pigment: muted blue-violet, slate.
         Light: only surrounding source-described accreting matter emits;
         the central body stays dark. Apply the key rule at compile time.

BINARY AND TRINARY ARE LIGHT MODIFIERS, NOT STAR KINDS.
Read sys.binary and sys.trinary from worldgen; preserve the actual primary.
The binary companion colour is #ff9a6a or #ffd9a0, the third is #ff9a6a.
Compile their pigment through the same colour vocabulary, using their stored
radii and geometry for relative scale and light placement. Two sources yield
two shadows of two colours; three sources retain three directions, with
relative intensity carried by the data-derived composition. Never insert a
white dwarf or change the primary to fit a template. Nursery births and
remnants likewise retain the source's exact kinds and counts.

KEY RULE: reserve magenta, hot pink and violet-pink for the cut-out key.
Apply the exclusion only when compiling painted pigment words: map a seeded
hue in the reserved band to the nearest permitted pigment word for rendering.
Star colour hexes, genome values, names and identity remain unchanged. This
rule applies to painted star light, flora pigment, bioluminescence and hull
colour; it does not rewrite the game's palette or rarity colours.

THE SYSTEM CARD (compiler output schema; never a hand-filled example)

  SYSTEM CARD - <source system identity/name>
    Star: <starClass.kind, KIND_DESC and source colour via the table above>
    Light: <star and companion data, vista day/twilight/night, atmosphere;
       composition direction, softness and shadow colour derived from inputs>
    Mineral palette: <planet type plus hue, seaHue, landHue and ice genes>
    Atmosphere: <vista palette, climate and weather data>
    Flora pigment: <biome flora/form routing plus species colour/finish genes>
    Fauna adaptation: <biome fauna family/realm routing and actual genome
       body plan, skin, eyes, pattern and colour; never invented anatomy>
    One signature: <source biome hazard expressed as a visible physical fact>

Star and planet owners: packages/domain/starcatalog, worldgen and planetgen.
Vista owner: apps/game/src/biome-vista-surface.ts. Biome owner:
packages/domain/biome-profile; species/genome/descriptor and art-routing owners
supply organism form and palette. All paths are under port/v2. The day flag
is seeded input, never a wall-clock read. Missing source fields are reported,
not filled with an invented system or an invented class.

For space-only prompts, compile only Light and One signature from the actual
cosmic object's source data; do not invent planet or biome data for it.
The same admitted inputs produce the same card. A changed planet/vista gets
its own derived context while keeping system/star identity. Every subject in
one scene shares this context, so it sits on its own planet's biome plate.

LIVE VOCABULARY: use GAME_VOCABULARY_COVERAGE.md in
audits/CLAUDE_FULL_REVIEW_20260910/ as the source map.
Active planet types are gas, rocky, desert, ice, terran, ocean, venus and lava.
Use the 43 live biome keys, actual creature family/realm routing, flora/fungi/
microbe forms and named Earth species. Design-only biome packs are not rows.
Every queued subject must resolve to a current source key; class layouts and
size allowances below do not create catalogued objects. People are not active.
No new star, organism, ship, item, ability or rarity class is invented here.
\`\`\`

## 4A. Universe (scene)

\`\`\`text
WHAT: nebulae, star fields, the galactic band, distant clusters, debris fields,
wrecks adrift: the backdrop a player sees while travelling. Full-bleed scenes,
never cut-outs.

SUBJECT SLOT, in this order:
  the one dominant form (a nebula wall, a dust lane, a shattered moon belt);
  its colour named by pigment, never by glow ("deep alizarin and violet dust,
  cold bone-white core"); the scale cue that makes it read as vast (a
  silhouetted rock, a ship, a moon at the edge, tiny and dark); the depth
  layers, near to far; the single brightest point and where it sits.

LAYOUT (paste):
  A full-bleed painted deep-space vista, no subject isolated and no cut-out.
  Wide cinematic composition with a clear focal point off-centre, three
  readable depth layers from near silhouette to far field, and one light
  source that governs the whole image. Horizon-free. Painted values, with the
  darkest darks still holding detail.

NEGATIVE ADDITIONS:
  No photographic star field, no telescope-photograph look, no HDR bloom, no
  lens flare, no chromatic aberration, no anamorphic streaks, no perfectly
  circular bokeh stars, no Earth constellations, no planet surface, no
  characters, no ships unless named, no text or UI.

OUTPUT: scene block (section 5), 2560 x 1440.
\`\`\`

## 4B. Stars (scene)

\`\`\`text
WHAT: a system's sun seen close: in the sky, as a binary pair, as a dying
ember, with an accretion disc. Also the authority for the light in every other
image of that system.

SUBJECT SLOT, in this order:
  the star table row and its pigment words; the surface behaviour
  (granulation, plumes, spots, arcs); the corona painted as structured shape,
  not haze; anything around it (disc, ring, companion, silhouetted planet);
  what the light does to the frame edges.

LAYOUT (paste):
  A full-bleed painted star, centred or thirds-placed, occupying no more than
  half the frame so its scale reads. Structure visible in the surface and the
  corona, both painted as shapes with edges rather than as blur. One
  silhouetted foreground element for scale. No planet surface, no horizon.

NEGATIVE ADDITIONS:
  No lens flare, no starburst spikes, no volumetric god rays, no bloom, no
  photographic solar imagery, no fire-texture overlay, no smooth airbrushed
  gradient, no white-hot blown-out core without structure, no text or UI.

OUTPUT: scene block, 2560 x 1440.
The colour painted here IS the Light line of the system card. Every other image
in the system inherits it.
\`\`\`

## 4C. Planets (orbital cut-out, biome scene)

\`\`\`text
WHAT (i) ORBITAL: the world as a body, seen on approach and in the system map.
WHAT (ii) BIOME: the surface, the painted environment a player explores.

ORBITAL - SUBJECT SLOT, in this order:
  body type and size; the surface pattern read from orbit (bands, seas,
  craters, ice caps, dust storms, night-side lights); the mineral colours from
  the system card; cloud behaviour; rings or moons; the terminator, and which
  limb the star lights.

ORBITAL - ACCURACY (paste and fill):
  Anatomy/count constraints: <moons, rings, bands: every count stated twice>.
  Must include: the whole disc; a lit limb and a night limb.
  Must exclude: ground; scenery; text; a ship; a second body unless named.
  Scale relationship: <a body of this class against the frame>.

ORBITAL - LAYOUT (paste):
  One isolated planet, centred, rendered as a sphere with a clearly lit limb
  and a soft terminator inside the disc, lit from <direction> by the system's
  star. The night-side limb is still a crisp opaque edge against the
  background; only the terminator inside the disc is soft. Surface pattern
  readable at small size. No ship, no character, no UI, no orbital furniture
  unless named.

ORBITAL - OUTPUT: cut-out block, 1024 square.

BIOME - SUBJECT SLOT, in this order:
  the landform that defines it; ground material by colour and sheen; this
  system's flora in the mid-ground, named from the card; the atmosphere tint
  and how far it washes out distance; weather in motion; one point of scale
  (a lone figure, a wreck, a stand of growth) small and silhouetted; the sun's
  position and the shadow direction it forces.

BIOME - LAYOUT (paste):
  A full-bleed painted landscape of the planet surface, wide composition,
  three depth layers, a low horizon giving the sky two thirds unless the brief
  says otherwise, and one light source consistent with the system card. Every
  shadow falls the same way. Painted atmospheric perspective, cooling and
  washing out with distance. Leave the lower third quiet enough that cut-out
  flora, landmarks and creatures can be composited onto it.

BIOME - OUTPUT: scene block, 2560 x 1440.
  For a scrolling or parallax scene, paint three separate plates for the same
  biome (far, mid, near), each at the full 2560 x 1440 with its own brief,
  never one plate sliced.

NEGATIVE ADDITIONS (both profiles):
  No Earth continents or recognisable Earth geography unless the source names
  Earth, no blue sky with white cumulus unless named, no photographic satellite
  imagery, no
  visible tiling or repeated texture, no UI, no waypoint markers, no text, no
  characters other than the one scale figure if named.
\`\`\`

### Arena scene profile

\`\`\`text
WHAT (iii) ARENA: a procedural combat environment assembled from a biome-family
  template and the same compiler-filled system card and frozen style as its
  biome plate. The template is reusable; the battle context supplies its seed.

ARENA - SUBJECT SLOT, in this order:
  source biome family and defining landform; fighting-ground material and
  sheen; system-card light, mineral palette, atmosphere, weather and time of
  day; the home world's physical signature; the requested depth plate
  (far, mid or near). No combatants are painted into the arena.

ARENA - LAYOUT (paste):
  A wide, side-view painted fighting stage at low eye level, with a flat,
  continuous fighting-ground band and clear combatant stands at the left
  and right thirds. Compose for two opposing creatures, each one third to
  one half of frame height. Keep their silhouettes and run-up path clear.
  Put atmospheric depth behind the fight, with no competing foreground.
  Use one shared horizon, ground registration and system-card light direction
  across all three plates. Every shadow agrees with that light.
  Fighting-ground line: y = 0.78 in normalized full-frame coordinates,
  measured down from the top; record it in the arena recipe for all layers.
  Stands, paws, contact shadows and impact anchors register to this line.
  FAR: distant landforms, sky and atmosphere behind the combatants.
  MID: the fighting ground, horizon band and restrained biome landmarks
  behind the stands; flat magenta key above and outside this terrain content.
  NEAR: a quiet ground edge that supports parallax without covering the stands,
  paws, effects or fighting path; flat magenta key above its content.
  Parallax must not reveal gaps between plates.

ARENA - OUTPUT:
  Three separately painted 2560 x 1440 masters per biome-family template,
  each with its own brief; never one image sliced. FAR uses the full-bleed
  opaque scene block. MID and NEAR use the Arena key-painted technical block:
  flat magenta above/outside the terrain, keyed at intake like cut-outs.
  No extracted masks. Preserve the original key-painted master bytes.

ARENA MID/NEAR - ACCURACY:
  Must include: one continuous terrain layer, the shared ground registration
  and the flat key field above its content; clear stands and fighting path.
  Must exclude: sky painted into the key, creatures, props across the path,
  detached terrain tiles, checkerboards and imitation transparency.

ARENA - NEGATIVE ADDITIONS:
  No characters, resident creatures, scale figures, baked-in attack effects,
  UI, timing bar, labels, steep or broken fighting ground, competing foreground,
  obstacles on the fighting path, inconsistent perspective or mismatched light.
\`\`\`

## 4D. Flora (cut-out)

\`\`\`text
WHAT: source-owned flora, fungi and microbe forms, and named Earth botany:
stalks, canopies, fungal towers, mineral corals, drifting seed forms. Painted
as cut-outs for gameplay and for
compositing onto biome plates.

SUBJECT SLOT, in this order:
  the growth plan stated as a count ("five stalks, three tall and two short");
  scale against a human; the pigment from the system card's flora line, named
  as a paint colour, never as "alien colours"; the surface by colour and sheen
  ("waxy blue-black membrane", "matte chalk-white mineral crust"); how it
  anchors to the ground; what it does when disturbed, if that shows; any
  bioluminescence, painted as a solid crisp-edged shape, never a soft bloom;
  "NOT a <Earth plant>" only for a drift already seen.

ACCURACY (paste and fill):
  Anatomy/count constraints: <stalks, fronds, caps, pods: every count twice>.
  Must include: the complete growth from base to crown; its anchoring base.
  Must exclude: ground; floor plane; cast shadow; soil mound; pot; scenery;
  text; a second specimen; an insect or animal.
  Scale relationship: <against a human>.

LAYOUT (paste):
  One isolated plant or growth, centred, full height, weighty and readable,
  shown in three-quarter view with its anchoring base visible. Entire form in
  frame. No floor plane, no soil mound, no pot, no companion plant.
  Framing target: 78 percent. Safe margin: at least 10 percent on every side.

NEGATIVE ADDITIONS:
  No flower-shop bouquet forms,
  no potted plant, no soil clump, no insect visitors, no second specimen, no
  gardening context, no glow used as an effect rather than painted as shape.

OUTPUT: cut-out block, 1024 square; a canopy-scale growth that fills the
battle screen, 1536 square.
\`\`\`

## 4E. Fauna (cut-out)

\`\`\`text
WHAT: every animal, companion, hostile and planetary guardian. The most
error-prone class, so its brief is the strictest.

SUBJECT SLOT, in this order:
  body plan and size against a human; the limb and head counts, each stated
  twice ("six legs, three on the near flank and three on the far"); materials
  by colour and sheen (fur, feather, chitin, membrane, hide, mineral plate),
  with the colour from the system card's fauna line; how it moves and what that does to its
  build; its natural weapons, named as anatomy and matched to what it actually
  does in combat; any gear, harness or growth it carries, or "no armour, no
  harness" outright, because a tough creature is otherwise painted in steel;
  bioluminescence painted as solid crisp-edged shape; and the face last, part
  by part (eye size and number, brow, jaw, mouth) with a named expression,
  because anatomy and gear alone paint a placid face. "NOT a <x>" only for a
  drift already seen.

ACCURACY (paste and fill):
  Anatomy/count constraints: <every count, twice>.
  Must include: the complete creature from head to tail or feet; every limb
  described.
  Must exclude: ground; floor plane; cast shadow; base; scenery; text; a second
  creature; a companion unless described; extra or missing limbs; top-down view.
  Scale relationship: <man-sized / towering over a human / a fraction of human
  height>.

LAYOUT, TOKEN POSE (paste; the gameplay image):
  One isolated standing full-body creature, centred, weighty and readable,
  shown front-to-three-quarter in a clear action-ready pose. Entire anatomy
  and any carried equipment visible. No floor plane.
  Default facing: south/front with slight three-quarter turn.
  Framing target: 80 percent. Safe margin: at least 8 percent on every side.

LAYOUT, TURNAROUND (paste; the animator's image, generated only after the
token pose is approved, from the same brief):
  The same creature three times in one row on the same baseline: front view,
  true side view facing left, back view. Neutral standing pose, limbs
  separated and not overlapping the body, mouth closed, no motion. Identical
  scale in all three. No labels, no arrows, no numbers.
  Output: a 2:1 image, 2048 x 1024, on the key colour.
  Add to the negative: no action pose, no overlapping limbs, no three-quarter
  view, no fourth figure.

THE COMPANION RULE (only for companion-flagged game data):
  A creature flagged as a companion in its data adds one line to its brief:
  "built to be kept: rounder mass, a larger eye, a readable and friendly
  expression, still painted with the same weight and material truth as every
  other creature, never a mascot, never chibi." Hostiles and guardians never
  carry that line. Both come off the same sheet in the same hand.

THE GUARDIAN RULE:
  Applies to source-owned apex guardians (raw grades 12 to 14), not a new
  display rarity; all three display as Transcendent.
  A planetary guardian is painted at 1536 square, fills the battle screen, and
  carries the system's One signature on its body (the black glass, the ring
  shadow, the mineral shards). Its focal detail is more ornate than any other
  creature in the system, and its face is named part by part with a temper
  the player should fear.

THE MORPH RULE (breeding and variants):
  A colour morph is the parent's brief with ONLY the colour and pattern lines
  changed, and this sentence added: "identical to <parent> in body plan,
  counts, pose and gear; only the colouring differs." Never redescribe the
  body. A morph's turnaround is not regenerated; the parent's stands.

NEGATIVE ADDITIONS:
  No default bipedal humanoid stance unless named, no armour plating the brief did
  not ask for, no human eyes, no weapons held in hands unless named, no rider,
  no second creature.
  Do not add a blanket oversized-head ban that would fight a data-owned
  companion brief.

OUTPUT: cut-out block, 1024 square; guardians 1536 square. A big creature
shipped small goes visibly soft on screen.
\`\`\`

## 4F. People (cut-out)

\`\`\`text
STATUS: NOT APPLICABLE until the game has people. No people rows may be
queued or painted. The layout below is retained as an inactive template, not
a claim that the current generator produces people.

SUBJECT SLOT, in this order:
  species and build; "one head, two arms, two hands, two legs" or the alien
  counts stated twice; skin or carapace by colour and sheen; the suit or dress
  by material ("scored cream ceramic plates over woven grey fibre, patinated
  green alloy fittings"), with visible field repair; carried tools and what
  hand holds what; the face last, part by part, with a named expression that
  fits the role (a trader's appraising squint, a guardian-priest's serenity).

ACCURACY: as fauna, with "footwear" and "all carried equipment" in Must include.

LAYOUT: the fauna TOKEN POSE, unchanged. A person who needs a portrait for
dialogue is cropped from the approved full-body master, never painted twice.

NEGATIVE ADDITIONS:
  No helmet hiding the face unless named, no glowing visor, no chrome
  spacesuit, no rifle unless named, no modern Earth clothing, no logo, no
  second person, no weapon merged into a hand.

OUTPUT: cut-out block, 1024 square.
\`\`\`

## 4G. Ships (cut-out)

\`\`\`text
WHAT: the player's four source-owned ship stages: Scout, Jump, Survey Cruiser,
Frontier (apps/game/src/shipyard-preview.ts). Other size/layout allowances
are inactive unless a matching current source record exists; do not invent
a ship class to exercise a template.

SUBJECT SLOT, in this order:
  hull class and size against a human (a figure is not painted; the scale is
  stated); the silhouette in one sentence; hull material by colour and sheen
  with wear ("sun-scoured cream ceramic, scored, with rust-red patch plates
  and cord-lashed cargo"); the drive, painted as structure and not as flame;
  what makes it this ship and not another (the One signature of its origin
  system if alien); the direction it faces.

ACCURACY:
  Anatomy/count constraints: <engines, wings, pods, hatches: counts twice>.
  Must include: the complete hull; both ends; landing gear or its absence.
  Must exclude: ground; scenery; text; a pilot; a second ship; motion lines;
  exhaust plume; a planet behind it.
  Scale relationship: <stated against a human>.

LAYOUT (paste):
  One isolated vessel, centred, shown in a three-quarter view from slightly
  above, nose to the lower left, entire hull in frame with every functional
  part readable. No background, no floor plane, no exhaust, no motion.
  Framing target: 76 percent. Safe margin: at least 10 percent on every side.

NEGATIVE ADDITIONS:
  No glossy chrome, no clean factory finish, no glowing engine flame, no
  neon light strips, no film-franchise silhouette, no text or insignia
  unless named, no cockpit interior.

OUTPUT: cut-out block, 1024 square; a capital or guardian vessel 1536 square.
\`\`\`

## 4H. Landmarks and props (cut-out)

\`\`\`text
WHAT: the things placed on a biome plate: ruins, outposts, resource nodes,
guardian lairs, wrecks on the ground, crystal outcrops, nests. This is how a
procedurally generated world gets its furniture without repainting the plate.

SUBJECT SLOT, in this order:
  the object and its size against a human; its material by colour and sheen
  from the system's mineral palette; its state (intact, half-buried,
  collapsed); what it is for and how a player reads that at a glance; its
  contact with the ground, painted as its own base, never as a floor plane.

ACCURACY: as flora. Must include: the whole object and its ground contact.

LAYOUT (paste):
  One isolated landmark or prop, centred, shown in three-quarter view from
  slightly above so it sits correctly on a painted ground, its own footprint
  visible. Entire object in frame. No surrounding terrain, no sky, no figure.
  Framing target: 78 percent. Safe margin: at least 10 percent on every side.

NEGATIVE ADDITIONS:
  No terrain beyond the object's own footprint, no sky, no horizon, no
  character, no creature, no signage, no UI marker, no second object.

OUTPUT: cut-out block, 1024 square; a landmark that fills the battle screen,
1536 square.
\`\`\`

## 4I. Items, loot and resources (cut-out)

\`\`\`text
WHAT: everything a player picks up: raw resources, crafted parts, tools,
weapons, salvage, artefacts, eggs.

SUBJECT SLOT, in this order:
  the object in plain words (name the object, never the idea: "a hand-sized
  hexagonal cell of pale green crystal in a scored copper cage", never
  "energy"); material by colour and sheen; wear and repair; the one feature
  that identifies it at icon size; its rarity by material and ornament (see
  the rarity rule), never by a glow.

ACCURACY:
  Anatomy/count constraints: <parts: counts twice where they matter>.
  Must include: the complete object; both ends of any haft or blade; its
  material.
  Must exclude: ground; floor plane; cast shadow; base; scenery; text; a
  person; hands; a display stand; a duplicate of the object.
  Scale relationship: proportioned as the real object; no exaggerated scale.

LAYOUT (paste):
  One isolated item only, centred on a diagonal or clean profile, fully
  visible with no hand, wearer, display stand, pile or companion item.
  Materials and functional geometry are unambiguous.
  Default facing: diagonal, lower left to upper right.
  Framing target: 74 percent. Safe margin: at least 12 percent on every side.

THE RARITY RULE:
  Source: RARITY_V17 and displayRarity in
  port/v2/packages/domain/speciestraits/src/speciestraits.verbatim.js.
  Ten display tiers map in adjacent pairs onto five material treatments:
    0 Common       / 1 Uncommon     plain working material, scuffed, no ornament
    2 Notable      / 3 Rare         one deliberate fitting in a second material
    4 Exotic       / 5 Legendary    worked surface, engraved or inlaid,
                                   one contrasting stone
    6 Mythic       / 7 Celestial    precious material as the body (the system's
                                   crystal, a blue-hued exotic wood, patinated
                                   gold), ornament on every edge
    8 Primordial   / 9 Transcendent a relic: a material that exists nowhere else
                                   in the system, and the system's One
                                   signature worked into it
  These are material treatments, not new rarity tiers. Raw grades 10 to 14
  retain their identity and display as Transcendent via the existing clamp.
  Source rarity hexes belong to the interface, never to a ring painted into
  the object. Organism anatomy and colours remain data-owned.
  No glow, no aura, no coloured rim on the object for rarity. The interface
  does that.

NEGATIVE ADDITIONS:
  No hand, no wearer, no pile, no stand, no glow or aura, no rarity colour
  ring, no floating, no sparkle, no text.

OUTPUT: cut-out block, 512 square.
\`\`\`

## 4J. Emblems: upgrades, abilities, status (cut-out)

\`\`\`text
WHAT: non-physical things that need an icon: ship and suit upgrades, creature
abilities, battle moves, status effects, scanner results, achievements.

SUBJECT SLOT, in this order:
  the concept as ONE period-correct object or contained effect ("a coil of
  copper wire around a cracked cell", "a fist of black chitin", "frost as a
  solid crisp-edged shape on a fist-sized stone"), never the abstract word;
  its material by colour and sheen; its single readable silhouette; for a
  status effect, the effect as an object, not on a body.
  Emblems for one family (all fire moves, all shield upgrades) share one
  object family and differ in one named part, so they read as a set.

ACCURACY:
  Must include: one readable emblem that identifies the concept at icon size.
  Must exclude: ground; floor plane; cast shadow; base; scenery; text; a
  person; hands; a scene; lettering or runes that spell real words.

LAYOUT (paste):
  One isolated item-icon-style emblem or contained effect representing the
  named non-physical concept, centred, wordless, painted as a solid object
  with a crisp edge.
  Framing target: 74 percent. Safe margin: at least 12 percent on every side.

NEGATIVE ADDITIONS:
  No lettering, no numerals, no arrows, no flat vector style, no UI glyph
  look, no glow used as the icon, no person, no hands, no scene.

OUTPUT: cut-out block, 512 square; status and condition icons 256 square.
\`\`\`

## 4K. Effects (cut-out sequences)

\`\`\`text
WHAT: painted ability-theme effect sequences with launch, travel and impact
  phases, using the unchanged frozen style. The source theme keys are:
  fire (Fire), frost (Frost), storm (Storm), tide (Tide), stone (Stone),
  venom (Venom), void (Void), sand (Sand), chem (Chem), psionic (Psionic),
  wild (Wild). Use only the theme and ability selected by game data.

THEME MATERIAL TABLE (closed):
  Use the selected theme's material and shape vocabulary below. Material
  carries the theme identity. The game's theme hex is an accent only, never
  the body colour of the effect. Do not change the game's theme hexes.
  Wild uses warm ochre and earth tones, with #9fb6d6 as a sheen only.

| Theme | Material and shape vocabulary | Accent (game hex) |
|---|---|---|
| Fire | flame tongues, embers, char, heat shimmer as shape | #ff7a4a |
| Frost | ice shards, rime, frozen mist, crystal shatter | #8fd6ff |
| Storm | forked arcs, charged dust, cloud rupture | #ffe06a |
| Tide | water sheets, spray, foam crest | #5fd0c8 |
| Stone | rock shards, grit, cracked ground | #caa06a |
| Venom | droplets, spatter, corroding film | #9fe06a |
| Void | torn dark, inhaled debris, collapse ring | #b58cff |
| Sand | grain streams, scour, dune spill | #e8c878 |
| Chem | fizzing foam, reactive spray, etched surface | #c0ff5a |
| Psionic | concentric ripples, warped air, snap ring | #ff9fe0 |
| Wild | claw rake, fur tufts, torn leaves, kicked earth, wind streaks; warm ochre and earth tones | #9fb6d6 as a sheen only |

SUBJECT SLOT, in this order:
  source ability theme and the physical action it represents; material and
  palette from the theme material table; sequence phase (launch, travel or impact); the phase's strong shape
  and direction of motion; its origin or contact anchor and relative scale.
  Keep the same painted material, palette, direction and scale relationship
  across the sequence. A melee travel phase may be a short directional sweep;
  it need not invent a projectile for an ability that does not have one.

ACCURACY:
  Must include: a readable theme-specific effect silhouette in each phase,
  with shared anchors and consistent scale for runtime sequencing.
  Must exclude: creatures, body parts, scenery, ground, cast shadows, text,
  symbols used as labels, UI and a baked-in target.

LAYOUT (paste):
  One isolated phase of the named ability effect, painted as a crisp-edged,
  fully opaque shape against the flat pure magenta key (#FF00FF). Keep the
  entire shape within the frame with room for its motion. Paint energy,
  spray, dust and impact as bounded shapes and grouped marks in the frozen
  hand, with no halo or soft haze bleeding into the key. Keep the canvas size,
  registered origin/contact anchor and scale consistent between phase images.
  Runtime placement and tweening connect the phases; do not paint a battle
  scene or generate a contact sheet.

NEGATIVE ADDITIONS:
  No magenta or pink within the effect, soft transparent fringe, photographic
  particles, lens flare, glowing outline, baked motion blur, lettering,
  frames, scenery, body parts or duplicate phase images in one output.

OUTPUT:
  Cut-out block, 1024 square per phase master, subject to section 5's existing
  authoring-target and runtime-input admission rule. Deliver launch, travel
  and impact as separately named images. Deliver one anchor JSON per sequence
  recording canvas size, origin and contact anchors, phase order and each
  phase image name; normalized anchors are measured from the top-left.
  Any extra key images use the same registration. Review sheets
  and runtime effect atlases are assembled from these masters after intake.
\`\`\`

## 5. Technical output

\`\`\`text
ONE SIZE PER CLASS. A browser game scales at draw time, so each asset is one
file at one size, and the game shrinks it for thumbnails and grids. The rule
behind the numbers: ship at twice the largest size the asset is drawn on
screen, so it stays sharp on high-density displays. Generate at this size,
keep that file as the master, ship it as WebP.

  fauna, people, flora, props, ships ........ 1024 square
  Effects phases (cut-out) .................. 1024 square
  guardians, capital ships, screen-filling
     landmarks and canopies ................. 1536 square
  orbital planets ........................... 1024 square
  items, loot, emblems ...................... 512 square
  status and condition icons ................ 256 square
  fauna turnaround (animators only) ......... 2048 x 1024
  universe, stars, biome plates, parallax
     layers ................................. 2560 x 1440
  Arena FAR (scene), MID and NEAR
     (key-painted terrain) .................. 2560 x 1440

Section 5 sizes are authoring targets. A master is accepted at any size at or above the runtime input size for its class (currently 384 square for cut-outs and 1024x576 for plates); the intake check records the delivered size.

  A transparent creature WebP lands near 150 KB and a biome plate near 600 KB.

WHAT THE MAGENTA IS. It is a keying background, the same idea as a green
screen: the painter puts the subject on a flat magenta field, and a script
removes every magenta pixel to leave transparency. Magenta never appears in a
finished asset, and nothing the player sees is pink. It was chosen because it
is the colour least present in painted natural subjects, and the star table's
key rule keeps it out of this universe's palette entirely, so the keyer never
removes part of a subject by mistake.

THE DECISION: the key stays, even for a generator that claims transparency.
Asked for transparency, generators paint checkerboards into the pixels or
leave soft halos, and neither can be measured. Keyed magenta is deterministic
and the result is checked by reading the file. The token library's keyer and
its gate script are reused as they are. The one exception is an API model that
demonstrably emits a true alpha channel: test ten images, check every file for
a baked checkerboard and for a halo, and switch only if all ten are clean.

CUT-OUT BLOCK (paste for orbital planets, flora, fauna, people, ships,
landmarks, items, emblems, Effects; put the class's size in place of 1024 where the
table says 1536, 512 or 256):
  Create a square 1024 x 1024 PNG. Every pixel that is not the subject is one
  flat, uniform, pure magenta fill (#FF00FF): no gradient, vignette, texture,
  noise, checkerboard or transparency pattern, and no ground, base, frame,
  scenery or cast shadow. The subject's outline is crisp and fully opaque
  against the magenta, with no glow, haze, smoke or soft feathering bleeding
  into it, and nothing on the subject is magenta or pink. The magenta is keyed
  out afterwards to produce the transparent asset.

SCENE BLOCK (paste for universe, stars, planet biomes):
  Create a 2560 x 1440 painted image, full-bleed to all four edges, opaque,
  with no transparency, no border, no frame and no margin. Do not repaint or
  crop during export.

Glow is painted as shape in both kinds, or the cut-out eats the creature's
edge and the scene goes muddy.

Arena FAR uses the SCENE BLOCK above. Arena MID/NEAR use the cut-out
technical method with the terrain-specific block below; their landscape
canvas and ground content replace the object block's square/no-ground rules.

ARENA KEY-PAINTED BLOCK (paste for Arena MID and NEAR):
  Create a 2560 x 1440 PNG terrain layer. Paint the named ground/horizon
  content with a crisp fully opaque edge; every pixel above or outside it
  is flat uniform pure magenta (#FF00FF), with no gradient, texture, noise,
  checkerboard, transparency pattern, frame or halo. No painted sky in the
  key field and no magenta/pink in the terrain. Key at intake like a cut-out;
  do not extract masks from an opaque scene. Preserve full-frame registration
  at fighting-ground y = 0.78; do not crop or recenter the layer.
\`\`\`

## 6. Shared negative

\`\`\`text
Class routing: CUT-OUT means orbital planets, flora, fauna, ships, landmarks,
items, emblems and Effects (people remain inactive). SCENE means universe,
stars, planet biomes and Arena FAR. Arena MID/NEAR use the key-painted
terrain exception below.

Paste in every prompt, then add the class's NEGATIVE ADDITIONS.

  No text, letters, numbers, watermark, signature, border, frame, grid, UI
  element, health bar, minimap, waypoint, token ring, base, pedestal,
  photorealism, anime, chibi styling, cel shading, 3D render, plastic toy
  sheen, airbrushed gradients, duplicate subject, unintended companion, extra
  limbs, missing limbs, malformed hands, cropped anatomy, or contact-sheet
  layout. No lens flare, no chromatic aberration, no holographic UI
  projections, no glowing outlines or rim light used as an effect.

  For CUT-OUT classes, add:
  No scenery, no floor plane, no cast shadow, no drop shadow, no white
  background, no checkered background, no baked transparency pattern.
  Background must be one flat uniform magenta fill and nothing else.

  For SCENE classes, do not add those clauses. They will fight the scene.

  For Arena MID/NEAR, replace those object-isolation clauses with:
  No painted sky or scenery outside the specified terrain layer; no
  characters, detached display base, white background, checkered background,
  baked transparency pattern or soft fringe bleeding into the key. The field
  above/outside the terrain must be flat uniform magenta. Ground, horizon
  band and terrain shadows are intentional content, not forbidden scenery.
\`\`\`

## 7. Writing a subject line

\`\`\`text
The eight rules, each one bought with a re-roll on the fantasy library.

  1. Name the object, never the idea. "Time" paints a pocket watch. A ban does
     not paint; a named object does.
  2. Name every material by colour and sheen. "No metal" produces grey steel.
     "Matte cream chitin" and "glossy black obsidian" do not.
  3. Say what it is NOT only after you have seen the drift: "NOT a lizard",
     "no eyestalks". Saying it early primes the very thing you banned.
  4. State every count twice: "six legs, three near and three far".
  5. Name the face part by part and give it an expression. Anatomy alone
     paints a placid face.
  6. Name the colour and the body plan. Nothing is left to the painter; the
     anchor's own palette will tint whatever you leave open.
  7. A fallback phrase must fit every body it can reach. "Ears up" gave a
     flying snake ears.
  8. Paint glow as a shape with an edge. Soft bloom does not survive a cut-out
     and muddies a scene.

  And one for this universe: every colour in a brief traces back to the system
  card. If you cannot say which line of the card a colour came from, it does
  not belong in the brief.
\`\`\`

## 8. Production discipline

\`\`\`text
What keeps a library of thousands from drifting. Each of these is a rule the
fantasy library learned by losing a day.

  ONE INTERPRETER. Prompts are generated from game data by one tool and sent
  verbatim. Nobody rewords at send time. A brief is fixed in the generator,
  and the changed set of prompts is checked to be exactly the rows intended.
  HASH EVERY PROMPT. Store the SHA-256 of the exact text sent with the image
  it produced. A prompt that cannot be reproduced is not a prompt.
  KEEP EVERY CAPTURE. The untouched generator output, magenta and all, is
  archived before anything is keyed or converted. A better keyer then
  re-applies to the whole library for free.
  NEVER OVERWRITE AN APPROVED IMAGE. Retire it under its date and reason;
  filenames never carry a version number, so the game picks up a revision
  without rewiring.
  FILENAMES ARE THE WIRING. The game resolves art by a path derived from the
  document key (creature.ember-strider -> fauna/ember-strider.webp). Drop a
  file, the entry upgrades. No manifest to maintain.
  REVIEW EVERYTHING, NEVER A SAMPLE. Lay every master out on labelled contact
  sheets in generation order and look at every one. Judge: right subject,
  right counts, one isolated figure, the house hand, no bleed. When one is
  wrong, fix the class it belongs to, not just the row.
  PIXELS ARE THE ARBITER. An image viewer misleads on faint pink and green. An
  automated intake check reads the file: real alpha, no halo, square, right
  size, framed inside the margin, filename matches a row.
  REFUSALS. A refusal at output is random: retry once. A refusal at input is
  deterministic: change the brief. A row refused twice on a corrected brief
  is dropped and noted.
  REVISION. A polish (image-to-image from the approved capture) lands two or
  three targeted asks and drifts elsewhere. Once the brief text itself
  changes, generate fresh.
  SETTINGS NEVER MIX. If the game ever gets a second visual world (a
  different galaxy, a dream realm), it is a second collection with its own
  anchor, references, queue and sessions. Nothing is reused across them.
\`\`\`

## 9. Engine proof before library rollout

\`\`\`text
  a. Nick approved v4 at 6f5c396e, subject to this engine-first order. Use the
     existing Discovery Atlas and Living Worlds locks in section 1. No v3
     painting and no replacement style locks. Keep the 4E turnaround unchanged.
  b. Paint only the first engine painting's inputs: the Earth temperate biome
     plate; six Earth cut-outs (Civet, Platypus, Frog, Persimmon, Cranberry,
     Devil's Club); five family references (mammal quadruped, bird, fish,
     insect, reptile). Show Nick the sheets of these twelve individual masters.
  c. On the first cut-out batch, inspect every image for frames or dark plate
     backgrounds inherited from the Discovery Atlas. If any appear, propose
     a one-sentence v4.1 addition to the cut-out block and STOP for Nick's
     approval. Do not apply that addition or repaint before approval.
  d. The one compiler fills every card and subject slot from actual game data.
     No hand-typed card, invented class or design-only biome row. Attach the
     atlas to cut-outs and the triptych to scenes, never both in one session.
     Use complete applicable class blocks and preserve exact prompt hashes,
     untouched captures, layouts, sizes and keying rules. Review every master.
  e. Immediately after the bounded first inputs, build the local AI pipeline:
     one interpreter in landfall-conditioning.ts; offline pre-fit/hash of the
     six Earth cut-outs and biome anchor; unfreeze steps, seed and size;
     per-organism passes composed on the plate and one low-strength finisher
     in stage-worker.mjs. Keep sessions warm across landings and build the VAE
     encoder once. In-worker expansion replaces OPFS variant storage. Show
     the first measured native painting beside the Living Worlds triptych
     with a bounding box and identity finding for every organism. No six-reference scene-generator prompt sweep.
  f. After Nick accepts the first engine painting, complete the Animation and
     battle track in CODEX_HANDOFF.md before the remaining library rollout.
     A v4.1 Effects cut-out class is a proposal requiring Nick's approval
     before painting any effect. No effect class is activated by this section.
  g. Only after engine-painting acceptance and the animation proof, roll out
     remaining families, forms and biome plates twelve images at a time,
     showing every sheet. Exact source keys decide rows, not count estimates.
\`\`\`
`,p=`cf.art.landfall-snapshot.v1`,m=`canonical-earth-epoch0-six-residents-v1`,h=Object.freeze({ok:!1,reason:`unproven-roster`}),g=Object.freeze({ok:!1,reason:`unsupported-recipe`});function _(e){if(typeof e==`object`&&e){for(let t of Object.values(e))_(t);Object.freeze(e)}return e}function v(e,t){if(!a(t))return h;try{let n=d(e),r=d(t),i=c(n,r);if(i===null)return g;let{view:a,...o}=r,s=_({schema:p,recipeId:m,qualityAccepted:!1,request:n,roster:{...o,view:{all:a.all,total:a.total}},displayPlan:d(i)});return Object.freeze({ok:!0,snapshot:s,canonicalJson:JSON.stringify(s)})}catch{return g}}var y=`cf.art.landfall-conditioning.v1`,b=`cf.art.named-earth-diagnostics.v1`,x=`cf.art.cohesive-natural-history.v1`;function S(e){if(typeof e==`object`&&e){for(let t of Object.values(e))S(t);Object.freeze(e)}return e}var C=S([{id:`earth-civet-v1`,name:`Civet`,kingdom:`fauna`,family:`mammal`,taxon:`viverrid`,sourceOwners:[`art/mammaloverrides.ts#QUAD2_SPEC.Civet`,`art/quadrupedoverrides.ts#mammalDViverrid`],diagnostics:[{role:`body`,required:`low long body, spotted natural fur`},{role:`head`,required:`one pointed muzzle, small round ears, dark face mask`},{role:`limbs`,required:`four short legs with paws`},{role:`tail`,required:`one long ringed tail`}],forbiddenSubstitutions:[`fox head`,`duplicate head or body`,`extra legs`,`unringed tail`]},{id:`earth-platypus-v1`,name:`Platypus`,kingdom:`fauna`,family:`mammal`,taxon:`monotreme`,sourceOwners:[`art/speciesoverrides.ts#CANON.fauna|Platypus`,`art/faunaoverrides5.ts#faunaMonotreme`],diagnostics:[{role:`body`,required:`low sleek dark-brown furred body`},{role:`head`,required:`broad flat rubbery duck bill`},{role:`limbs`,required:`four short limbs with webbed clawed feet`},{role:`tail`,required:`broad flat blunt paddle tail`}],forbiddenSubstitutions:[`rodent muzzle`,`furred nose instead of bill`,`round rodent ears`,`thin tail`]},{id:`earth-frog-v1`,name:`Frog`,kingdom:`fauna`,family:`amphibian`,taxon:`anuran`,sourceOwners:[`art/faunaoverrides2.ts#FAUNA2_NAME.Frog`,`art/faunaoverrides2.ts#amphFrog`],diagnostics:[{role:`body`,required:`small green crouched body`},{role:`head`,required:`wide mouth and two domed eyes`},{role:`limbs`,required:`four limbs, long folded hind legs`}],forbiddenSubstitutions:[`mammal fur`,`upright mammal posture`,`adult tail`]},{id:`earth-persimmon-v1`,name:`Persimmon`,kingdom:`flora`,family:`tree`,taxon:`fruit-tree`,sourceOwners:[`art/florarost.ts#FLORA2_SPEC.Persimmon`,`art/floraoverrides2.ts#plantBody.Persimmon`],diagnostics:[{role:`stem`,required:`branching woody tree`},{role:`leaves`,required:`broad simple oval green leaves`},{role:`fruit`,required:`orange fruits with four-lobed calyx`}],forbiddenSubstitutions:[`pinnate compound leaves`,`citrus fruit`,`generic berry bush`]},{id:`earth-devils-club-v1`,name:`Devil's Club`,kingdom:`flora`,family:`shrub`,taxon:`spiny-shrub`,sourceOwners:[`art/floraoverrides.ts#FLORA_ICONIC`,`art/floraoverrides.ts#floraDevilsClub`],diagnostics:[{role:`stem`,required:`thick spiny canes`},{role:`leaves`,required:`huge palmate lobed green leaves`},{role:`fruit`,required:`upright terminal red berry cones`}],forbiddenSubstitutions:[`small narrow leaves`,`smooth canes`,`generic berry bush`]},{id:`earth-cranberry-v1`,name:`Cranberry`,kingdom:`flora`,family:`shrub`,taxon:`creeping-shrub`,sourceOwners:[`art/florarost.ts#FLORA2_SPEC.Cranberry`,`art/floraoverrides2.ts#berryHabit.cranberry`],diagnostics:[{role:`stem`,required:`low creeping runners`},{role:`leaves`,required:`small simple oval green leaves`},{role:`fruit`,required:`red berries close to the ground`}],forbiddenSubstitutions:[`tall woody bush`,`large leaves`,`hanging grape bunches`]}]),w=e=>Object.freeze({ok:!1,reason:e}),T=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function E(t){try{let n=d(t);if(!T(n))return w(`unsupported-snapshot`);if(n.schema!==`cf.art.landfall-snapshot.v1`||n.recipeId!==`canonical-earth-epoch0-six-residents-v1`)return w(`unsupported-schema`);if(Object.keys(n).sort().join(`|`)!==`displayPlan|qualityAccepted|recipeId|request|roster|schema`||n.qualityAccepted!==!1||!T(n.roster)||!T(n.roster.view)||Object.keys(n.roster.view).sort().join(`|`)!==`all|total`||!T(n.displayPlan)||!Array.isArray(n.displayPlan.residents))return w(`unsupported-snapshot`);for(let e of Array.from(n.displayPlan.residents))if(!T(e)||!C.some(t=>t.name===e.name&&t.kingdom===e.kingdom&&t.family===e.family))return w(`unsupported-species`);let r={...n.roster,view:{all:n.roster.view.all,preview:[],total:n.roster.view.total,hiddenFromPreview:n.roster.view.total}},i=c(n.request,r);if(!i||JSON.stringify(n.displayPlan)!==JSON.stringify(i))return w(`unsupported-snapshot`);let a=JSON.parse(JSON.stringify(n)),o=Array.from(a.displayPlan.residents,t=>{let n=C.find(e=>e.name===t.name);return{identityKey:e(t.genome),name:t.name,kingdom:n.kingdom,family:n.family,genome:t.genome,placement:{x:t.x,groundY:t.groundY,width:t.width,flip:t.flip},namedRule:n,rawGenomicVisualPolicy:`preserve-identity-use-named-earth-anatomy`}}),s=a.request.options;if(a.roster.biomeProfileKey!==`temperate`||s.wx!==`rain`||s.water!==`liquid`)return w(`unsupported-snapshot`);let l={biome:a.roster.biomeProfileKey,weather:s.wx,timeOfDay:s.nightize?`night`:s.duskize?`dusk`:`day`,water:s.water},u=o.find(e=>e.name===`Platypus`),f=[`Cohesive natural-history painting: shared light, soft contact shadows, depth and restrained detail.`,`${l.timeOfDay===`day`?`Daylight`:l.timeOfDay}, rainy ${l.biome} riverbank with liquid water, rooted vegetation and damp stones.`,`Show exactly three separate animals: Civet, Platypus and Frog, each with its own complete body and a visible gap between animal silhouettes. Image 1 guides ONLY the Platypus. Do not give the Civet a bill, webbed feet or paddle tail. Do not give the Platypus spots, a face mask, round ears or a furry pointed muzzle. Preserve the Civet's pointed nose and long ringed tail, and the Platypus's plain brown coat, broad bill and flat paddle tail. Never merge these animals.`,...o.map(e=>`One ${e.name} at ${Math.round(e.placement.x*100)}% across, base ${Math.round(e.placement.groundY*100)}% down, ${Math.round(e.placement.width*100)}% wide${e.kingdom===`fauna`&&e.placement.flip?`, facing left`:``}: ${e.namedRule.diagnostics.map(e=>e.required).join(`; `)}.`),`Keep each whole subject in frame, naturally integrated. No extra animals, duplicate anatomy, text or interface.`].join(`
`),p=S({schema:y,namedRulesVersion:b,styleVersion:x,sourceSnapshot:a,scene:l,residents:o,referenceRequirements:[{imageIndex:1,purpose:`named-species-fidelity`,subjectIdentityKey:u.identityKey,name:`Platypus`,fullGenome:u.genome,requiredFeatures:u.namedRule.diagnostics.map(e=>e.required),acceptance:`reviewed-exact-identity-reference-required`}],prompt:f,negativePrompt:o.flatMap(e=>e.namedRule.forbiddenSubstitutions.map(t=>`${e.name}: ${t}`)).join(`; `),qualityAccepted:!1,referenceStatus:`unresolved`,fidelityGuarantee:`none-prose-and-reference-require-outcome-review`}),m=JSON.stringify(p);return Object.freeze({ok:!0,recipe:p,snapshotKey:`lfas1:${JSON.stringify(a)}`,recipeKey:`lfc1:${m}`,canonicalJson:m})}catch{return w(`unsupported-snapshot`)}}function D(e,t){let n=v(e,t);return n.ok?E(n.snapshot):w(n.reason===`unproven-roster`?`unproven-roster`:`unsupported-snapshot`)}function O(e,a){if(!a.startsWith(`# Celestial Frontier Art Kit
`)||![`4`,`4.2`,`4.3`].some(e=>a.includes(`style_id: frontier   |   version ${e},`)))throw Error(`Art Kit v4 required; retired kits are refused`);let o=E(e);if(!o.ok)throw Error(`Art Kit source refused: `+o.reason);let{sourceSnapshot:s,scene:c,residents:l}=o.recipe,u=(e,t,n)=>{if(e.split(t).length!==2)throw Error(`Nonunique kit marker: `+t);let r=e.slice(e.indexOf(t)+t.length);if(r.split(n).length!==2)throw Error(`Nonunique kit end: `+n);return r.slice(0,r.indexOf(n))},d=e=>{if(a.split(`
## `+e+`
`).length!==2)throw Error(`Missing kit section: `+e);let t=a.split(`
## `+e+`
`)[1].split(`
## `)[0].split(`
### `)[0];return u(t,"```text\n","\n```")},f=d(`1. Reference lock`),p=d(`2. Frozen style`),m=d(`3. The one universe`),h=d(`5. Technical output`),g=d(`6. Shared negative`),_=u(g,`Paste in every prompt, then add the class's NEGATIVE ADDITIONS.

`,`

  For CUT-OUT classes, add:`),v=u(g,`  For CUT-OUT classes, add:
`,`

  For SCENE classes, do not add those clauses.`),y=u(h,`table says 1536, 512 or 256):
`,`

SCENE BLOCK`),b=u(h,`SCENE BLOCK (paste for universe, stars, planet biomes):
`,`

Glow is painted`),x=n(s.roster.starSeed),C=r.find(e=>e.P.seed===s.roster.planetSeed);if(!C||x.kind!==`G`||s.request.options.stc!==x.col)throw Error(`Unsupported star/planet card`);let w=t(s.roster.starSeed),T=u(m,`
  G      `,`
  A      `),D=s.roster.biomeProfile,O=s.request.options,k=l.filter(e=>e.kingdom===`flora`),A=l.filter(e=>e.kingdom===`fauna`),j={Civet:`matte warm grey-ochre fur (#a8996f), dark spots, face mask and tail rings`,Platypus:`sleek dark-brown fur and a dark rubbery bill`,Frog:`green skin`,Persimmon:`green leaves, orange fruit, brown wood`,Cranberry:`green leaves and red berries`,"Devil's Club":`green leaves and red berry cones`},M=[`SYSTEM CARD - ${w.sol?`Sol`:s.roster.starSeed} / ${C.name}; ${s.roster.worldKey}`,`  Star: ${x.kind}; ${i[x.kind]}; ${x.col}; radius ${x.r}. ${T}`,`  Light: ${c.timeOfDay}; ${c.weather}; ${w.binary||w.trinary?JSON.stringify({binary:w.binary,trinary:w.trinary}):`one primary, no companions`}; diffuse cloud-filtered light, soft neutral contact shadows; directional sun position absent from source, do not invent a visible second light.`,`  Mineral palette: ${C.P.type}; seaHue ${C.P.seaHue}, landHue ${C.P.landHue}, iceAmt ${C.P.iceAmt}; blue water, green land, pale ice; hue absent from source.`,`  Atmosphere: vista palette ${O.pal}, climate ${s.roster.climateBand}, weather ${c.weather}, water ${c.water}; rain softens distant blue-grey layers.`,`  Flora pigment: ${s.roster.biomeProfileKey}; forms ${Array.from(D.flora).join(`, `)}; ${k.map(e=>`${e.name}: ${j[e.name]}`).join(`; `)}.`,`  Fauna adaptation: families ${Array.from(D.fauna).join(`, `)}; Earth named anatomy and natural materials take priority over raw procedural genes: ${A.map(e=>`${e.name}: ${e.namedRule.diagnostics.map(e=>e.required).join(`; `)}; ${j[e.name]}`).join(` | `)}.`,`  One signature: ${D.hazard===null?`no biome hazard in source; no added hazard motif`:D.hazard}.`].join(`
`),N=l.map(e=>{let t=e.kingdom===`fauna`,n=d(t?`4E. Fauna (cut-out)`:`4D. Flora (cut-out)`),r=t?`one head, exactly one head; four limbs, two fore and two hind, exactly four limbs`:`one connected specimen, exactly one connected growth`,i=e.name===`Persimmon`?`tree taller than a human`:e.name===`Devil's Club`?`shrub comparable to human height`:`a fraction of human height`,a=u(n,`ACCURACY (paste and fill):
`,t?`

LAYOUT, TOKEN POSE`:`

LAYOUT (paste)`).replace(/<[^>]+>/g,e=>e.includes(`count`)||e.includes(`stalks`)?r:i),o=u(n,t?`LAYOUT, TOKEN POSE (paste; the gameplay image):
`:`LAYOUT (paste):
`,t?`

LAYOUT, TURNAROUND`:`

NEGATIVE ADDITIONS:`),s=u(n,`NEGATIVE ADDITIONS:
`,`

OUTPUT:`),c=`One Earth ${e.name}; ${i}; ${r}; ${e.namedRule.diagnostics.map(e=>e.required).join(`; `)}; ${j[e.name]}; ${t?`no armour, no harness, no gear; alert natural expression, named anatomy preserved`:`complete anchoring base through crown, no soil`}.`;return{key:e.name.toLowerCase().replace(/'/g,``).replace(/ /g,`-`),name:e.name,kind:`cut-out`,width:1024,height:1024,identityKey:e.identityKey,sourceOwners:e.namedRule.sourceOwners,systemCard:M,prompt:[f,p,M,`SUBJECT
`+c,`ACCURACY
`+a,`LAYOUT
`+o,`TECHNICAL OUTPUT
`+y,`NEGATIVE
`+_+`
`+v+`
`+s].join(`

`)}}),P=d(`4C. Planets (orbital cut-out, biome scene)`),F=u(P,`BIOME - LAYOUT (paste):
`,`

BIOME - OUTPUT:`),I=P.split(`NEGATIVE ADDITIONS (both profiles):
`)[1];if(!I)throw Error(`Missing biome negative`);let L={key:`earth-temperate`,name:`Earth temperate biome plate`,kind:`scene`,width:2560,height:1440,systemCard:M,prompt:[f,p,M,`SUBJECT\nEarth ${c.biome} riverbank; damp grey-brown stones, blue liquid water and green banks; distant tree and shrub growth from this biome, blue-grey rainy atmosphere washing out distant layers; rain falling across the river; a distant stand of trees gives scale; diffuse cloud-filtered daylight with no visible sun position supplied by the vista. Empty foreground landing areas for the six resident passes: no foreground organisms or animals painted into this anchor.`,`LAYOUT
`+F,`TECHNICAL OUTPUT
`+b,`NEGATIVE
`+_+`
`+I].join(`

`)},R=[{family:`mammal quadruped`,name:`Fox`,realm:`land`,owner:`art/mammaloverrides.ts#QUAD2_SPEC.Fox`,counts:`one head, exactly one head; four legs, two fore and two hind, exactly four legs; one tail, exactly one tail`,anatomy:`fine pointed muzzle, large upright ears, long plume tail with pale cream tip, dark stockings; narrow canid body, alert eyes, closed natural jaw`,pigment:`warm russet fur (#c4642a), cream tail tip (#f2efe6), dark brown stockings (#241b19)`},{family:`bird`,name:`Pheasant`,realm:`land`,owner:`art/faunaoverrides.ts#birdB3Pheasant`,counts:`one head, exactly one head; two legs, exactly two legs; two folded wings, exactly two wings; one long feathered tail, exactly one tail`,anatomy:`rounded chest, long barred pointed tail, folded feathered wings, white neck ring, green head, red cheek patch, short horn-coloured bill, alert golden eyes`,pigment:`ochre and chestnut feathers (#c28a46, #8a4525), dark green head (#164f43), red cheek (#bd3c36), cream neck ring (#f1e9d6)`},{family:`fish`,name:`Trout`,realm:`aquatic`,owner:`art/faunaoverrides3.ts#FAUNA3_NAME.Trout`,counts:`one head, exactly one head; one forked tail, exactly one tail; two pectoral fins, exactly two pectoral fins; two pelvic fins, exactly two pelvic fins; one main dorsal fin, exactly one main dorsal fin; no legs, zero legs`,anatomy:`fusiform salmonid body, blunt snout, spotted scales, natural fins and gill covers, clear lateral silhouette with slight three-quarter turn, naturally suspended swimming posture, watchful lateral eye and closed mouth`,pigment:`muted bronze-brown scales (#7b6136), pale underside, dark spots`},{family:`insect`,name:`Beetle`,realm:`land`,owner:`art/faunaoverrides.ts#FAUNA_NAME.Beetle/faunaBeetle`,counts:`one head, exactly one head; six jointed legs, three near and three far, exactly six legs; two antennae, exactly two antennae; two closed elytra, exactly two wing cases`,anatomy:`oval chitin body with a central elytra seam, pronotum and small head, six jointed legs, small compound eyes and natural mandibles; low crawling stance with body raised enough to read the legs`,pigment:`burnished brown chitin (#96551f), dark jointed legs (#20242c)`},{family:`reptile`,name:`Skink`,realm:`land`,owner:`art/faunaoverrides2.ts#faunaESquamata.Skink`,counts:`one head, exactly one head; four small legs, two fore and two hind, exactly four legs; one long tapered tail, exactly one tail`,anatomy:`slender glossy scaled body and slender head, tiny legs, tail a little longer than body (source ratio 1.08), low lizard posture, small lateral eyes and closed natural jaw`,pigment:`glossy brown scales (#7c5b34), restrained natural highlights`}],z=d(`4E. Fauna (cut-out)`),B=u(z,`LAYOUT, TOKEN POSE (paste; the gameplay image):
`,`

LAYOUT, TURNAROUND`),V=R.map(e=>{let t=M.replace(`
  One signature:`,`; family-reference exemplar only, not an Earth landing resident: ${e.name}, ${e.family}, ${e.realm}; ${e.pigment}.\n  One signature:`),n=u(z,`ACCURACY (paste and fill):
`,`

LAYOUT, TOKEN POSE`).replace(/<[^>]+>/g,t=>t.includes(`count`)?e.counts:`a fraction of human height`);return{key:`family-`+e.family.replace(/ /g,`-`),name:e.name,family:e.family,kind:`cut-out`,width:1024,height:1024,realm:e.realm,sourceOwners:[e.owner],systemCard:t,liveResident:!1,prompt:[f,p,t,`SUBJECT\nOne Earth ${e.name}, a ${e.family} family reference; a fraction of human height; ${e.counts}; ${e.pigment}; ${e.anatomy}; no armour, no harness, no gear, no added growth or bioluminescence.`,`ACCURACY
`+n,`LAYOUT
`+B,`TECHNICAL OUTPUT
`+y,`NEGATIVE
`+_+`
`+v+`
`+u(z,`NEGATIVE ADDITIONS:
`,`

OUTPUT:`)].join(`

`)}}),H=`  Rich natural-history fantasy painting,`+u(p,`  Rich natural-history fantasy painting,`,`

The scene-contact`);return S({schema:`cf.art.kit-earth-inputs.v4`,sourceSnapshot:s,systemCard:M,runtimeCard:[`Light: ${c.timeOfDay}; ${c.weather}; diffuse cloud-filtered light, soft neutral contact shadows.`,`Mineral palette: ${C.P.type}; blue water, green land, pale ice.`,`Atmosphere: ${c.weather}; rain softens distant blue-grey layers.`,`Pigments: ${l.map(e=>`${e.name}: ${j[e.name].replace(/ \(#[a-f0-9]+\)/g,``)}`).join(`; `)}.`].join(`
`),frozenParagraph:H,prompts:N,plate:L,familyReferences:V,qualityAccepted:!1,scope:`six-earth-cutouts-temperate-plate-five-named-family-exemplars`})}function k(e,t,n,r){let i=O(e,t),a=E(i.sourceSnapshot);if(!a.ok||!n.foreground)throw Error(`Canonical contact scene/foreground unavailable`);let c=r.compositionProfile===`weather-mat-v1`?o:r.compositionProfile===`edge-runners-v1`?s:u,d=i.prompts.map(e=>{let t=a.recipe.residents.find(t=>t.identityKey===e.identityKey),r=n.residents[e.key],i=c.residents.find(t=>t.name===e.name);if(!r)throw Error(`Missing fitted reference for `+e.name);return{name:e.name,identityKey:e.identityKey,reference:r,placement:{...t.placement,...i}}}),f=a.recipe.residents.map(e=>`One ${e.name}: ${e.namedRule.diagnostics[0].required}.`).join(` `)+` Integrate feet and stems into wet ground with visible contact shadows under Civet and Platypus, shared light and natural ground reflections.`,p=[i.frozenParagraph,i.runtimeCard,f,`A coherent riverbank scene with distinct readable subjects, the Civet as hero, a smaller Platypus, a clearly visible Frog, a taller Persimmon, and foreground grass overlapping the lowest animal feet.`].join(`

`);return S({schema:`cf.kit-engine.v4`,experiment:r.compositionProfile===`weather-mat-v1`?`cf.kit-weather-mat.v1`:r.compositionProfile===`edge-runners-v1`?`cf.kit-edge-runners.v1`:`cf.kit-contact.v1`,...r,...r.compositionProfile===`edge-runners-v1`?{interiorErosionPixels:8}:{},...r.compositionProfile===`weather-mat-v1`?{compositorSystemCard:i.systemCard,weatherIntensity:/rain|storm/.test(a.recipe.scene.weather)?l:{dropletCount:1,specularStrength:1,precipitationDensity:1}}:{},plate:n.plate,atlas:n.atlas,triptych:n.triptych,foreground:n.foreground,composition:c,passes:d,finisherPrompt:p,sourceSnapshot:i.sourceSnapshot,qualityAccepted:!1,mastersAccepted:!0,textTokenCeiling:512,finisherSteps:1,skipOrganismPasses:!0})}export{f as i,O as n,k as r,D as t};
//# sourceMappingURL=landfall-conditioning-DWjYn21s.js.map