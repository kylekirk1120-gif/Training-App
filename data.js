// Train Together PWA — All data. Edit this file to update workouts, meals, and targets

// ============ PHASE INFO ============
// Phase lengths are NOT equal — session ranges assume 2 sessions/week, 48 sessions total across 6 months.
// Phase 1: sessions 1-16 (8 weeks) · Phase 2: sessions 17-24 (4 weeks)
// Phase 3: sessions 25-40 (8 weeks) · Phase 4: sessions 41-48 (4 weeks)
const PHASE_INFO = {
  '1':{name:'Phase 1 · Foundation',months:'Months 1–2',focus:'Form mastery + fat loss',weeks:8,sessions:16,sessionStart:1,sessionEnd:16},
  '2':{name:'Phase 2 · Strength',months:'Month 3',focus:'Heavier loads, lower reps',weeks:4,sessions:8,sessionStart:17,sessionEnd:24},
  '3':{name:'Phase 3 · Golf power base',months:'Months 4–5',focus:'Rotational power + stability',weeks:8,sessions:16,sessionStart:25,sessionEnd:40},
  '4':{name:'Phase 4 · Golf peak',months:'Month 6',focus:'Explosive power + speed',weeks:4,sessions:8,sessionStart:41,sessionEnd:48}
};

// ============ WORKOUT PHASES (PHASES[phase][week][day]) ============
const PHASES_W1 = {
  '1':{
    A:{sections:[
      {label:"Warm-up",mins:15,exercises:[
        {"name":"Foam roll thoracic spine","rx":"5 min","sets":0,"rest":0,"cues":["Roll slowly up the mid-back, pausing 5–10 sec on tight spots","Arms crossed over chest to open the shoulder blades"],"vid":"thoracic+spine+foam+roll+form+tutorial"},
        {"name":"Band pull-apart","rx":"2×15","sets":2,"rest":0,"cues":["Palms up, arms straight — pull band apart and squeeze shoulder blades","Wrists neutral, elbows slightly soft throughout"],"vid":"band+pull+apart+form+tutorial"},
        {"name":"Cat-cow + hip circles","rx":"2×10","sets":2,"rest":0,"cues":["Breathe in as you arch, breathe out as you round — slow and deliberate","Feel the spine articulate segment by segment"],"vid":"cat+cow+hip+circles+mobility+tutorial"},
        {"name":"Rotator cuff activation","rx":"2×15 each side","sets":2,"rest":0,"cues":["Elbow pinned to side, rotate outward against light band resistance","Never skip — significantly reduces shoulder injury risk"],"vid":"rotator+cuff+activation+band+external+rotation"}
      ]},
      {label:"Superset A — Incline press + Cable row",mins:18,exercises:[
        {"name":"A1 · Incline dumbbell press","rx":"4×10–12 · RPE 7","sets":4,"rest":90,"cues":["3-sec descent, 1-sec pause at chest — elbows at 45° from torso","Press straight up, wrists stacked over elbows throughout"],"vid":"incline+dumbbell+press+form+tutorial"},
        {"name":"A2 · Cable row (neutral grip)","rx":"4×10–12 · RPE 7 · rest 90s","sets":4,"rest":90,"cues":["Drive elbows straight back — pause 1 sec when handles reach chest","Control the return to full extension — don't let the cable pull you"],"vid":"cable+row+neutral+grip+form+tutorial"}
      ]},
      {label:"Superset B — Shoulder press + Lat pulldown",mins:14,exercises:[
        {"name":"B1 · Dumbbell shoulder press","rx":"3×12 · RPE 7","sets":3,"rest":90,"cues":["Neutral grip, core braced — press without locking elbows at top","Ribs down, glutes slightly squeezed — don't lean back"],"vid":"dumbbell+shoulder+press+form+tutorial"},
        {"name":"B2 · Lat pulldown (wide grip)","rx":"3×12 · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Lean back slightly, drive elbows down toward hips — not backward","Stretch fully at the top between reps"],"vid":"lat+pulldown+form+tutorial"}
      ]},
      {label:"Superset C — Arms + Rear delt",mins:16,exercises:[
        {"name":"C1 · Cable face pull","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Cable at forehead height, elbows high and wide — spread rope at face","Never skip — your shoulder health insurance every session"],"vid":"cable+face+pull+form+tutorial+shoulder+health"},
        {"name":"C2 · Tricep pushdown","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Elbows pinned to sides — spread rope at full extension","If elbows drift forward, reduce the weight"],"vid":"tricep+rope+pushdown+form+tutorial"},
        {"name":"C3 · Dumbbell curl","rx":"3×15 · RPE 6 · rest 60s","sets":3,"rest":60,"cues":["Supinate (rotate palm up) as you curl — increases peak contraction","No swinging — if you're swinging, reduce the weight"],"vid":"dumbbell+bicep+curl+form+tutorial"}
      ]},
      {label:"Core finisher",mins:14,exercises:[
        {"name":"Dead bug","rx":"3×8 each side · rest 45s","sets":3,"rest":45,"cues":["Lower back flat to floor at all times — if it lifts, stop and reset","Move slowly — exhale as you lower opposite arm and leg"],"vid":"dead+bug+exercise+core+form+tutorial"},
        {"name":"Pallof press","rx":"3×12 each side · rest 45s","sets":3,"rest":45,"cues":["Brace before pressing — hold 1 sec at full extension","The cable tries to rotate you — resisting that is the whole exercise"],"vid":"pallof+press+anti+rotation+core+tutorial"},
        {"name":"RKC plank","rx":"3×30s · rest 45s","sets":3,"rest":45,"cues":["Squeeze everything — fists, glutes, quads, abs — as hard as possible","Breathe steadily — this is intense isometric effort"],"vid":"RKC+plank+form+tutorial+core"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"Thoracic rotation (open book)","rx":"2×10 each side","sets":2,"rest":0,"cues":["Lie on side, open the top arm across to the floor — rotate from the mid-back","Improves rotation for pressing and golf alike"],"vid":"open+book+thoracic+rotation+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Builds lower-ab strength and decompresses the spine"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Side plank","rx":"3×30s each side","sets":3,"rest":30,"cues":["Stack the hips, brace hard — straight line head to heels","Trains the obliques and lateral core stability"],"vid":"side+plank+form+tutorial+core"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Rower intervals","rx":"8 rounds: 30s hard / 30s easy","sets":0,"rest":0,"cues":["Upper-body driven so your legs stay fresh — drive with the arms and back","Hard efforts at ~80%, easy efforts truly easy to recover"],"vid":"rowing+machine+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 10–12% incline","sets":0,"rest":0,"cues":["Brisk pace, no holding the rails — great low-impact fat-loss work","Keeps the heart rate in the fat-burning zone without taxing recovery"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Chest doorway stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Arm at 90°, lean gently forward — breathe into the stretch","Sustained gentle stretch beats aggressive pulling"],"vid":"chest+doorway+stretch+cool+down"},
        {"name":"Lat stretch (kneeling)","rx":"2×30s each side","sets":0,"rest":0,"cues":["Extend arms on bench, sit hips back toward heels — breathe deeply","Let gravity do the work — no strain, just a long stretch"],"vid":"lat+stretch+kneeling+cool+down+tutorial"},
        {"name":"Neck + shoulder mobility","rx":"5 min","sets":0,"rest":0,"cues":["Gentle half-circles ear to shoulder — never full backward neck rolls","Finish with 5 deep breaths, shoulders drop on each exhale"],"vid":"neck+shoulder+mobility+cool+down"}
      ]}
    ]},
    B:{sections:[
      {label:"Warm-up",mins:15,exercises:[
        {"name":"Foam roll glutes + quads","rx":"5 min","sets":0,"rest":0,"cues":["Pause 5–10 sec on tight spots — cross ankle over knee for glutes","Roll slowly — don't rush through"],"vid":"foam+roll+glutes+quads+tutorial"},
        {"name":"Glute bridge","rx":"2×15","sets":2,"rest":0,"cues":["Drive through heels, squeeze glutes at top — hold 2 seconds","If glutes don't fire here, the lower back compensates during heavy work"],"vid":"glute+bridge+activation+form+tutorial"},
        {"name":"Hip flexor stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Tuck tailbone under (posterior pelvic tilt) to deepen the stretch","Tight hip flexors are a top cause of lower back pain"],"vid":"kneeling+hip+flexor+stretch+tutorial"},
        {"name":"Lateral band walk","rx":"2×12 steps each side","sets":2,"rest":0,"cues":["Band around ankles, slight knee bend — stay low and controlled","Activates glute medius — critical for knee stability during squats"],"vid":"lateral+band+walk+glute+activation+tutorial"},
        {"name":"Bodyweight squat","rx":"2×10 — movement prep","sets":2,"rest":0,"cues":["Knees track over toes, chest tall — rehearsal, not exercise","Pause 1 sec at bottom to open the hips before loading"],"vid":"bodyweight+squat+form+tutorial+movement+prep"}
      ]},
      {label:"Superset A — Goblet squat + Leg curl",mins:22,exercises:[
        {"name":"A1 · Goblet squat","rx":"4×10–12 · RPE 7","sets":4,"rest":120,"cues":["Dumbbell at chest, 3-sec descent — elbows inside knees at the bottom","Drive through the full foot — don't rise onto your toes"],"vid":"goblet+squat+proper+form+tutorial"},
        {"name":"A2 · Seated leg curl","rx":"4×12 · RPE 7 · rest 2 min","sets":4,"rest":120,"cues":["Full range of motion — pause briefly at peak contraction","Control the return — don't let the weight crash down"],"vid":"seated+leg+curl+form+tutorial"}
      ]},
      {label:"Superset B — Romanian deadlift + Leg press",mins:22,exercises:[
        {"name":"B1 · Romanian deadlift","rx":"4×10 · RPE 7–8","sets":4,"rest":120,"cues":["Hinge from hips with soft knee bend — bar stays close to legs","Feel hamstring stretch, not lower back — reduce range if it's your back"],"vid":"romanian+deadlift+form+tutorial+hamstring"},
        {"name":"B2 · Leg press","rx":"4×12 · RPE 7 · rest 2 min","sets":4,"rest":120,"cues":["Feet shoulder-width mid-platform — knees track over toes","Stop just before locking knees — keep tension on quads throughout"],"vid":"leg+press+form+tutorial+proper+foot+placement"}
      ]},
      {label:"Accessory — Abductors + Calves",mins:11,exercises:[
        {"name":"Cable hip abduction","rx":"3×15 each side · rest 60s","sets":3,"rest":60,"cues":["Slight forward hip lean — control the return, don't let cable snap back","Strengthens glute medius — important for knee and lower back health"],"vid":"cable+hip+abduction+form+tutorial"},
        {"name":"Standing calf raise","rx":"3×20 · rest 60s","sets":3,"rest":60,"cues":["Full range — heel below step going down, full extension at the top","Slow and deliberate — most people rush and get nothing from these"],"vid":"standing+calf+raise+form+tutorial+full+range"}
      ]},
      {label:"Core finisher",mins:14,exercises:[
        {"name":"Dead bug","rx":"3×8 each side · rest 45s","sets":3,"rest":45,"cues":["Lower back flat to floor — move slowly, exhale on each rep","If your back lifts, stop and reduce the range of motion"],"vid":"dead+bug+exercise+core+form+tutorial"},
        {"name":"Pallof press (side on)","rx":"3×12 each side · rest 45s","sets":3,"rest":45,"cues":["Brace before pressing — resist the pull, that's the whole exercise","Exhale as you extend, hold 1 second before returning"],"vid":"pallof+press+anti+rotation+core+tutorial"},
        {"name":"Suitcase carry","rx":"3×30m · rest 45s","sets":3,"rest":45,"cues":["One heavy dumbbell — walk tall, look like you're carrying nothing","Core resists the lateral pull — one of the best lower back strengtheners"],"vid":"suitcase+carry+core+stability+form+tutorial"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"90/90 hip switch","rx":"2×10 each side","sets":2,"rest":0,"cues":["Sit, rotate both knees side to side keeping chest tall","Opens the hips and protects the lower back"],"vid":"90+90+hip+switch+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Spinal decompression after heavy lower work is valuable"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Bird dog","rx":"3×10 each side","sets":3,"rest":30,"cues":["Opposite arm and leg, slow and controlled — keep hips square","Anti-rotation core that reinforces a stable spine"],"vid":"bird+dog+exercise+core+form"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Assault bike intervals","rx":"6 rounds: 20s hard / 40s easy","sets":0,"rest":0,"cues":["Short and brutal but brief — legs are already worked so keep it controlled","Full-body effort, push with arms too to share the load"],"vid":"assault+bike+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 8–10% incline","sets":0,"rest":0,"cues":["Low impact — lets the legs flush out after heavy lifting","Steady fat-loss cardio that won't hurt recovery for next session"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Pigeon pose (or figure-4)","rx":"2×45s each side","sets":0,"rest":0,"cues":["Breathe into the hip — relax a little deeper on each exhale","Figure-4 on your back is gentler if pigeon is too intense"],"vid":"pigeon+pose+figure+4+hip+stretch+tutorial"},
        {"name":"Standing quad stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Tuck pelvis under (tailbone down) to significantly increase the stretch","Hold a wall if balance is an issue — stability first"],"vid":"standing+quad+stretch+cool+down"},
        {"name":"Child's pose","rx":"2 min","sets":0,"rest":0,"cues":["Arms extended, breathe into the lower back — feel it decompress","Gently reverses spinal compression from heavy lifting"],"vid":"childs+pose+yoga+lower+back+relief"},
        {"name":"Supine knee-to-chest","rx":"1 min each side","sets":0,"rest":0,"cues":["Hug one knee gently toward chest — don't force it","Great final movement to close every lower body session"],"vid":"supine+knee+to+chest+lower+back+stretch"}
      ]}
    ]}
  },
  '2':{
    A:{sections:[
      {label:"Warm-up",mins:15,exercises:[
        {"name":"Foam roll + band work","rx":"10 min","sets":0,"rest":0,"cues":["Foam roll mid-back and lats, then band pull-aparts and dislocates","Prime the shoulders thoroughly — you're lifting heavier this phase"],"vid":"upper+body+dynamic+warm+up+barbell"},
        {"name":"Rotator cuff activation","rx":"2×15 each side","sets":2,"rest":0,"cues":["Light band external rotation — elbow pinned to your side","Essential before heavy benching — protects the shoulder joint"],"vid":"rotator+cuff+activation+band+external+rotation"}
      ]},
      {label:"Superset A — Bench press + Barbell row",mins:26,exercises:[
        {"name":"A1 · Barbell bench press","rx":"4×6–8 · RPE 8","sets":4,"rest":150,"cues":["Feet flat, natural arch — touch chest and drive up, no bounce","Bar path slightly angled back toward shoulders, not straight up"],"vid":"barbell+bench+press+form+tutorial"},
        {"name":"A2 · Barbell row","rx":"4×6–8 · RPE 8 · rest 2–3 min","sets":4,"rest":150,"cues":["Hinge to about 45°, pull bar to lower chest","Control the descent — no jerking or using momentum"],"vid":"barbell+row+form+tutorial"}
      ]},
      {label:"Superset B — Overhead press + Pull-up",mins:14,exercises:[
        {"name":"B1 · Overhead press","rx":"3×8 · RPE 7–8","sets":3,"rest":90,"cues":["Bar at collarbone, press straight up — glutes squeezed to protect lower back","Don't lean back excessively — keep ribs down"],"vid":"standing+overhead+press+barbell+form"},
        {"name":"B2 · Weighted pull-up or pulldown","rx":"3×8 · RPE 7–8 · rest 90s","sets":3,"rest":90,"cues":["Full hang to chin over the bar — controlled descent every rep","If using pulldown, drive elbows down to your hips"],"vid":"weighted+pull+up+form+tutorial"}
      ]},
      {label:"Accessory — Delts + Arms",mins:16,exercises:[
        {"name":"Dumbbell lateral raise","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Lead with elbows, slight forward lean — stop at shoulder height","Control the lowering — don't let them drop"],"vid":"dumbbell+lateral+raise+form+tutorial"},
        {"name":"Hammer curl","rx":"3×10 · RPE 7","sets":3,"rest":60,"cues":["Neutral grip, no swinging — works brachialis and forearm","Squeeze at the top, lower slowly"],"vid":"hammer+curl+form+tutorial"},
        {"name":"Tricep dip or close-grip bench","rx":"3×10 · RPE 7 · rest 60s","sets":3,"rest":60,"cues":["Elbows tucked in, controlled descent","Full lockout at the top without flaring elbows"],"vid":"close+grip+bench+press+triceps+form"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"Thoracic rotation (open book)","rx":"2×10 each side","sets":2,"rest":0,"cues":["Lie on side, open the top arm across to the floor — rotate from the mid-back","Improves rotation for pressing and golf alike"],"vid":"open+book+thoracic+rotation+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Builds lower-ab strength and decompresses the spine"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Side plank","rx":"3×30s each side","sets":3,"rest":30,"cues":["Stack the hips, brace hard — straight line head to heels","Trains the obliques and lateral core stability"],"vid":"side+plank+form+tutorial+core"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Rower intervals","rx":"8 rounds: 30s hard / 30s easy","sets":0,"rest":0,"cues":["Upper-body driven so your legs stay fresh — drive with the arms and back","Hard efforts at ~80%, easy efforts truly easy to recover"],"vid":"rowing+machine+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 10–12% incline","sets":0,"rest":0,"cues":["Brisk pace, no holding the rails — great low-impact fat-loss work","Keeps the heart rate in the fat-burning zone without taxing recovery"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Full upper body stretch","rx":"15 min","sets":0,"rest":0,"cues":["Chest, lats, shoulders, triceps — hold each 30 sec","Finish with deep breathing to bring the heart rate down"],"vid":"full+upper+body+stretch+routine+cool+down"}
      ]}
    ]},
    B:{sections:[
      {label:"Warm-up",mins:15,exercises:[
        {"name":"Glute activation circuit","rx":"10 min","sets":0,"rest":0,"cues":["Glute bridges, lateral band walks, bodyweight squats","Prime the posterior chain before heavy hinging"],"vid":"glute+activation+circuit+warm+up"},
        {"name":"Ankle mobility","rx":"5 min","sets":0,"rest":0,"cues":["Knee-to-wall ankle rocks each side","Better ankle mobility = deeper, safer squats and deadlifts"],"vid":"ankle+mobility+drills+squat"}
      ]},
      {label:"Primary — Trap bar deadlift",mins:19,exercises:[
        {"name":"Trap bar deadlift","rx":"5×5 · RPE 8","sets":5,"rest":180,"cues":["Hips back, chest up — drive the floor away rather than pulling up","More upright torso than conventional — protects the lower back. This is your main strength builder"],"vid":"trap+bar+deadlift+form+tutorial+lower+back+safe"}
      ]},
      {label:"Superset B — Split squat + Leg curl",mins:19,exercises:[
        {"name":"B1 · Bulgarian split squat","rx":"4×8 each side · RPE 7–8","sets":4,"rest":120,"cues":["Front foot forward enough that shin stays vertical, torso upright","3-sec descent — start light, this exercise humbles everyone"],"vid":"bulgarian+split+squat+form+tutorial"},
        {"name":"B2 · Nordic curl or seated leg curl","rx":"3×8 · RPE 7 · rest 2 min","sets":3,"rest":120,"cues":["If nordic: lower as slowly as possible, partner holds ankles","If machine: full range, controlled negative"],"vid":"nordic+hamstring+curl+form+tutorial"}
      ]},
      {label:"Superset C — Posterior chain + Core",mins:14,exercises:[
        {"name":"C1 · Cable pull-through","rx":"3×15 · RPE 6","sets":3,"rest":90,"cues":["Hip hinge pattern — same as RDL, cable teaches the feel of hip drive","Squeeze glutes hard at the top, don't overarch"],"vid":"cable+pull+through+form+tutorial"},
        {"name":"C2 · Suitcase carry","rx":"3×30m · rest 90s","sets":3,"rest":90,"cues":["One dumbbell, stay tall — don't lean to either side","Core resists the lateral load — excellent for lower back health"],"vid":"suitcase+carry+core+stability+form+tutorial"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"90/90 hip switch","rx":"2×10 each side","sets":2,"rest":0,"cues":["Sit, rotate both knees side to side keeping chest tall","Opens the hips and protects the lower back"],"vid":"90+90+hip+switch+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Spinal decompression after heavy lower work is valuable"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Bird dog","rx":"3×10 each side","sets":3,"rest":30,"cues":["Opposite arm and leg, slow and controlled — keep hips square","Anti-rotation core that reinforces a stable spine"],"vid":"bird+dog+exercise+core+form"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Assault bike intervals","rx":"6 rounds: 20s hard / 40s easy","sets":0,"rest":0,"cues":["Short and brutal but brief — legs are already worked so keep it controlled","Full-body effort, push with arms too to share the load"],"vid":"assault+bike+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 8–10% incline","sets":0,"rest":0,"cues":["Low impact — lets the legs flush out after heavy lifting","Steady fat-loss cardio that won't hurt recovery for next session"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Full lower body stretch","rx":"15 min","sets":0,"rest":0,"cues":["Hip flexors, glutes, hamstrings, quads — hold each 30 sec","Finish with child's pose and knee-to-chest for the lower back"],"vid":"full+lower+body+stretch+routine+cool+down"}
      ]}
    ]}
  },
  '3':{
    A:{sections:[
      {label:"Warm-up (golf-specific)",mins:15,exercises:[
        {"name":"Hip 90/90 mobility","rx":"5 min","sets":0,"rest":0,"cues":["Rotate between internal and external hip positions — essential for backswing","Tight hips are a top cause of back pain in golfers"],"vid":"hip+90+90+mobility+exercise+golf+tutorial"},
        {"name":"Thoracic rotation (seated)","rx":"2×10 each side","sets":2,"rest":0,"cues":["Arms crossed, rotate only from the mid-back — hips stay still","This is the rotation your golf swing depends on"],"vid":"seated+thoracic+rotation+mobility+golf"},
        {"name":"Band shoulder warm-up","rx":"2×12 each","sets":2,"rest":0,"cues":["External rotation, pull-apart, overhead reach sequence","Full shoulder prep for rotational pressing"],"vid":"band+shoulder+warm+up+routine"}
      ]},
      {label:"Superset A — Wood chop + Med ball throw",mins:16,exercises:[
        {"name":"A1 · Cable wood chop (high to low)","rx":"4×12 each side · RPE 7","sets":4,"rest":90,"cues":["Rotate from hips first, then core, then arms — this IS the golf swing pattern","Don't arm-pull it — power comes from the ground up"],"vid":"cable+wood+chop+rotational+power+golf+form"},
        {"name":"A2 · Med ball rotational throw","rx":"3×8 each side · explosive · rest 90s","sets":3,"rest":90,"cues":["Load into back hip, drive through front — explosive intent","Same sequence as the downswing — throw hard"],"vid":"medicine+ball+rotational+throw+golf+power"}
      ]},
      {label:"Superset B — Single-arm row + Anti-rotation",mins:14,exercises:[
        {"name":"B1 · Single-arm cable row","rx":"3×12 each side · RPE 7","sets":3,"rest":90,"cues":["Rotate slightly into the pull — trains the follow-through pattern","Control the return, feel the lat stretch"],"vid":"single+arm+cable+row+form+tutorial"},
        {"name":"B2 · Pallof press (rotational)","rx":"3×10 each side · rest 90s","sets":3,"rest":90,"cues":["Press, rotate 45°, return — resist the cable pulling you off balance","Slow and controlled the whole way"],"vid":"rotational+pallof+press+core+tutorial"}
      ]},
      {label:"Superset C — Shoulder health + Press",mins:16,exercises:[
        {"name":"C1 · Dumbbell press (neutral grip)","rx":"3×12 · RPE 7","sets":3,"rest":60,"cues":["Neutral grip keeps the shoulder healthy through high golf volume","Controlled tempo, full range"],"vid":"neutral+grip+dumbbell+press+form"},
        {"name":"C2 · Face pull","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Every session — keeps rotator cuff healthy","Elbows high and wide, spread at the face"],"vid":"cable+face+pull+form+tutorial+shoulder+health"},
        {"name":"C3 · Landmine anti-rotation press","rx":"3×10 each side · rest 60s","sets":3,"rest":60,"cues":["Press across the body — core resists the rotation","Golf-specific shoulder and core integration"],"vid":"landmine+press+anti+rotation+form"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"Thoracic rotation (open book)","rx":"2×10 each side","sets":2,"rest":0,"cues":["Lie on side, open the top arm across to the floor — rotate from the mid-back","Improves rotation for pressing and golf alike"],"vid":"open+book+thoracic+rotation+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Builds lower-ab strength and decompresses the spine"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Side plank","rx":"3×30s each side","sets":3,"rest":30,"cues":["Stack the hips, brace hard — straight line head to heels","Trains the obliques and lateral core stability"],"vid":"side+plank+form+tutorial+core"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Rower intervals","rx":"8 rounds: 30s hard / 30s easy","sets":0,"rest":0,"cues":["Upper-body driven so your legs stay fresh — drive with the arms and back","Hard efforts at ~80%, easy efforts truly easy to recover"],"vid":"rowing+machine+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 10–12% incline","sets":0,"rest":0,"cues":["Brisk pace, no holding the rails — great low-impact fat-loss work","Keeps the heart rate in the fat-burning zone without taxing recovery"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Thoracic + hip stretch","rx":"15 min","sets":0,"rest":0,"cues":["Open-book thoracic stretch, hip flexor and glute stretches","Maintain the mobility that makes the swing work"],"vid":"thoracic+hip+mobility+stretch+routine"}
      ]}
    ]},
    B:{sections:[
      {label:"Warm-up",mins:15,exercises:[
        {"name":"Glute activation + lateral band","rx":"10 min","sets":0,"rest":0,"cues":["Glute bridges and lateral band walks — fire up the hips","Single-leg balance holds to prime stability"],"vid":"glute+activation+lateral+band+warm+up"},
        {"name":"Single-leg balance drills","rx":"5 min","sets":0,"rest":0,"cues":["Balance on one leg, reach the other foot in different directions","Trains the stability your weight shift depends on"],"vid":"single+leg+balance+drills+stability"}
      ]},
      {label:"Primary — Romanian deadlift",mins:11,exercises:[
        {"name":"Romanian deadlift","rx":"4×10 · RPE 7","sets":4,"rest":120,"cues":["Maintain the strength you built — same hinge form, moderate weight","Bar close to legs, feel the hamstring stretch"],"vid":"romanian+deadlift+form+tutorial+hamstring"}
      ]},
      {label:"Superset B — Single-leg + Lateral power",mins:14,exercises:[
        {"name":"B1 · Single-leg squat to box","rx":"3×10 each side · RPE 7","sets":3,"rest":90,"cues":["Sit back slowly to the box, drive up through the heel","Builds the unilateral stability critical for golf weight shift"],"vid":"single+leg+box+squat+form+tutorial"},
        {"name":"B2 · Lateral lunge","rx":"3×12 each side · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Push hips back and out — trains lateral weight transfer","Exactly the movement the downswing requires"],"vid":"lateral+lunge+form+tutorial"}
      ]},
      {label:"Superset C — Glute power + Core",mins:16,exercises:[
        {"name":"C1 · Hip thrust (barbell)","rx":"4×12 · RPE 8","sets":4,"rest":90,"cues":["Drive hips to full extension — glute power transfers to swing speed","Squeeze at the top, hips level not overarched"],"vid":"barbell+hip+thrust+form+tutorial+glutes"},
        {"name":"C2 · Dead bug (weighted)","rx":"3×10 each side · rest 90s","sets":3,"rest":90,"cues":["Hold a light plate on chest — same anti-extension core work with load","Lower back stays flat throughout"],"vid":"weighted+dead+bug+core+form"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"90/90 hip switch","rx":"2×10 each side","sets":2,"rest":0,"cues":["Sit, rotate both knees side to side keeping chest tall","Opens the hips and protects the lower back"],"vid":"90+90+hip+switch+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Spinal decompression after heavy lower work is valuable"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Bird dog","rx":"3×10 each side","sets":3,"rest":30,"cues":["Opposite arm and leg, slow and controlled — keep hips square","Anti-rotation core that reinforces a stable spine"],"vid":"bird+dog+exercise+core+form"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Assault bike intervals","rx":"6 rounds: 20s hard / 40s easy","sets":0,"rest":0,"cues":["Short and brutal but brief — legs are already worked so keep it controlled","Full-body effort, push with arms too to share the load"],"vid":"assault+bike+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 8–10% incline","sets":0,"rest":0,"cues":["Low impact — lets the legs flush out after heavy lifting","Steady fat-loss cardio that won't hurt recovery for next session"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Hip flexor + glute stretch","rx":"15 min","sets":0,"rest":0,"cues":["Deep hip flexor stretch, pigeon pose, hamstring stretch","Hold each 30–45 sec, breathe into the tight spots"],"vid":"hip+flexor+glute+stretch+routine"}
      ]}
    ]}
  },
  '4':{
    A:{sections:[
      {label:"Warm-up",mins:15,exercises:[
        {"name":"Full mobility circuit","rx":"10 min","sets":0,"rest":0,"cues":["Thoracic rotations, hip openers, band shoulder work","Comprehensive prep before explosive work"],"vid":"full+body+dynamic+mobility+circuit"},
        {"name":"Swing simulation drills","rx":"5 min","sets":0,"rest":0,"cues":["Slow shadow swings building to faster — grooves the pattern","Rehearse the movement you're about to power up"],"vid":"golf+swing+warm+up+drills"}
      ]},
      {label:"Power block A — Explosive rotation",mins:22,exercises:[
        {"name":"A1 · Med ball slam","rx":"4×6 · explosive","sets":4,"rest":120,"cues":["Full body overhead to floor — maximum intent on every rep","Don't pace yourself, go all out each rep then reset"],"vid":"medicine+ball+slam+power+form"},
        {"name":"A2 · Cable rotational press","rx":"4×8 each side · fast · rest 2 min","sets":4,"rest":120,"cues":["Start loaded, press and rotate fast — decelerate under control","Speed is the stimulus here, not heavy weight"],"vid":"cable+rotational+press+power+golf"}
      ]},
      {label:"Strength B — Maintain upper base",mins:17,exercises:[
        {"name":"B1 · Barbell bench press","rx":"3×6 · RPE 8","sets":3,"rest":120,"cues":["Heavier than phase 2 — push to move the bar fast even when heavy","Intent on every rep up"],"vid":"barbell+bench+press+form+tutorial"},
        {"name":"B2 · Weighted pull-up","rx":"3×6 · RPE 8 · rest 2 min","sets":3,"rest":120,"cues":["Full hang, chin over bar, controlled descent","Add weight if bodyweight is easy"],"vid":"weighted+pull+up+form+tutorial"}
      ]},
      {label:"Golf-specific finisher",mins:16,exercises:[
        {"name":"Landmine press (single arm, rotational)","rx":"3×10 each side","sets":3,"rest":60,"cues":["Press across body with rotation — mimics late follow-through","Power through the rotation, control the return"],"vid":"landmine+press+rotational+golf"},
        {"name":"Serratus wall slide","rx":"3×12 · rest 60s","sets":3,"rest":60,"cues":["Arms on wall, slide up — builds shoulder blade control","Critical for a consistent swing plane"],"vid":"serratus+wall+slide+form"},
        {"name":"Rotational plank","rx":"3×10 each side · rest 60s","sets":3,"rest":60,"cues":["Side plank, rotate top arm under and back","Trains oblique strength in the golf position"],"vid":"rotational+side+plank+core+form"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"Thoracic rotation (open book)","rx":"2×10 each side","sets":2,"rest":0,"cues":["Lie on side, open the top arm across to the floor — rotate from the mid-back","Improves rotation for pressing and golf alike"],"vid":"open+book+thoracic+rotation+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Builds lower-ab strength and decompresses the spine"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Side plank","rx":"3×30s each side","sets":3,"rest":30,"cues":["Stack the hips, brace hard — straight line head to heels","Trains the obliques and lateral core stability"],"vid":"side+plank+form+tutorial+core"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Rower intervals","rx":"8 rounds: 30s hard / 30s easy","sets":0,"rest":0,"cues":["Upper-body driven so your legs stay fresh — drive with the arms and back","Hard efforts at ~80%, easy efforts truly easy to recover"],"vid":"rowing+machine+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 10–12% incline","sets":0,"rest":0,"cues":["Brisk pace, no holding the rails — great low-impact fat-loss work","Keeps the heart rate in the fat-burning zone without taxing recovery"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Full upper + thoracic stretch","rx":"15 min","sets":0,"rest":0,"cues":["Chest, shoulders, lats, thoracic openers — hold each 30 sec","Breathe and let the nervous system settle after explosive work"],"vid":"upper+body+thoracic+stretch+routine"}
      ]}
    ]},
    B:{sections:[
      {label:"Warm-up",mins:15,exercises:[
        {"name":"Dynamic hip mobility","rx":"10 min","sets":0,"rest":0,"cues":["Leg swings, 90/90 transitions, deep squat holds","Hips must be fully open before explosive lower work"],"vid":"dynamic+hip+mobility+routine"},
        {"name":"Lateral band walks","rx":"5 min","sets":0,"rest":0,"cues":["Stay low, controlled steps — fire up the glute medius","Primes the hips for jumping and single-leg power"],"vid":"lateral+band+walk+glute+activation+tutorial"}
      ]},
      {label:"Explosive A — Peak power",mins:15,exercises:[
        {"name":"Trap bar jump deadlift","rx":"4×5 · explosive","sets":4,"rest":180,"cues":["Load 40–50% of your phase 2 max — drive up explosively, leave the ground","Closest gym movement to driving through impact in golf"],"vid":"trap+bar+jump+deadlift+power+form"}
      ]},
      {label:"Superset B — Single-leg + Glute speed",mins:19,exercises:[
        {"name":"B1 · Bulgarian split squat (heavier)","rx":"3×8 each side · RPE 8","sets":3,"rest":120,"cues":["Controlled descent, drive up with more intent than phase 3","Still rock solid on form even as load increases"],"vid":"bulgarian+split+squat+form+tutorial"},
        {"name":"B2 · Hip thrust (heavier)","rx":"4×8 · RPE 8 · rest 2 min","sets":4,"rest":120,"cues":["Maximum glute contraction at the top, hold 1 sec","This is peak hip drive training for clubhead speed"],"vid":"barbell+hip+thrust+form+tutorial+glutes"}
      ]},
      {label:"Superset C — Lateral stability + Carry",mins:16,exercises:[
        {"name":"C1 · Lateral band step (loaded)","rx":"3×15 each side","sets":3,"rest":60,"cues":["Band around ankles, stay low — trains hip abductors for follow-through balance","Controlled, no bouncing"],"vid":"lateral+band+step+glute+form"},
        {"name":"C2 · Single-leg RDL","rx":"3×10 each side · RPE 7","sets":3,"rest":60,"cues":["Balance and hamstring — same hip hinge on one leg","Builds finish-position stability directly"],"vid":"single+leg+romanian+deadlift+form"},
        {"name":"C3 · Suitcase carry (heavy)","rx":"3×40m · rest 60s","sets":3,"rest":60,"cues":["Heavier than phase 3 — tall posture, no lean","Walk 40m each set, brace the whole way"],"vid":"suitcase+carry+core+stability+form+tutorial"}
      ]},
      {label:"Mobility & core block",mins:12,exercises:[
        {"name":"90/90 hip switch","rx":"2×10 each side","sets":2,"rest":0,"cues":["Sit, rotate both knees side to side keeping chest tall","Opens the hips and protects the lower back"],"vid":"90+90+hip+switch+mobility"},
        {"name":"Hanging knee raise","rx":"3×12","sets":3,"rest":45,"cues":["Hang from the bar, raise knees with control — no swinging","Spinal decompression after heavy lower work is valuable"],"vid":"hanging+knee+raise+core+form"},
        {"name":"Bird dog","rx":"3×10 each side","sets":3,"rest":30,"cues":["Opposite arm and leg, slow and controlled — keep hips square","Anti-rotation core that reinforces a stable spine"],"vid":"bird+dog+exercise+core+form"}
      ]},
      {label:"Conditioning finisher — pick one or both",mins:14,exercises:[
        {"name":"Option 1 · Assault bike intervals","rx":"6 rounds: 20s hard / 40s easy","sets":0,"rest":0,"cues":["Short and brutal but brief — legs are already worked so keep it controlled","Full-body effort, push with arms too to share the load"],"vid":"assault+bike+intervals+technique"},
        {"name":"Option 2 · Incline treadmill walk","rx":"12–15 min · 8–10% incline","sets":0,"rest":0,"cues":["Low impact — lets the legs flush out after heavy lifting","Steady fat-loss cardio that won't hurt recovery for next session"],"vid":"incline+treadmill+walk+fat+loss"}
      ]},
      {label:"Cool-down",mins:15,exercises:[
        {"name":"Hip + glute + calf stretch","rx":"15 min","sets":0,"rest":0,"cues":["Pigeon, hip flexor, calf and hamstring stretches — hold each 30–45 sec","Close out the program phase with full lower-body decompression"],"vid":"lower+body+stretch+routine+cool+down"}
      ]}
    ]}
  }
};

// Week 2 and 3 main working sections only (warm-up/mobility/conditioning/cool-down are shared from W1)
const PHASES_MAIN = {
'1':{
'2':{
A:[
{label:"Superset A — Dumbbell bench + Barbell row",mins:18,exercises:[
{"name":"Dumbbell bench press","rx":"4×6-8 · RPE 8","sets":4,"rest":90,"cues":["Feet flat, natural arch — controlled descent, drive up","Keep wrists stacked over elbows, squeeze chest at the top"],"vid":"dumbbell+bench+press+form+tutorial"},
{"name":"Barbell row (overhand)","rx":"4×6-8 · RPE 8 · rest 90s","sets":4,"rest":90,"cues":["Hinge to 45°, overhand grip — pull bar to lower chest","Control the descent, avoid jerking with momentum"],"vid":"barbell+row+overhand+grip+form+tutorial"}
]},
{label:"Superset B — Arnold press + Straight arm pulldown",mins:14,exercises:[
{"name":"Arnold press","rx":"3×10 · RPE 7","sets":3,"rest":90,"cues":["Start palms facing you, rotate out as you press — full range","Controlled tempo, don't lock out elbows at top"],"vid":"arnold+press+form+tutorial+dumbbell"},
{"name":"Straight arm pulldown","rx":"3×12 · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Arms straight, hinge at shoulder — pull bar to thighs","Feel the lat stretch at top, squeeze at the bottom"],"vid":"straight+arm+pulldown+lat+form+tutorial"}
]},
{label:"Superset C — Face pull + EZ bar curl + Overhead tricep",mins:14,exercises:[
{"name":"Cable face pull","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Cable at forehead height, elbows high and wide — spread rope at face","Never skip — your shoulder health insurance every session"],"vid":"cable+face+pull+form+tutorial+shoulder+health"},
{"name":"EZ bar curl","rx":"3×10 · RPE 7","sets":3,"rest":60,"cues":["Narrow grip on EZ bar reduces wrist strain — full range of motion","Squeeze at the top, lower under control — 2 sec descent"],"vid":"ez+bar+curl+form+tutorial"},
{"name":"Overhead tricep extension (cable or DB)","rx":"3×12 · RPE 7 · rest 60s","sets":3,"rest":60,"cues":["Elbows close to head, full stretch at the bottom — long head emphasis","Control the return, don't let weight crash"],"vid":"overhead+tricep+extension+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Hollow body hold","rx":"3×30s · rest 45s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if you can't hold full position"],"vid":"hollow+body+hold+core+form+tutorial"},
{"name":"Pallof press (kneeling)","rx":"3×12 each side · rest 45s","sets":3,"rest":45,"cues":["Kneel perpendicular to cable — brace and press, resist rotation the whole time","Exhale on the press, hold 1 second before returning"],"vid":"kneeling+pallof+press+anti+rotation+core"},
{"name":"RKC plank","rx":"3×30s · rest 45s","sets":3,"rest":45,"cues":["Squeeze everything — fists, glutes, quads, abs — as hard as possible","Breathe steadily — this is intense isometric effort"],"vid":"RKC+plank+form+tutorial+core"}
]}
],
B:[
{label:"Primary A — Trap bar deadlift",mins:19,exercises:[
{"name":"Trap bar deadlift","rx":"4×5 · RPE 8 · rest 3 min","sets":4,"rest":180,"cues":["Hips back, chest up — drive the floor away rather than pulling up","More upright torso than conventional — protects the lower back"],"vid":"trap+bar+deadlift+form+tutorial+lower+back+safe"}
]},
{label:"Superset B — Leg press + Nordic curl",mins:20,exercises:[
{"name":"Leg press heavy (feet high)","rx":"4×8 · RPE 8","sets":4,"rest":120,"cues":["Feet high on the platform — targets hamstrings and glutes more","Full range, don't lock knees — keep tension throughout"],"vid":"leg+press+high+foot+placement+form+tutorial"},
{"name":"Nordic curl","rx":"3×6 · RPE 8 · rest 2 min","sets":3,"rest":120,"cues":["Lower as slowly as possible — use hands to catch yourself at the bottom","Eccentric-only is fine; the lowering phase builds hamstring strength"],"vid":"nordic+hamstring+curl+form+tutorial"}
]},
{label:"Accessory — Abductors + Calves",mins:11,exercises:[
{"name":"Cable hip abduction","rx":"3×15 each side · rest 60s","sets":3,"rest":60,"cues":["Slight forward hip lean — control the return, don't let cable snap back","Strengthens glute medius — important for knee and lower back health"],"vid":"cable+hip+abduction+form+tutorial"},
{"name":"Single leg calf raise","rx":"3×15 each side · rest 60s","sets":3,"rest":60,"cues":["Full range — heel below step going down, full extension at top","One leg forces more effort — add weight once 15 reps is easy"],"vid":"single+leg+calf+raise+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Hollow body hold","rx":"3×30s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if you can't hold full position"],"vid":"hollow+body+hold+core+form+tutorial"},
{"name":"Farmers carry","rx":"3×30m","sets":3,"rest":45,"cues":["Heavy dumbbells, walk tall — don't lean to either side","Core resists the load — one of the best lower back strengtheners"],"vid":"farmers+carry+form+tutorial+core"},
{"name":"Bird dog","rx":"3×10 each side","sets":3,"rest":30,"cues":["Opposite arm and leg, slow and controlled — keep hips square","Anti-rotation core that reinforces a stable spine"],"vid":"bird+dog+exercise+core+form"}
]}
]
},
'3':{
A:[
{label:"Superset A — Cable chest fly + Single arm row",mins:16,exercises:[
{"name":"Cable chest fly","rx":"4×12 · RPE 7","sets":4,"rest":90,"cues":["Slight elbow bend throughout — squeeze chest at the center","Control the stretch at end range — don't overextend shoulders"],"vid":"cable+chest+fly+form+tutorial"},
{"name":"Single arm dumbbell row","rx":"4×12 each side · RPE 7 · rest 90s","sets":4,"rest":90,"cues":["Brace on a bench, row to your hip — full range each rep","Don't rotate excessively — keep hips and shoulders square"],"vid":"single+arm+dumbbell+row+form+tutorial"}
]},
{label:"Superset B — Lateral raise + Cable pull apart",mins:12,exercises:[
{"name":"Lateral raise","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Lead with elbows, slight forward lean — stop at shoulder height","Control the lowering — don't let them drop"],"vid":"dumbbell+lateral+raise+form+tutorial"},
{"name":"Cable pull apart","rx":"3×15 · RPE 6 · rest 60s","sets":3,"rest":60,"cues":["Arms at chest height, pull apart — squeeze shoulder blades at end","Controlled return — feel the stretch across the chest"],"vid":"cable+pull+apart+form+tutorial"}
]},
{label:"Superset C — Rear delt fly + Concentration curl + Tricep extension",mins:14,exercises:[
{"name":"Reverse fly rear delt","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Slight elbow bend, lead with elbows out — feel rear delts squeeze","Light weight, full range — rear delts respond to higher reps"],"vid":"dumbbell+reverse+fly+rear+delt+form"},
{"name":"Concentration curl","rx":"3×12 · RPE 7","sets":3,"rest":60,"cues":["Elbow braced on inner thigh, curl to shoulder — peak contraction","No swinging — this is pure bicep isolation"],"vid":"concentration+curl+form+tutorial"},
{"name":"Overhead tricep extension (cable or DB)","rx":"3×12 · RPE 7 · rest 60s","sets":3,"rest":60,"cues":["Elbows close to head, full stretch at the bottom — long head emphasis","Control the return, don't let weight crash"],"vid":"overhead+tricep+extension+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Stir the pot","rx":"3×10 each direction","sets":3,"rest":45,"cues":["Forearms on stability ball, make small circles — brace the whole time","Keep hips level and breathe steadily throughout"],"vid":"stir+the+pot+plank+core+exercise+form"},
{"name":"Landmine oblique twist","rx":"3×10 each side · rest 45s","sets":3,"rest":45,"cues":["Hold bar at chest, rotate around your center — arms stay extended","Power comes from hips and obliques, not the arms"],"vid":"landmine+oblique+twist+core+exercise"},
{"name":"Side plank","rx":"3×30s each side · rest 30s","sets":3,"rest":30,"cues":["Stack the hips, brace hard — straight line head to heels","Trains the obliques and lateral core stability"],"vid":"side+plank+form+tutorial+core"}
]}
],
B:[
{label:"Superset A — Heel-elevated goblet squat + Lying hamstring curl",mins:20,exercises:[
{"name":"Heel-elevated goblet squat","rx":"4×12 · RPE 7","sets":4,"rest":120,"cues":["Heels on small plates or wedge — allows deeper knee bend, more quad emphasis","Dumbbell at chest, 3-sec descent — keep chest tall throughout"],"vid":"heel+elevated+goblet+squat+form+tutorial"},
{"name":"Lying hamstring curl","rx":"3×15 · RPE 7 · rest 2 min","sets":3,"rest":120,"cues":["Full range of motion — pause briefly at peak contraction","Control the return — don't let the weight crash down"],"vid":"lying+hamstring+curl+form+tutorial"}
]},
{label:"Superset B — Single leg RDL + Reverse lunge",mins:18,exercises:[
{"name":"Single leg RDL","rx":"4×10 each side · RPE 7","sets":4,"rest":90,"cues":["Balance and hamstring — same hip hinge but on one leg","Keep hips square, feel the hamstring stretch at the bottom"],"vid":"single+leg+romanian+deadlift+form"},
{"name":"Reverse lunge","rx":"3×12 each side · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Step back, knee hovers above floor — front shin stays vertical","Drive through the front heel to return — builds unilateral stability"],"vid":"reverse+lunge+form+tutorial"}
]},
{label:"Accessory — Calves + Carries",mins:10,exercises:[
{"name":"Seated calf raise","rx":"3×20","sets":3,"rest":45,"cues":["Full range — stretch at bottom, squeeze at top — slow and deliberate","Seated isolates the soleus more than standing"],"vid":"seated+calf+raise+form+tutorial"},
{"name":"Bear crawl","rx":"3×20m","sets":3,"rest":45,"cues":["Hands and toes, knees hover 1 inch off floor — move contralaterally","Slow and controlled — core stability and shoulder coordination"],"vid":"bear+crawl+exercise+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"McGill curl up","rx":"3×8 each side","sets":3,"rest":45,"cues":["One knee bent, hands under lower back — tiny crunch, neck neutral","This builds spinal stability without compressing the discs"],"vid":"mcgill+curl+up+form+tutorial+spine"},
{"name":"Landmine oblique twist","rx":"3×10 each side · rest 45s","sets":3,"rest":45,"cues":["Hold bar at chest, rotate around your center — arms stay extended","Power comes from hips and obliques, not the arms"],"vid":"landmine+oblique+twist+core+exercise"},
{"name":"Hollow body hold","rx":"3×30s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if you can't hold full position"],"vid":"hollow+body+hold+core+form+tutorial"}
]}
]
}
},
'2':{
'2':{
A:[
{label:"Superset A — DB/Machine bench + Pendlay row",mins:22,exercises:[
{"name":"Dumbbell bench press or chest press machine","rx":"4×5 · RPE 8-9","sets":4,"rest":150,"cues":["Heavier than week 1 — controlled descent, explosive drive up","Spot yourself on DBs or use a machine for safety at high RPE"],"vid":"dumbbell+bench+press+form+tutorial"},
{"name":"Pendlay row","rx":"4×5 · RPE 8-9 · rest 2-3 min","sets":4,"rest":150,"cues":["Bar dead on the floor each rep — explosive pull to lower chest","Horizontal back angle, brace hard — this is a power row"],"vid":"pendlay+row+form+tutorial+barbell"}
]},
{label:"Superset B — Push press + Weighted chin up",mins:16,exercises:[
{"name":"Push press","rx":"3×6 · RPE 8","sets":3,"rest":90,"cues":["Slight knee dip, drive through legs to initiate the press — lock out overhead","Don't rebend knees on the way down — strict descent"],"vid":"push+press+form+tutorial+barbell"},
{"name":"Weighted chin up","rx":"3×6 · RPE 8 · rest 90s","sets":3,"rest":90,"cues":["Supinated (underhand) grip — full hang to chin over bar","Add weight via belt or vest — control the descent"],"vid":"weighted+chin+up+form+tutorial"}
]},
{label:"Accessory — Delts + Arms",mins:14,exercises:[
{"name":"Cable face pull","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Cable at forehead height, elbows high and wide — spread rope at face","Never skip — your shoulder health insurance every session"],"vid":"cable+face+pull+form+tutorial+shoulder+health"},
{"name":"Incline dumbbell curl","rx":"3×8 · RPE 7","sets":3,"rest":60,"cues":["Incline stretches the bicep at the bottom — don't rush the lowering phase","Elbows back, curl to shoulder — peak squeeze"],"vid":"incline+dumbbell+curl+form+tutorial"},
{"name":"Skull crusher EZ bar","rx":"3×8 · RPE 7","sets":3,"rest":60,"cues":["Lower bar toward forehead with control — elbows point straight up","Press back up without flaring elbows — tricep focused"],"vid":"skull+crusher+ez+bar+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Cable crunch","rx":"3×15 · RPE 7","sets":3,"rest":45,"cues":["Kneel facing cable, crunch toward thighs — don't pull with the arms","Feel the abs do the work — controlled return each rep"],"vid":"cable+crunch+form+tutorial+abs"},
{"name":"Tall kneeling Pallof press","rx":"3×12 each side","sets":3,"rest":45,"cues":["Kneel tall — no hip hinge allowed — press and hold 1 second","The kneeling removes the hip from the equation — pure anti-rotation"],"vid":"tall+kneeling+pallof+press+core+tutorial"},
{"name":"Hollow body hold","rx":"3×30s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if needed"],"vid":"hollow+body+hold+core+form+tutorial"}
]}
],
B:[
{label:"Primary — Trap bar deadlift",mins:19,exercises:[
{"name":"Trap bar deadlift","rx":"4×4 · RPE 9 · rest 3 min","sets":4,"rest":180,"cues":["Near-maximal effort — focus, brace hard, drive the floor away","Same form as always — speed may drop slightly at this RPE, that's fine"],"vid":"trap+bar+deadlift+form+tutorial+lower+back+safe"}
]},
{label:"Superset B — Hack squat + Glute ham raise",mins:20,exercises:[
{"name":"Hack squat or leg press","rx":"4×6 · RPE 8","sets":4,"rest":120,"cues":["Hack squat machine — shoulder-width stance, control the descent","Full range of motion — knees track over toes throughout"],"vid":"hack+squat+machine+form+tutorial"},
{"name":"Glute ham raise","rx":"3×8 · RPE 8 · rest 2 min","sets":3,"rest":120,"cues":["Lower under control, use hamstrings to pull back up — or use arms to assist","One of the best posterior chain builders — earn each rep"],"vid":"glute+ham+raise+form+tutorial"}
]},
{label:"Accessory — Posterior chain + Carries",mins:11,exercises:[
{"name":"Cable pull through","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Hip hinge pattern — same as RDL, cable teaches the feel of hip drive","Squeeze glutes hard at the top, don't overarch"],"vid":"cable+pull+through+form+tutorial"},
{"name":"Suitcase carry heavier","rx":"3×40m","sets":3,"rest":60,"cues":["Heavier than Phase 1 — walk tall, look like you're carrying nothing","Core resists the lateral pull the whole 40 meters"],"vid":"suitcase+carry+core+stability+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Hollow body hold","rx":"3×30s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if needed"],"vid":"hollow+body+hold+core+form+tutorial"},
{"name":"Bear crawl","rx":"3×20m","sets":3,"rest":45,"cues":["Hands and toes, knees hover 1 inch off floor — move contralaterally","Slow and controlled — core stability and shoulder coordination"],"vid":"bear+crawl+exercise+form+tutorial"},
{"name":"McGill curl up","rx":"3×8 each side","sets":3,"rest":45,"cues":["One knee bent, hands under lower back — tiny crunch, neck neutral","Builds spinal stability without compressing the discs"],"vid":"mcgill+curl+up+form+tutorial+spine"}
]}
]
},
'3':{
A:[
{label:"Superset A — DB floor press + Chest supported row",mins:18,exercises:[
{"name":"Dumbbell floor press","rx":"4×10 · RPE 7","sets":4,"rest":90,"cues":["Lying on floor limits range — safer for shoulder, still heavy work","Drive up explosively, lower with 3-sec control to floor"],"vid":"dumbbell+floor+press+form+tutorial"},
{"name":"Chest supported row","rx":"4×10 · RPE 7 · rest 90s","sets":4,"rest":90,"cues":["Chest on an incline bench — takes lower back completely out of the equation","Full range, squeeze shoulder blades at the top"],"vid":"chest+supported+row+form+tutorial"}
]},
{label:"Superset B — Single arm OH press + Neutral grip pulldown",mins:14,exercises:[
{"name":"Single arm overhead press","rx":"3×10 each side · RPE 7","sets":3,"rest":90,"cues":["Press strictly — no lean to either side, brace the obliques","Single arm exposes any left-right imbalances — use them as feedback"],"vid":"single+arm+overhead+press+form+tutorial"},
{"name":"Neutral grip pulldown","rx":"3×12 · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Neutral grip (palms facing) — drive elbows down toward hips","Lean back slightly, stretch fully at the top between reps"],"vid":"neutral+grip+lat+pulldown+form+tutorial"}
]},
{label:"Accessory — Face pull + Curl + Dip",mins:14,exercises:[
{"name":"Cable face pull","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Cable at forehead height, elbows high and wide — spread rope at face","Never skip — your shoulder health insurance every session"],"vid":"cable+face+pull+form+tutorial+shoulder+health"},
{"name":"Cable curl","rx":"3×12 · RPE 7","sets":3,"rest":60,"cues":["Cable keeps constant tension through the full range — don't rush it","Squeeze at the top, 2-sec lowering"],"vid":"cable+curl+bicep+form+tutorial"},
{"name":"Dip (weighted if possible)","rx":"3×10 · RPE 7","sets":3,"rest":60,"cues":["Elbows tucked, lean slightly forward for more chest — full dip depth","Add weight via belt or vest if bodyweight is too easy"],"vid":"dip+weighted+form+tutorial+chest+tricep"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Reverse crunch","rx":"3×15","sets":3,"rest":45,"cues":["Curl pelvis toward ribs — lower back lifts off the floor, not the hips","Control the lowering — don't let legs crash down"],"vid":"reverse+crunch+form+tutorial+lower+abs"},
{"name":"Landmine oblique twist","rx":"3×10 each side · rest 45s","sets":3,"rest":45,"cues":["Hold bar at chest, rotate around your center — arms stay extended","Power comes from hips and obliques, not the arms"],"vid":"landmine+oblique+twist+core+exercise"},
{"name":"Stir the pot","rx":"3×10 each direction","sets":3,"rest":45,"cues":["Forearms on stability ball, make small circles — brace the whole time","Keep hips level and breathe steadily throughout"],"vid":"stir+the+pot+plank+core+exercise+form"}
]}
],
B:[
{label:"Superset A — Heel goblet squat heavy + RDL pause",mins:20,exercises:[
{"name":"Heel-elevated goblet squat heavy","rx":"4×8 · RPE 7","sets":4,"rest":120,"cues":["Heavier than week 1 — same 3-sec descent, still control the whole rep","Feel the quads burn — this is the prime mover today"],"vid":"heel+elevated+goblet+squat+form+tutorial"},
{"name":"Romanian deadlift pause at bottom","rx":"4×8 · RPE 7 · rest 2 min","sets":4,"rest":120,"cues":["Pause 1 sec at full hamstring stretch — maximizes time under tension","Don't round the lower back at the bottom — hinge stays perfect"],"vid":"romanian+deadlift+form+tutorial+hamstring"}
]},
{label:"Superset B — Walking lunge + Leg extension",mins:16,exercises:[
{"name":"Walking lunge","rx":"3×12 each side · RPE 7","sets":3,"rest":90,"cues":["Long stride — front shin vertical, torso upright throughout","Drive through the front heel, bring back foot through to next step"],"vid":"walking+lunge+form+tutorial"},
{"name":"Leg extension","rx":"3×15 · RPE 6 · rest 90s","sets":3,"rest":90,"cues":["Full extension at the top, 1-sec pause — quad isolation","Lower under control — 2-3 sec descent"],"vid":"leg+extension+machine+form+tutorial"}
]},
{label:"Accessory — Calves + Carries",mins:10,exercises:[
{"name":"Single leg calf raise","rx":"3×20 each side","sets":3,"rest":45,"cues":["Full range — heel below step going down, full extension at top","One leg forces more effort — add weight once 20 reps is easy"],"vid":"single+leg+calf+raise+form+tutorial"},
{"name":"Farmers carry","rx":"3×40m","sets":3,"rest":45,"cues":["Heavier than Phase 1 — walk tall, don't lean to either side","Core resists the bilateral load — excellent for strength and conditioning"],"vid":"farmers+carry+form+tutorial+core"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"McGill curl up","rx":"3×8 each side","sets":3,"rest":45,"cues":["One knee bent, hands under lower back — tiny crunch, neck neutral","Builds spinal stability without compressing the discs"],"vid":"mcgill+curl+up+form+tutorial+spine"},
{"name":"Reverse crunch","rx":"3×15","sets":3,"rest":45,"cues":["Curl pelvis toward ribs — lower back lifts off the floor, not the hips","Control the lowering — don't let legs crash down"],"vid":"reverse+crunch+form+tutorial+lower+abs"},
{"name":"Stir the pot","rx":"3×10 each direction","sets":3,"rest":45,"cues":["Forearms on stability ball, make small circles — brace the whole time","Keep hips level and breathe steadily throughout"],"vid":"stir+the+pot+plank+core+exercise+form"}
]}
]
}
},
'3':{
'2':{
A:[
{label:"Superset A — Cable wood chop low-to-high + Med ball side throw",mins:16,exercises:[
{"name":"Cable wood chop (low to high)","rx":"4×10 each side · RPE 7","sets":4,"rest":90,"cues":["Rotate from hips first, core then arms — this IS the golf swing pattern","Don't arm-pull it — power comes from the ground up"],"vid":"cable+wood+chop+low+to+high+rotational+form"},
{"name":"Med ball side throw against wall","rx":"4×8 each side · explosive · rest 90s","sets":4,"rest":90,"cues":["Load into back hip, rotate and throw hard — catch and repeat","Explosive intent every rep — don't pace yourself"],"vid":"medicine+ball+side+throw+wall+rotational+power"}
]},
{label:"Superset B — Single arm landmine press + Half kneeling cable row",mins:14,exercises:[
{"name":"Single arm landmine press","rx":"3×10 each side · RPE 7","sets":3,"rest":90,"cues":["Press across body with slight rotation — mimics late follow-through","Power through the rotation, control the return"],"vid":"single+arm+landmine+press+rotational+form"},
{"name":"Half kneeling cable row","rx":"3×12 each side · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Half kneeling forces anti-rotation — row to hip, stay tall","The unstable base reveals core weaknesses — stay square"],"vid":"half+kneeling+cable+row+form+tutorial"}
]},
{label:"Superset C — Face pull + Rotational Pallof press",mins:12,exercises:[
{"name":"Cable face pull","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Every session — keeps rotator cuff healthy","Elbows high and wide, spread at the face"],"vid":"cable+face+pull+form+tutorial+shoulder+health"},
{"name":"Tall kneeling Pallof press rotational","rx":"3×10 each side · rest 60s","sets":3,"rest":60,"cues":["Press, rotate 45° toward cable, return — resist the pull throughout","Slow and controlled the whole way — train the deceleration too"],"vid":"rotational+pallof+press+core+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Stir the pot","rx":"3×10 each direction","sets":3,"rest":45,"cues":["Forearms on stability ball, make small circles — brace the whole time","Keep hips level and breathe steadily throughout"],"vid":"stir+the+pot+plank+core+exercise+form"},
{"name":"Hollow body hold","rx":"3×30s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if needed"],"vid":"hollow+body+hold+core+form+tutorial"},
{"name":"Landmine oblique twist","rx":"3×10 each side","sets":3,"rest":45,"cues":["Hold bar at chest, rotate around your center — arms stay extended","Power comes from hips and obliques, not the arms"],"vid":"landmine+oblique+twist+core+exercise"}
]}
],
B:[
{label:"Primary — Hip thrust heavy",mins:17,exercises:[
{"name":"Hip thrust heavy","rx":"5×5 · RPE 9 · rest 3 min","sets":5,"rest":180,"cues":["Drive hips to full extension — maximum glute contraction at the top","Near-maximal effort — set up carefully, brace hard before each rep"],"vid":"barbell+hip+thrust+form+tutorial+glutes"}
]},
{label:"Superset B — Bulgarian split squat heavy + Lateral band walk",mins:18,exercises:[
{"name":"Bulgarian split squat heavier","rx":"4×6 each side · RPE 8","sets":4,"rest":90,"cues":["Heavier than Phase 1 — controlled descent, drive up with more intent","Still rock solid on form even as load increases"],"vid":"bulgarian+split+squat+form+tutorial"},
{"name":"Lateral band walk (heavy band)","rx":"3×20 each side · rest 90s","sets":3,"rest":90,"cues":["Heavier band, stay low — controlled steps, feel glute medius working","Don't let knees cave inward at any point"],"vid":"lateral+band+walk+glute+activation+tutorial"}
]},
{label:"Superset C — Single leg RDL weighted + Seated calf raise",mins:14,exercises:[
{"name":"Single leg RDL weighted","rx":"4×8 each side · RPE 7","sets":4,"rest":90,"cues":["Dumbbell in opposite hand — feel the hamstring stretch at the bottom","Keep hips square, controlled — balance and posterior chain"],"vid":"single+leg+romanian+deadlift+form"},
{"name":"Seated calf raise","rx":"3×20 · rest 90s","sets":3,"rest":90,"cues":["Full range — stretch at bottom, squeeze at top — slow and deliberate","Seated isolates the soleus more than standing"],"vid":"seated+calf+raise+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Cable crunch","rx":"3×15 · RPE 7","sets":3,"rest":45,"cues":["Kneel facing cable, crunch toward thighs — don't pull with the arms","Feel the abs do the work — controlled return each rep"],"vid":"cable+crunch+form+tutorial+abs"},
{"name":"Farmers carry","rx":"3×30m","sets":3,"rest":45,"cues":["Heavy dumbbells, walk tall — don't lean to either side","Core resists the bilateral load — excellent for conditioning"],"vid":"farmers+carry+form+tutorial+core"},
{"name":"Reverse crunch","rx":"3×15","sets":3,"rest":45,"cues":["Curl pelvis toward ribs — lower back lifts off the floor, not the hips","Control the lowering — don't let legs crash down"],"vid":"reverse+crunch+form+tutorial+lower+abs"}
]}
]
},
'3':{
A:[
{label:"Superset A — Landmine rotation + Med ball chest pass",mins:16,exercises:[
{"name":"Landmine rotation","rx":"4×12 each side · RPE 7","sets":4,"rest":90,"cues":["Rotate the bar around your centerline — hips initiate, core transfers","Load the back hip, drive through — same sequence as the downswing"],"vid":"landmine+rotation+exercise+golf+power+form"},
{"name":"Med ball chest pass wall","rx":"4×8 · explosive · rest 90s","sets":4,"rest":90,"cues":["Stand a foot from the wall, press hard — catch and repeat immediately","Arms-and-chest power — explosive intent every rep"],"vid":"medicine+ball+chest+pass+wall+explosive+form"}
]},
{label:"Superset B — Alternating DB press + Renegade row",mins:14,exercises:[
{"name":"Dumbbell press alternating","rx":"3×12 each side · RPE 7","sets":3,"rest":90,"cues":["Press one dumbbell at a time — requires more core stability to resist rotation","Keep the non-pressing arm stable at chest height"],"vid":"alternating+dumbbell+press+form+tutorial"},
{"name":"Renegade row","rx":"3×8 each side · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["High plank on dumbbells — row one arm, keep hips perfectly level","The anti-rotation demand is the whole point — don't rush"],"vid":"renegade+row+form+tutorial+core"}
]},
{label:"Superset C — Band pull apart + Serratus wall slide",mins:12,exercises:[
{"name":"Band pull apart","rx":"3×20 · RPE 6","sets":3,"rest":60,"cues":["Palms up, arms straight — pull band apart and squeeze shoulder blades","Wrists neutral, elbows slightly soft throughout"],"vid":"band+pull+apart+form+tutorial"},
{"name":"Serratus wall slide","rx":"3×12 · rest 60s","sets":3,"rest":60,"cues":["Arms on wall, slide up — push the wall away to protract the shoulder blade","Critical for a consistent swing plane and shoulder health"],"vid":"serratus+wall+slide+form"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"TRX fallout","rx":"3×10","sets":3,"rest":45,"cues":["Reach arms overhead, lower your body toward floor — hips stay in line","Anti-extension demand — don't let hips sag or pike"],"vid":"TRX+fallout+core+anti+extension+form"},
{"name":"Copenhagen plank","rx":"3×20s each side","sets":3,"rest":45,"cues":["Side plank with top foot on a bench — hip adductors and obliques","Keep the bottom knee off the ground for full difficulty"],"vid":"copenhagen+plank+form+tutorial+adductors"},
{"name":"Bear crawl","rx":"3×20m","sets":3,"rest":30,"cues":["Hands and toes, knees hover 1 inch off floor — move contralaterally","Slow and controlled — core stability and shoulder coordination"],"vid":"bear+crawl+exercise+form+tutorial"}
]}
],
B:[
{label:"Superset A — Curtsy lunge + Step up weighted",mins:16,exercises:[
{"name":"Curtsy lunge","rx":"3×12 each side · RPE 7","sets":3,"rest":90,"cues":["Step back and across — rear knee crosses behind front foot","Challenges the glute medius and hip stability in a new plane"],"vid":"curtsy+lunge+form+tutorial+glutes"},
{"name":"Step up weighted high box","rx":"3×10 each side · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Drive through the stepping heel — don't push off the trailing foot","Tall box = more hip flexion = more glute recruitment"],"vid":"weighted+step+up+high+box+form+tutorial"}
]},
{label:"Superset B — Cable kickback + Single leg calf raise",mins:13,exercises:[
{"name":"Cable kickback","rx":"3×15 each side · RPE 6","sets":3,"rest":60,"cues":["Hinge slightly, drive leg back and up — squeeze at the top","Light weight, feel the glute — not a momentum exercise"],"vid":"cable+kickback+glute+form+tutorial"},
{"name":"Standing calf raise single leg","rx":"3×15 each side · rest 60s","sets":3,"rest":60,"cues":["Full range — heel below step going down, full extension at top","One leg forces more effort — add weight once 15 reps is easy"],"vid":"single+leg+calf+raise+form+tutorial"}
]},
{label:"Superset C — Lateral lunge weighted + Bear crawl",mins:13,exercises:[
{"name":"Lateral lunge weighted","rx":"3×10 each side · RPE 7","sets":3,"rest":60,"cues":["Push hips back and out — trains lateral weight transfer","Exactly the movement the downswing requires"],"vid":"lateral+lunge+form+tutorial"},
{"name":"Bear crawl","rx":"3×20m · rest 60s","sets":3,"rest":60,"cues":["Hands and toes, knees hover 1 inch off floor — move contralaterally","Slow and controlled — core stability and shoulder coordination"],"vid":"bear+crawl+exercise+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Reverse crunch","rx":"3×15","sets":3,"rest":45,"cues":["Curl pelvis toward ribs — lower back lifts off the floor, not the hips","Control the lowering — don't let legs crash down"],"vid":"reverse+crunch+form+tutorial+lower+abs"},
{"name":"McGill curl up","rx":"3×8 each side","sets":3,"rest":45,"cues":["One knee bent, hands under lower back — tiny crunch, neck neutral","Builds spinal stability without compressing the discs"],"vid":"mcgill+curl+up+form+tutorial+spine"},
{"name":"Stir the pot","rx":"3×10 each direction","sets":3,"rest":45,"cues":["Forearms on stability ball, make small circles — brace the whole time","Keep hips level and breathe steadily throughout"],"vid":"stir+the+pot+plank+core+exercise+form"}
]}
]
}
},
'4':{
'2':{
A:[
{label:"Power block A — Med ball rotational slam + Plyometric push up",mins:20,exercises:[
{"name":"Med ball rotational slam","rx":"4×5 each side · explosive","sets":4,"rest":120,"cues":["Rotate, reach overhead, slam to the floor hard — explosive every rep","Full body effort — hips, core, then arms"],"vid":"medicine+ball+rotational+slam+explosive+power"},
{"name":"Plyometric push up","rx":"4×6 · explosive · rest 2 min","sets":4,"rest":120,"cues":["Explode off the floor — clap or just get airborne","Reset fully between reps — quality over speed"],"vid":"plyometric+push+up+explosive+form+tutorial"}
]},
{label:"Strength B — Speed bench + Weighted pull up",mins:18,exercises:[
{"name":"Dumbbell bench press or chest press machine (speed reps)","rx":"4×4 at 60% 1RM · fast","sets":4,"rest":120,"cues":["60% load, maximum speed intent — compensatory acceleration","Lower with control, press explosively — speed is the stimulus"],"vid":"speed+bench+press+explosive+strength+form"},
{"name":"Weighted pull up","rx":"3×5 · RPE 9 · rest 2 min","sets":3,"rest":120,"cues":["Full hang, chin over bar, controlled descent — add meaningful weight","Maximum effort each set — this is peak strength work"],"vid":"weighted+pull+up+form+tutorial"}
]},
{label:"Golf-specific finisher",mins:14,exercises:[
{"name":"Landmine press explosive","rx":"3×8 each side","sets":3,"rest":60,"cues":["Press across body with rotation — mimics late follow-through","Power through the rotation, control the return"],"vid":"landmine+press+rotational+golf"},
{"name":"Cable face pull","rx":"3×15 · RPE 6","sets":3,"rest":60,"cues":["Every session — keeps rotator cuff healthy","Elbows high and wide, spread at the face"],"vid":"cable+face+pull+form+tutorial+shoulder+health"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Hollow body hold","rx":"3×30s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if needed"],"vid":"hollow+body+hold+core+form+tutorial"},
{"name":"Stir the pot","rx":"3×10 each direction","sets":3,"rest":45,"cues":["Forearms on stability ball, make small circles — brace the whole time","Keep hips level and breathe steadily throughout"],"vid":"stir+the+pot+plank+core+exercise+form"},
{"name":"Tall kneeling Pallof press","rx":"3×12 each side","sets":3,"rest":45,"cues":["Kneel tall — no hip hinge allowed — press and hold 1 second","Removes the hip from the equation — pure anti-rotation"],"vid":"tall+kneeling+pallof+press+core+tutorial"}
]}
],
B:[
{label:"Explosive A — Trap bar jump deadlift heavy",mins:15,exercises:[
{"name":"Trap bar jump deadlift heavier","rx":"4×4 · explosive · rest 3 min","sets":4,"rest":180,"cues":["Heavier than week 1 — drive up explosively, leave the ground","Closest gym movement to driving through impact in golf"],"vid":"trap+bar+jump+deadlift+power+form"}
]},
{label:"Explosive B — Box jump + Hip thrust speed",mins:18,exercises:[
{"name":"Box jump","rx":"4×5 · explosive","sets":4,"rest":120,"cues":["Full hip extension at the top — don't just step up with momentum","Land softly, step down — knees stay in line with toes"],"vid":"box+jump+form+tutorial+explosive+power"},
{"name":"Hip thrust speed reps","rx":"4×6 at 60% max · fast · rest 2 min","sets":4,"rest":120,"cues":["60% load, drive hips fast — speed of contraction is the stimulus","Full extension at top, controlled descent — repeat immediately"],"vid":"barbell+hip+thrust+form+tutorial+glutes"}
]},
{label:"Superset C — Single leg box jump + Lateral band step heavy",mins:16,exercises:[
{"name":"Single leg box jump","rx":"3×4 each side · explosive","sets":3,"rest":90,"cues":["Drive through one leg explosively — land softly on the box","Builds unilateral power directly relevant to the downswing"],"vid":"single+leg+box+jump+explosive+power+form"},
{"name":"Lateral band step heavy","rx":"3×20 each side · rest 90s","sets":3,"rest":90,"cues":["Heavy band around ankles, stay low — controlled steps","Trains hip abductors for follow-through balance"],"vid":"lateral+band+step+glute+form"}
]},
{label:"Accessory",mins:14,exercises:[
{"name":"Single leg RDL heavier","rx":"3×8 each side · RPE 8","sets":3,"rest":60,"cues":["Heavier than Phase 3 — same hip hinge on one leg, more demand","Balance and hamstring — builds finish-position stability"],"vid":"single+leg+romanian+deadlift+form"},
{"name":"Farmers carry heaviest","rx":"3×40m","sets":3,"rest":60,"cues":["Heaviest load yet — walk tall, no lean, 40 meters each set","Maximum core and grip demand"],"vid":"farmers+carry+form+tutorial+core"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"Copenhagen plank","rx":"3×20s each side","sets":3,"rest":45,"cues":["Side plank with top foot on a bench — hip adductors and obliques","Keep the bottom knee off the ground for full difficulty"],"vid":"copenhagen+plank+form+tutorial+adductors"},
{"name":"Hollow body hold","rx":"3×30s","sets":3,"rest":45,"cues":["Lower back pressed into floor, arms and legs hovering — hold the tension","Bend knees to regress if needed"],"vid":"hollow+body+hold+core+form+tutorial"},
{"name":"Bear crawl","rx":"3×20m","sets":3,"rest":30,"cues":["Hands and toes, knees hover 1 inch off floor — move contralaterally","Slow and controlled — core stability and shoulder coordination"],"vid":"bear+crawl+exercise+form+tutorial"}
]}
]
},
'3':{
A:[
{label:"Power block A — Band resisted punch + TRX push up",mins:18,exercises:[
{"name":"Band resisted punch","rx":"4×10 each side · explosive","sets":4,"rest":90,"cues":["Band behind you, punch fast across your body — rotate through the hips","Explosive intent every rep — this trains fast-twitch rotational power"],"vid":"band+resisted+punch+rotational+power+golf"},
{"name":"TRX or ring push up","rx":"4×10 · RPE 7 · rest 90s","sets":4,"rest":90,"cues":["Rings/TRX add instability — squeeze everything to stabilize","Control the descent more than the press"],"vid":"TRX+ring+push+up+form+tutorial"}
]},
{label:"Strength B — Single arm cable press + Explosive pulldown",mins:14,exercises:[
{"name":"Single arm cable press standing","rx":"3×10 each side · RPE 7","sets":3,"rest":90,"cues":["Standing with slight stagger — press and resist trunk rotation","Trains the push pattern with core integration"],"vid":"single+arm+cable+press+standing+form"},
{"name":"Lat pulldown explosive concentric","rx":"3×8 · RPE 7 · rest 90s","sets":3,"rest":90,"cues":["Pull fast on the way down, control the return — speed is the stimulus","Explosive concentric builds lat power for the downswing"],"vid":"lat+pulldown+explosive+form+tutorial"}
]},
{label:"Golf-specific finisher",mins:12,exercises:[
{"name":"Cable woodchop fast","rx":"3×10 each side · explosive","sets":3,"rest":60,"cues":["Max speed intent — same pattern as the downswing, same hip-first sequence","Decelerate under control at the end of each rep"],"vid":"cable+wood+chop+rotational+power+golf+form"},
{"name":"Serratus wall slide","rx":"3×12","sets":3,"rest":60,"cues":["Arms on wall, slide up — push the wall away to protract the shoulder blade","Critical for a consistent swing plane and shoulder health"],"vid":"serratus+wall+slide+form"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"TRX fallout","rx":"3×10","sets":3,"rest":45,"cues":["Reach arms overhead, lower your body toward floor — hips stay in line","Anti-extension demand — don't let hips sag or pike"],"vid":"TRX+fallout+core+anti+extension+form"},
{"name":"Side plank with rotation","rx":"3×8 each side","sets":3,"rest":45,"cues":["Side plank, rotate top arm under and back — trains oblique in the golf position","Control the rotation — don't rush, feel the oblique work"],"vid":"rotational+side+plank+core+form"},
{"name":"McGill curl up","rx":"3×8 each side","sets":3,"rest":45,"cues":["One knee bent, hands under lower back — tiny crunch, neck neutral","Builds spinal stability without compressing the discs"],"vid":"mcgill+curl+up+form+tutorial+spine"}
]}
],
B:[
{label:"Explosive A — Broad jump",mins:15,exercises:[
{"name":"Broad jump","rx":"4×4 · explosive · rest 3 min","sets":4,"rest":180,"cues":["Full hip extension at takeoff — drive arms back then forward to generate momentum","Land softly with bent knees — absorb the landing through the hips"],"vid":"broad+jump+explosive+power+form+tutorial"}
]},
{label:"Explosive B — Trap bar DL fast + Lateral lunge jump",mins:18,exercises:[
{"name":"Trap bar deadlift moderate fast","rx":"4×5 · explosive","sets":4,"rest":120,"cues":["Moderate load, maximum speed — drive the floor away as fast as possible","Speed intent even if the bar moves slower — compensatory acceleration"],"vid":"trap+bar+deadlift+form+tutorial+lower+back+safe"},
{"name":"Lateral lunge with jump","rx":"3×8 each side · explosive · rest 2 min","sets":3,"rest":120,"cues":["Lunge laterally then drive off that foot explosively — trains lateral power","Land softly, absorb through the hip — reset and repeat"],"vid":"lateral+lunge+jump+explosive+power+form"}
]},
{label:"Superset C — Hip thrust pause + Cable pull through fast",mins:16,exercises:[
{"name":"Hip thrust pause at top","rx":"4×8 · RPE 8","sets":4,"rest":90,"cues":["Drive to full extension, pause 2 sec — maximum time under tension at peak","Squeeze glutes as hard as possible at the pause"],"vid":"barbell+hip+thrust+form+tutorial+glutes"},
{"name":"Cable pull through fast","rx":"3×15 · explosive · rest 90s","sets":3,"rest":90,"cues":["Hip hinge fast — drive hips through explosively, squeeze glutes at top","Speed is the stimulus — same pattern as before but with intent"],"vid":"cable+pull+through+form+tutorial"}
]},
{label:"Core finisher",mins:12,exercises:[
{"name":"TRX fallout","rx":"3×10","sets":3,"rest":45,"cues":["Reach arms overhead, lower your body toward floor — hips stay in line","Anti-extension demand — don't let hips sag or pike"],"vid":"TRX+fallout+core+anti+extension+form"},
{"name":"McGill curl up","rx":"3×8 each side","sets":3,"rest":45,"cues":["One knee bent, hands under lower back — tiny crunch, neck neutral","Builds spinal stability without compressing the discs"],"vid":"mcgill+curl+up+form+tutorial+spine"},
{"name":"Stir the pot","rx":"3×10 each direction","sets":3,"rest":45,"cues":["Forearms on stability ball, make small circles — brace the whole time","Keep hips level and breathe steadily throughout"],"vid":"stir+the+pot+plank+core+exercise+form"}
]}
]
}
}
};

const MOBILITY = {
'1':{
  A:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thread the needle","rx":"2×8 each side","sets":0,"rest":0,"cues":["Start on all fours — thread one arm under your body and follow your gaze, rotating from mid-back","Exhale as you thread through — hold at end range for a full breath"],"vid":"thread+the+needle+thoracic+rotation+mobility"},
      {"name":"Thoracic rotation open book","rx":"2×8 each side","sets":0,"rest":0,"cues":["Lie on side with hips stacked — rotate top arm and shoulder toward the floor","Rotation comes from mid-back, not neck — follow your hand with your eyes"],"vid":"thoracic+rotation+open+book+mobility"},
      {"name":"Pec minor stretch on foam roller","rx":"2×30s","sets":0,"rest":0,"cues":["Lie on roller along the spine, arms at 90° and let them fall to the sides — breathe deeply","The pec minor pulls the shoulder forward — releasing it restores upright posture"],"vid":"pec+minor+stretch+foam+roller+mobility"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Wall slides","rx":"2×10","sets":0,"rest":0,"cues":["Back of hands and forearms stay in contact with the wall throughout","Slide slowly up — feel the shoulder blades elevate and rotate fully"],"vid":"wall+slides+shoulder+mobility"},
      {"name":"Overhead tricep and lat stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Reach one arm overhead, lean away from that side — feel the lat and tricep lengthen","Keep the opposite side grounded — don't let the hip flare out"],"vid":"overhead+lat+tricep+stretch+mobility"},
      {"name":"Thoracic extension over foam roller","rx":"2×5 positions","sets":0,"rest":0,"cues":["Place roller across mid-back, support head, extend back over the roller","Move to 3–4 positions up the mid-back — never place roller on the lower back"],"vid":"thoracic+extension+foam+roller+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Band dislocates","rx":"2×10","sets":0,"rest":0,"cues":["Wide grip on band, pass overhead and behind — keep arms straight throughout","Adjust grip width until the movement is smooth — never force the range"],"vid":"band+dislocates+shoulder+mobility"},
      {"name":"Cross body shoulder stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Pull one arm across the chest, press just above the elbow to deepen","Keep shoulder down away from your ear — feel the posterior deltoid release"],"vid":"cross+body+shoulder+stretch+mobility"},
      {"name":"Sleeper stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Lie on your side, shoulder at 90° — gently press the forearm toward the floor","Targets the posterior rotator cuff — essential shoulder health maintenance"],"vid":"sleeper+stretch+rotator+cuff+mobility"}
    ]}
  },
  B:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Hip 90/90 switch","rx":"2×10 each side","sets":0,"rest":0,"cues":["Sit on floor, both knees at 90° — rotate from side to side keeping chest tall","Each position opens internal or external rotation — breathe into the tight side"],"vid":"hip+90+90+mobility+switch"},
      {"name":"Hip flexor stretch kneeling","rx":"2×30s each side","sets":0,"rest":0,"cues":["Back knee on floor, tuck tailbone under — this doubles the hip flexor stretch","Without the pelvic tuck you're mostly stretching quad, not hip flexor"],"vid":"kneeling+hip+flexor+stretch+mobility"},
      {"name":"Ankle mobility wall rocks","rx":"2×10 each side","sets":0,"rest":0,"cues":["Foot flat on floor close to the wall — drive knee over toes toward the wall","Better ankle mobility means deeper squats and safer landings — do this daily"],"vid":"ankle+mobility+wall+rocks"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Deep squat hold","rx":"2×30s","sets":0,"rest":0,"cues":["Heels flat, chest tall, arms inside knees — hold and breathe into the hips","Use a rig or doorframe for support if needed — gradually reduce over time"],"vid":"deep+squat+hold+mobility"},
      {"name":"Lateral lunge with reach","rx":"8 each side","sets":0,"rest":0,"cues":["Step wide to the side, sit into one hip — reach arms forward for counterbalance","Feel the inner groin and adductors stretch — hold briefly at the bottom"],"vid":"lateral+lunge+reach+mobility"},
      {"name":"Couch stretch","rx":"2×45s each side","sets":0,"rest":0,"cues":["Back foot elevated on bench or wall, front knee at 90° — keep torso tall","Squeeze the glute of the back leg to intensify the hip flexor stretch"],"vid":"couch+stretch+hip+flexor+quad+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Spiderman lunge with rotation","rx":"5 each side","sets":0,"rest":0,"cues":["Deep lunge, drop same-side elbow to floor, then rotate top arm to ceiling","The best single-movement hip flexor and thoracic rotation combination"],"vid":"spiderman+lunge+rotation+mobility"},
      {"name":"Calf stretch against wall","rx":"2×30s each side","sets":0,"rest":0,"cues":["Hands on wall, back leg straight — press heel into the floor firmly","Bent-knee version targets the soleus — do both for complete ankle range"],"vid":"calf+stretch+wall+ankle+mobility"},
      {"name":"Seated butterfly stretch","rx":"2×30s","sets":0,"rest":0,"cues":["Sit with soles together, hands on feet — breathe and let knees sink toward the floor","Gentle elbow pressure on knees to deepen — never force the range"],"vid":"seated+butterfly+stretch+hip+groin+mobility"}
    ]}
  }
},
'2':{
  A:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thoracic rotation open book","rx":"2×8 each side","sets":0,"rest":0,"cues":["Lie on side with hips stacked — rotate top arm and shoulder toward the floor","Rotation comes from mid-back, not neck — follow your hand with your eyes"],"vid":"thoracic+rotation+open+book+mobility"},
      {"name":"Doorway chest opener","rx":"2×30s each side","sets":0,"rest":0,"cues":["Arm at 90° in the doorway, step forward — breathe into the chest stretch","Heavy pressing needs mobile pecs — vary arm height each rep to hit all fibers"],"vid":"doorway+chest+stretch+pec+opener"},
      {"name":"Wall slides","rx":"2×10","sets":0,"rest":0,"cues":["Back of hands and forearms stay in contact with the wall throughout","Slide slowly up — feel the shoulder blades elevate and rotate fully"],"vid":"wall+slides+shoulder+mobility"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thread the needle","rx":"2×8 each side","sets":0,"rest":0,"cues":["Start on all fours — thread one arm under your body and follow your gaze, rotating from mid-back","Exhale as you thread through — hold at end range for a full breath"],"vid":"thread+the+needle+thoracic+rotation+mobility"},
      {"name":"Overhead tricep and lat stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Reach one arm overhead, lean away from that side — feel the lat and tricep lengthen","Keep the opposite side grounded — don't let the hip flare out"],"vid":"overhead+lat+tricep+stretch+mobility"},
      {"name":"Band dislocates","rx":"2×10","sets":0,"rest":0,"cues":["Wide grip on band, pass overhead and behind — keep arms straight throughout","Adjust grip width until the movement is smooth — never force the range"],"vid":"band+dislocates+shoulder+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thoracic extension over foam roller","rx":"2×5 positions","sets":0,"rest":0,"cues":["Place roller across mid-back, support head, extend back over the roller","Move to 3–4 positions up the mid-back — never place roller on the lower back"],"vid":"thoracic+extension+foam+roller+mobility"},
      {"name":"Pec minor stretch on foam roller","rx":"2×30s","sets":0,"rest":0,"cues":["Lie on roller along the spine, arms at 90° and let them fall to the sides — breathe deeply","The pec minor pulls the shoulder forward — releasing it restores upright posture"],"vid":"pec+minor+stretch+foam+roller+mobility"},
      {"name":"Cross body shoulder stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Pull one arm across the chest, press just above the elbow to deepen","Keep shoulder down away from your ear — feel the posterior deltoid release"],"vid":"cross+body+shoulder+stretch+mobility"}
    ]}
  },
  B:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Hip 90/90 switch","rx":"2×10 each side","sets":0,"rest":0,"cues":["Sit on floor, both knees at 90° — rotate from side to side keeping chest tall","Each position opens internal or external rotation — breathe into the tight side"],"vid":"hip+90+90+mobility+switch"},
      {"name":"Pigeon pose or figure 4","rx":"2×45s each side","sets":0,"rest":0,"cues":["Lead hip on the ground, slide back leg out — breathe into the outer glute","If pigeon is too intense, do figure-4 on your back — same target, less pressure"],"vid":"pigeon+pose+figure+4+hip+opener+mobility"},
      {"name":"Hip flexor stretch kneeling","rx":"2×30s each side","sets":0,"rest":0,"cues":["Back knee on floor, tuck tailbone under — this doubles the hip flexor stretch","Without the pelvic tuck you're mostly stretching quad, not hip flexor"],"vid":"kneeling+hip+flexor+stretch+mobility"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Deep squat hold","rx":"2×30s","sets":0,"rest":0,"cues":["Heels flat, chest tall, arms inside knees — hold and breathe into the hips","Use a rig or doorframe for support if needed — gradually reduce over time"],"vid":"deep+squat+hold+mobility"},
      {"name":"Couch stretch","rx":"2×45s each side","sets":0,"rest":0,"cues":["Back foot elevated on bench or wall, front knee at 90° — keep torso tall","Squeeze the glute of the back leg to intensify the hip flexor stretch"],"vid":"couch+stretch+hip+flexor+quad+mobility"},
      {"name":"Lateral lunge with reach","rx":"8 each side","sets":0,"rest":0,"cues":["Step wide to the side, sit into one hip — reach arms forward for counterbalance","Feel the inner groin and adductors stretch — hold briefly at the bottom"],"vid":"lateral+lunge+reach+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Spiderman lunge with rotation","rx":"5 each side","sets":0,"rest":0,"cues":["Deep lunge, drop same-side elbow to floor, then rotate top arm to ceiling","The best single-movement hip flexor and thoracic rotation combination"],"vid":"spiderman+lunge+rotation+mobility"},
      {"name":"Calf stretch against wall","rx":"2×30s each side","sets":0,"rest":0,"cues":["Hands on wall, back leg straight — press heel into the floor firmly","Bent-knee version targets the soleus — do both for complete ankle range"],"vid":"calf+stretch+wall+ankle+mobility"},
      {"name":"Seated butterfly stretch","rx":"2×30s","sets":0,"rest":0,"cues":["Sit with soles together, hands on feet — breathe and let knees sink toward the floor","Gentle elbow pressure on knees to deepen — never force the range"],"vid":"seated+butterfly+stretch+hip+groin+mobility"}
    ]}
  }
},
'3':{
  A:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thread the needle","rx":"2×8 each side","sets":0,"rest":0,"cues":["Start on all fours — thread one arm under your body and follow your gaze, rotating from mid-back","Exhale as you thread through — hold at end range for a full breath"],"vid":"thread+the+needle+thoracic+rotation+mobility"},
      {"name":"Thoracic rotation open book","rx":"2×8 each side","sets":0,"rest":0,"cues":["Lie on side with hips stacked — rotate top arm and shoulder toward the floor","Thoracic rotation is the foundation of the golf swing — earn it before every session"],"vid":"thoracic+rotation+open+book+mobility"},
      {"name":"Overhead tricep and lat stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Reach one arm overhead, lean away from that side — feel the lat and tricep lengthen","A tight lat limits backswing range — release it here before the rotational work"],"vid":"overhead+lat+tricep+stretch+mobility"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Wall slides","rx":"2×10","sets":0,"rest":0,"cues":["Back of hands and forearms stay in contact with the wall throughout","Builds the shoulder blade control the rotational pressing movements demand"],"vid":"wall+slides+shoulder+mobility"},
      {"name":"Doorway chest opener","rx":"2×30s each side","sets":0,"rest":0,"cues":["Arm at 90° in the doorway, step forward — breathe into the chest stretch","Tight pecs restrict the backswing — open them before every Phase 3 session"],"vid":"doorway+chest+stretch+pec+opener"},
      {"name":"Sleeper stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Lie on your side, shoulder at 90° — gently press the forearm toward the floor","Targets the posterior rotator cuff — essential shoulder health under rotational load"],"vid":"sleeper+stretch+rotator+cuff+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thoracic extension over foam roller","rx":"2×5 positions","sets":0,"rest":0,"cues":["Place roller across mid-back, support head, extend back over the roller","Mid-thoracic extension lets the trail shoulder turn fully on the backswing"],"vid":"thoracic+extension+foam+roller+mobility"},
      {"name":"Cross body shoulder stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Pull one arm across the chest, press just above the elbow to deepen","Keep shoulder down away from your ear — feel the posterior deltoid release"],"vid":"cross+body+shoulder+stretch+mobility"},
      {"name":"Band dislocates","rx":"2×10","sets":0,"rest":0,"cues":["Wide grip on band, pass overhead and behind — keep arms straight throughout","Primes the shoulder for the end-range positions in rotational pressing"],"vid":"band+dislocates+shoulder+mobility"}
    ]}
  },
  B:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Hip 90/90 switch","rx":"2×10 each side","sets":0,"rest":0,"cues":["Sit on floor, both knees at 90° — rotate from side to side keeping chest tall","The hip rotation in this drill is the exact motion your downswing demands"],"vid":"hip+90+90+mobility+switch"},
      {"name":"Pigeon pose or figure 4","rx":"2×45s each side","sets":0,"rest":0,"cues":["Lead hip on the ground, slide back leg out — breathe into the outer glute","Hip mobility here directly translates to rotation through impact"],"vid":"pigeon+pose+figure+4+hip+opener+mobility"},
      {"name":"Spiderman lunge with rotation","rx":"5 each side","sets":0,"rest":0,"cues":["Deep lunge, drop same-side elbow to floor, then rotate top arm to ceiling","Opens the hip and thoracic spine simultaneously — golf-specific prep in one move"],"vid":"spiderman+lunge+rotation+mobility"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Hip flexor stretch kneeling","rx":"2×30s each side","sets":0,"rest":0,"cues":["Back knee on floor, tuck tailbone under — this doubles the hip flexor stretch","Tight hip flexors block hip turn — this directly improves your swing range"],"vid":"kneeling+hip+flexor+stretch+mobility"},
      {"name":"Lateral lunge with reach","rx":"8 each side","sets":0,"rest":0,"cues":["Step wide to the side, sit into one hip — reach arms forward for counterbalance","Trains the lateral hip mobility needed for weight transfer in the swing"],"vid":"lateral+lunge+reach+mobility"},
      {"name":"Deep squat hold","rx":"2×30s","sets":0,"rest":0,"cues":["Heels flat, chest tall, arms inside knees — hold and breathe into the hips","Full squat depth primes the hips and ankles for explosive lower body work"],"vid":"deep+squat+hold+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Ankle mobility wall rocks","rx":"2×10 each side","sets":0,"rest":0,"cues":["Foot flat on floor close to the wall — drive knee over toes toward the wall","Ankle mobility affects weight transfer through impact — a surprisingly important link"],"vid":"ankle+mobility+wall+rocks"},
      {"name":"Couch stretch","rx":"2×45s each side","sets":0,"rest":0,"cues":["Back foot elevated on bench or wall, front knee at 90° — keep torso tall","Squeeze the glute of the back leg to intensify the hip flexor stretch"],"vid":"couch+stretch+hip+flexor+quad+mobility"},
      {"name":"Calf stretch against wall","rx":"2×30s each side","sets":0,"rest":0,"cues":["Hands on wall, back leg straight — press heel into the floor firmly","Bent-knee version targets the soleus — do both for complete ankle range"],"vid":"calf+stretch+wall+ankle+mobility"}
    ]}
  }
},
'4':{
  A:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thoracic rotation open book","rx":"2×8 each side","sets":0,"rest":0,"cues":["Lie on side with hips stacked — rotate top arm and shoulder toward the floor","Explosive upper body work demands full thoracic rotation — earn it here"],"vid":"thoracic+rotation+open+book+mobility"},
      {"name":"Cross body shoulder stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Pull one arm across the chest, press just above the elbow to deepen","Releases the posterior deltoid before explosive pressing and pulling"],"vid":"cross+body+shoulder+stretch+mobility"},
      {"name":"Wall slides","rx":"2×10","sets":0,"rest":0,"cues":["Back of hands and forearms stay in contact with the wall throughout","Builds the shoulder blade stability that explosive movements demand"],"vid":"wall+slides+shoulder+mobility"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Thread the needle","rx":"2×8 each side","sets":0,"rest":0,"cues":["Start on all fours — thread one arm under your body and follow your gaze, rotating from mid-back","Thoracic rotation unlocks the rotational power Phase 4 is built around"],"vid":"thread+the+needle+thoracic+rotation+mobility"},
      {"name":"Doorway chest opener","rx":"2×30s each side","sets":0,"rest":0,"cues":["Arm at 90° in the doorway, step forward — breathe into the chest stretch","Tight pecs limit the explosive follow-through — open them first"],"vid":"doorway+chest+stretch+pec+opener"},
      {"name":"Pec minor stretch on foam roller","rx":"2×30s","sets":0,"rest":0,"cues":["Lie on roller along the spine, arms at 90° and let them fall to the sides — breathe deeply","The pec minor pulls the shoulder forward — releasing it restores upright posture"],"vid":"pec+minor+stretch+foam+roller+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Sleeper stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Lie on your side, shoulder at 90° — gently press the forearm toward the floor","Targets the posterior rotator cuff — essential shoulder health under explosive load"],"vid":"sleeper+stretch+rotator+cuff+mobility"},
      {"name":"Overhead tricep and lat stretch","rx":"2×30s each side","sets":0,"rest":0,"cues":["Reach one arm overhead, lean away from that side — feel the lat and tricep lengthen","Lat tension limits the overhead position in explosive pressing — release it here"],"vid":"overhead+lat+tricep+stretch+mobility"},
      {"name":"Thoracic extension over foam roller","rx":"2×5 positions","sets":0,"rest":0,"cues":["Place roller across mid-back, support head, extend back over the roller","Move to 3–4 positions up the mid-back — never place roller on the lower back"],"vid":"thoracic+extension+foam+roller+mobility"}
    ]}
  },
  B:{
    '1':{label:"Mobility block",mins:8,exercises:[
      {"name":"Hip 90/90 switch","rx":"2×10 each side","sets":0,"rest":0,"cues":["Sit on floor, both knees at 90° — rotate from side to side keeping chest tall","Hip rotation mobility is what separates a powerful swing from a compensated one"],"vid":"hip+90+90+mobility+switch"},
      {"name":"Spiderman lunge with rotation","rx":"5 each side","sets":0,"rest":0,"cues":["Deep lunge, drop same-side elbow to floor, then rotate top arm to ceiling","The best prep movement for the explosive hip hinge and jump patterns ahead"],"vid":"spiderman+lunge+rotation+mobility"},
      {"name":"Ankle mobility wall rocks","rx":"2×10 each side","sets":0,"rest":0,"cues":["Foot flat on floor close to the wall — drive knee over toes toward the wall","Ankle mobility limits force absorption during box jumps and plyometrics"],"vid":"ankle+mobility+wall+rocks"}
    ]},
    '2':{label:"Mobility block",mins:8,exercises:[
      {"name":"Hip flexor stretch kneeling","rx":"2×30s each side","sets":0,"rest":0,"cues":["Back knee on floor, tuck tailbone under — this doubles the hip flexor stretch","Hip mobility is critical for generating force through the ground in explosive work"],"vid":"kneeling+hip+flexor+stretch+mobility"},
      {"name":"Pigeon pose or figure 4","rx":"2×45s each side","sets":0,"rest":0,"cues":["Lead hip on the ground, slide back leg out — breathe into the outer glute","Open hips allow maximum force transfer through the ground in explosive movements"],"vid":"pigeon+pose+figure+4+hip+opener+mobility"},
      {"name":"Couch stretch","rx":"2×45s each side","sets":0,"rest":0,"cues":["Back foot elevated on bench or wall, front knee at 90° — keep torso tall","Squeeze the glute of the back leg to intensify the hip flexor stretch"],"vid":"couch+stretch+hip+flexor+quad+mobility"}
    ]},
    '3':{label:"Mobility block",mins:8,exercises:[
      {"name":"Deep squat hold","rx":"2×30s","sets":0,"rest":0,"cues":["Heels flat, chest tall, arms inside knees — hold and breathe into the hips","Maximum hip and ankle range is required for the explosive loading positions ahead"],"vid":"deep+squat+hold+mobility"},
      {"name":"Lateral lunge with reach","rx":"8 each side","sets":0,"rest":0,"cues":["Step wide to the side, sit into one hip — reach arms forward for counterbalance","Lateral hip mobility is critical for safe explosive landings and broad jumps"],"vid":"lateral+lunge+reach+mobility"},
      {"name":"Seated butterfly stretch","rx":"2×30s","sets":0,"rest":0,"cues":["Sit with soles together, hands on feet — breathe and let knees sink toward the floor","Gentle elbow pressure on knees to deepen — never force the range"],"vid":"seated+butterfly+stretch+hip+groin+mobility"}
    ]}
  }
}
};

// ============ LIFT TRACKING LIST ============
const LIFTS_LIST = ['Goblet squat','Romanian deadlift','Leg press','Trap bar deadlift','Hip thrust','Incline DB press','Lat pulldown'];
