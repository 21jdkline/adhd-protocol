import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CheckCircle, Circle, TrendingUp, TrendingDown, Minus, Moon, Sun, Activity, Wind, Brain, Timer, Smartphone, Heart, Flame, Snowflake, Pill, Coffee, Utensils, Mic, MicOff, Calendar, Target, Zap, Dumbbell, Play, Pause, RotateCcw, ChevronDown, ChevronUp, ExternalLink, Award, Plus, Download, ClipboardList, FileText, HelpCircle, Volume2 } from 'lucide-react';

// ============================================
// DATA & CONSTANTS
// ============================================

const WORKOUTS = {
  A: {
    name: "Push (Gym - Yates HIT)",
    exercises: [
      { id: 'incline_db', name: 'Incline DB Press', warmup: '2×12-15', working: '1×6-10 FAIL', notes: 'Lengthened position' },
      { id: 'flat_bench', name: 'Flat Barbell Bench', warmup: '1×12', working: '1×6-10 FAIL', notes: 'Full ROM' },
      { id: 'cable_fly', name: 'Cable Fly (low-to-high)', warmup: '1×15', working: '1×10-15 FAIL', notes: 'Stretch at bottom' },
      { id: 'ohp', name: 'Overhead Press', warmup: '1×12', working: '1×6-10 FAIL', notes: 'Seated or standing' },
      { id: 'lateral', name: 'Lateral Raise', warmup: '1×15', working: '1×12-15 FAIL', notes: 'Slight lean forward' },
      { id: 'pushdown', name: 'Tricep Pushdown', warmup: '1×15', working: '1×10-15 FAIL', notes: 'Full lockout' },
      { id: 'overhead_tri', name: 'Overhead Tricep Ext', warmup: '-', working: '1×10-15 FAIL', notes: 'Lengthened position' },
    ]
  },
  B: {
    name: "Pull/Legs (Gym - Yates HIT)",
    exercises: [
      { id: 'pullup', name: 'Weighted Pull-ups', warmup: '2×8-10', working: '1×6-10 FAIL', notes: 'Full stretch at bottom' },
      { id: 'yates_row', name: 'Barbell Row (Yates)', warmup: '1×12', working: '1×6-10 FAIL', notes: 'Underhand, 70° angle' },
      { id: 'cable_row', name: 'Cable Row (stretch)', warmup: '1×15', working: '1×10-12 FAIL', notes: 'Let shoulders protract' },
      { id: 'bb_curl', name: 'Barbell Curl', warmup: '1×12', working: '1×8-12 FAIL', notes: 'No swinging' },
      { id: 'incline_curl', name: 'Incline DB Curl', warmup: '-', working: '1×10-12 FAIL', notes: 'Lengthened position' },
      { id: 'leg_press', name: 'Leg Press', warmup: '2×15', working: '1×10-15 FAIL', notes: 'Deep ROM, don\'t lock' },
      { id: 'rdl', name: 'Romanian Deadlift', warmup: '1×12', working: '1×8-12 FAIL', notes: 'Hamstring stretch' },
      { id: 'leg_curl', name: 'Leg Curl', warmup: '1×15', working: '1×10-15 FAIL', notes: 'Full ROM' },
      { id: 'calf', name: 'Calf Raise', warmup: '1×15', working: '1×12-20 FAIL', notes: 'Full stretch, pause top' },
    ]
  },
  C: {
    name: "Home (KB/DB/Barbell)",
    exercises: [
      { id: 'kb_swing', name: 'KB Swings', warmup: '-', working: '3×15-20', notes: 'Hip hinge, explosive' },
      { id: 'goblet', name: 'Goblet Squat', warmup: '-', working: '3×12-15', notes: 'Deep, pause at bottom' },
      { id: 'lm_press', name: 'Landmine Press', warmup: '-', working: '3×10-12/side', notes: 'Standing or kneeling' },
      { id: 'lm_row', name: 'Landmine Row', warmup: '-', working: '3×10-12/side', notes: 'Brace core, pull to hip' },
      { id: 'floor_press', name: 'DB Floor Press', warmup: '-', working: '3×10-12', notes: 'Or use bench' },
      { id: 'clean_press', name: 'KB Clean & Press', warmup: '-', working: '3×8-10/side', notes: 'Full body power' },
      { id: 'curl_bar', name: 'Curl Bar Curls', warmup: '-', working: '3×10-12', notes: 'Strict form' },
      { id: 'tgu', name: 'KB Turkish Get-Up', warmup: '-', working: '2×3/side', notes: 'Slow, controlled' },
      { id: 'farmer', name: 'Farmer Carry', warmup: '-', working: '3×40-60 sec', notes: 'Heavy, grip + core' },
    ]
  },
  '4x4': {
    name: "Norwegian 4×4 HIIT",
    type: 'cardio',
    exercises: [
      { id: 'warmup', name: 'Warm-up', duration: '5-10 min', notes: 'Easy cardio, nasal breathing' },
      { id: 'interval1', name: 'Interval 1', duration: '4 min', notes: '85-95% max HR, mouth breathing OK' },
      { id: 'recovery1', name: 'Recovery 1', duration: '3 min', notes: 'Active recovery, nasal breathing' },
      { id: 'interval2', name: 'Interval 2', duration: '4 min', notes: '85-95% max HR' },
      { id: 'recovery2', name: 'Recovery 2', duration: '3 min', notes: 'Active recovery' },
      { id: 'interval3', name: 'Interval 3', duration: '4 min', notes: '85-95% max HR' },
      { id: 'recovery3', name: 'Recovery 3', duration: '3 min', notes: 'Active recovery' },
      { id: 'interval4', name: 'Interval 4', duration: '4 min', notes: '85-95% max HR' },
      { id: 'cooldown', name: 'Cool-down', duration: '5 min', notes: 'Easy cardio, nasal breathing' },
    ]
  },
  'zone2': {
    name: "Zone 2 Nasal Cardio",
    type: 'cardio',
    exercises: [
      { id: 'zone2', name: 'Zone 2 Cardio', duration: '20-30 min', notes: 'Nasal breathing ONLY. If you must mouth breathe, reduce intensity.' },
    ]
  },
  D: {
    name: "Daily Mobility (10-15 min)",
    type: 'mobility',
    exercises: [
      { id: 'cat_cow', name: 'Cat-Cow', duration: '1 min', notes: 'Sync with breath, slow' },
      { id: 'world_greatest', name: 'World\'s Greatest Stretch', duration: '2 min', notes: '5-6 reps per side, hold 3 sec' },
      { id: 't_spine', name: 'T-Spine Rotation', duration: '1 min', notes: 'Side-lying, follow hand with eyes' },
      { id: '90_90', name: '90/90 Hip Switches', duration: '2 min', notes: 'Sit tall, control the transition' },
      { id: 'hip_flexor', name: 'Half-Kneeling Hip Flexor', duration: '2 min', notes: '1 min/side, squeeze glute, posterior tilt' },
      { id: 'shoulder_cars', name: 'Shoulder CARs', duration: '2 min', notes: '5 slow circles each direction/arm' },
      { id: 'deep_squat', name: 'Deep Squat Hold', duration: '2 min', notes: 'Heels down, push knees out, breathe' },
      { id: 'dead_hang', name: 'Dead Hang', duration: '1 min', notes: 'Passive or active, decompress spine' },
    ]
  },
  'sauna': {
    name: "Sauna Stretches (Reference)",
    type: 'reference',
    exercises: [
      { id: 'forward_fold', name: 'Seated Forward Fold', duration: '2 min', notes: 'Let gravity pull you down, relax neck' },
      { id: 'figure4', name: 'Figure-4 Hip Stretch', duration: '2 min', notes: '1 min/side, sit tall, hinge forward for depth' },
      { id: 'spinal_twist', name: 'Seated Spinal Twist', duration: '2 min', notes: '1 min/side, exhale into twist' },
      { id: 'neck_stretch', name: 'Neck Stretches', duration: '2 min', notes: 'Ear to shoulder, circles, chin tucks' },
      { id: 'shoulder_stretch', name: 'Cross-Body Shoulder', duration: '1 min', notes: '30 sec/side, pull at elbow' },
      { id: 'chest_opener', name: 'Chest Opener', duration: '1 min', notes: 'Clasp hands behind, squeeze shoulder blades' },
    ]
  }
};

const WEEKLY_SCHEDULE = {
  Mon: { workout: 'A', training: 'Push (Gym)', recovery: 'Sauna + Breathing' },
  Tue: { workout: '4x4', training: 'Norwegian 4×4', recovery: 'Cold (optional)' },
  Wed: { workout: 'C', training: 'Home KB/BB', recovery: 'Mobility' },
  Thu: { workout: 'B', training: 'Pull/Legs (Gym)', recovery: 'Sauna + Breathing' },
  Fri: { workout: '4x4', training: 'Norwegian 4×4', recovery: 'Cold (optional)' },
  Sat: { workout: 'C', training: 'Home KB/BB', recovery: 'Sauna + Breathing' },
  Sun: { workout: 'rest', training: 'REST', recovery: 'Extended NSDR' },
};

const ASRS6_QUESTIONS = [
  "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
  "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
  "How often do you have problems remembering appointments or obligations?",
  "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
  "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
  "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
];

const ASRS18_QUESTIONS = [
  "Trouble wrapping up final details of a project",
  "Difficulty getting things organized",
  "Problems remembering appointments/obligations",
  "Avoid/delay tasks requiring lots of thought",
  "Fidget or squirm when sitting",
  "Feel overly active/compelled to do things",
  "Make careless mistakes on boring projects",
  "Difficulty keeping attention on boring work",
  "Difficulty concentrating on direct conversation",
  "Misplace or have difficulty finding things",
  "Distracted by activity or noise",
  "Leave seat in meetings/situations",
  "Feel restless or fidgety",
  "Difficulty unwinding/relaxing",
  "Talking too much in social situations",
  "Finishing others' sentences",
  "Difficulty waiting turn",
  "Interrupting others when busy"
];

// Demo data
const generateDemoData = () => {
  const data = [];
  const startDate = new Date('2026-02-10');
  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const isBaseline = i < 7;
    data.push({
      date: date.toISOString().split('T')[0],
      day: i + 1,
      week: Math.ceil((i + 1) / 7),
      phase: isBaseline ? 'Baseline' : 'Protocol',
      bolt: isBaseline ? 18 + Math.random() * 4 : 20 + i * 0.5 + Math.random() * 3,
      morningHRV: 45 + Math.random() * 15 + (isBaseline ? 0 : i * 0.8),
      respiratoryRate: 15.5 - (isBaseline ? 0 : i * 0.08) + Math.random() * 0.5,
      sleepLatency: 25 - (isBaseline ? 0 : i * 0.8) + Math.random() * 5,
      deepSleep: 14 + (isBaseline ? 0 : i * 0.3) + Math.random() * 3,
      reactionTime: 280 - (isBaseline ? 0 : i * 2) + Math.random() * 20,
      hrr: 18 + (isBaseline ? 0 : i * 0.4) + Math.random() * 4,
    });
  }
  return data;
};

// ============================================
// UTILITY COMPONENTS
// ============================================

const TimerDisplay = ({ initialSeconds, onComplete, autoStart = false }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      onComplete?.();
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, onComplete]);

  const reset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex items-center gap-3">
      <div className="text-3xl font-mono font-bold text-gray-800">
        {mins}:{secs.toString().padStart(2, '0')}
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className={`p-2 rounded-full ${isRunning ? 'bg-orange-500' : 'bg-green-500'} text-white`}
      >
        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button onClick={reset} className="p-2 rounded-full bg-gray-200 text-gray-600">
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
};

const Stopwatch = ({ onSave }) => {
  const [ms, setMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setMs(m => m + 100), 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const reset = () => {
    setMs(0);
    setIsRunning(false);
  };

  const seconds = (ms / 1000).toFixed(1);

  return (
    <div className="flex items-center gap-3">
      <div className="text-3xl font-mono font-bold text-gray-800">
        {seconds}s
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className={`p-2 rounded-full ${isRunning ? 'bg-orange-500' : 'bg-green-500'} text-white`}
      >
        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button onClick={reset} className="p-2 rounded-full bg-gray-200 text-gray-600">
        <RotateCcw className="w-5 h-5" />
      </button>
      {ms > 0 && !isRunning && (
        <button 
          onClick={() => onSave?.(parseFloat(seconds))}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
        >
          Save {seconds}s
        </button>
      )}
    </div>
  );
};

const Accordion = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-blue-600" />}
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && <div className="px-4 pb-4 border-t border-gray-100">{children}</div>}
    </div>
  );
};

const NumberInput = ({ value, onChange, min = 0, max = 999, label }) => (
  <div className="flex items-center gap-2">
    {label && <span className="text-sm text-gray-600">{label}</span>}
    <input
      type="number"
      value={value || ''}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      min={min}
      max={max}
      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
    />
  </div>
);

// ============================================
// MAIN TABS
// ============================================

const TodayTab = ({ data, currentDay, completed, setCompleted, onLog }) => {
  const today = data[currentDay - 1] || data[data.length - 1];
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
  const schedule = WEEKLY_SCHEDULE[dayOfWeek];

  const CHECKLIST_ITEMS = {
    morning: [
      { id: 'bolt', label: 'BOLT Score', voice: 'log BOLT [#]' },
      { id: 'hrv', label: 'Morning HRV (Polar H10)', voice: null },
      { id: 'sunlight', label: 'Sunlight + Hydration (10 min)', voice: null },
      { id: 'breathwork', label: 'HRV Biofeedback (15 min)', voice: null },
      { id: 'co2', label: 'CO2 Tolerance (5 min)', voice: null },
    ],
    midday: [
      { id: 'meal1', label: 'Meal 1 + Supplements (10am)', voice: 'log coffee [#]' },
      { id: 'nsdr', label: 'NSDR (10-20 min)', voice: null },
      { id: 'meal3', label: 'Meal 3 (before 6pm)', voice: 'log dinner' },
    ],
    evening: [
      { id: 'reaction', label: 'Reaction Time Test', voice: 'log reaction [#]' },
      { id: 'sleepSupps', label: 'Sleep Supplements (9pm)', voice: null },
      { id: 'mouthTape', label: 'Mouth Tape (9:30pm)', voice: null },
    ],
  };

  const toggleItem = (id) => setCompleted(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-4">
      {/* Today's Training */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white">
        <div className="text-sm opacity-80">{dayOfWeek}'s Training</div>
        <div className="text-xl font-bold">{schedule.training}</div>
        <div className="text-sm opacity-80 mt-1">Recovery: {schedule.recovery}</div>
      </div>

      {/* Quick Log */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Log</h3>
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => {
              const val = window.prompt('BOLT score (seconds)?');
              if (val && !isNaN(val)) {
                onLog({ type: 'bolt', value: parseFloat(val) });
                window.alert(`Logged BOLT: ${val} seconds`);
              }
            }}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
          >
            <Wind className="w-5 h-5" style={{ color: '#1F4E79' }} />
            <span className="text-xs text-gray-600">BOLT</span>
          </button>
          <button
            onClick={() => {
              const val = window.prompt('Reaction time (ms)?');
              if (val && !isNaN(val)) {
                onLog({ type: 'reaction', value: parseFloat(val) });
                window.alert(`Logged reaction: ${val}ms`);
              }
            }}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
          >
            <Timer className="w-5 h-5" style={{ color: '#7B1FA2' }} />
            <span className="text-xs text-gray-600">Reaction</span>
          </button>
          <button
            onClick={() => {
              const val = window.prompt('Heart Rate Recovery (bpm drop)?');
              if (val && !isNaN(val)) {
                onLog({ type: 'hrr', value: parseFloat(val) });
                window.alert(`Logged HRR: ${val} bpm`);
              }
            }}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
          >
            <Heart className="w-5 h-5" style={{ color: '#C62828' }} />
            <span className="text-xs text-gray-600">HRR</span>
          </button>
          <button
            onClick={() => {
              const val = window.prompt('Caffeine (mg)?');
              if (val && !isNaN(val)) {
                onLog({ type: 'caffeine', value: parseFloat(val) });
                window.alert(`Logged caffeine: ${val}mg`);
              }
            }}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
          >
            <Coffee className="w-5 h-5" style={{ color: '#795548' }} />
            <span className="text-xs text-gray-600">Coffee</span>
          </button>
          <button
            onClick={() => {
              const val = window.prompt('Mobility duration (minutes)?');
              if (val && !isNaN(val)) {
                onLog({ type: 'mobility', value: parseFloat(val) });
                window.alert(`Logged mobility: ${val} min`);
              }
            }}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
          >
            <Activity className="w-5 h-5" style={{ color: '#00897B' }} />
            <span className="text-xs text-gray-600">Mobility</span>
          </button>
        </div>
      </div>

      {/* Checklists */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        {Object.entries(CHECKLIST_ITEMS).map(([section, items]) => (
          <div key={section}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {section}
            </h4>
            <div className="space-y-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                    completed[item.id] ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {completed[item.id] ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <span className={`flex-1 text-left text-sm ${completed[item.id] ? 'text-green-700' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                  {item.voice && (
                    <span className="text-xs text-gray-400">"{item.voice}"</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkoutTab = ({ onLog }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseData, setExerciseData] = useState({});
  const [cardioData, setCardioData] = useState({ maxHR: '', avgHR: '', duration: '', nasalPercent: 100 });
  const [nasalPercent, setNasalPercent] = useState(50);
  const [hrr, setHrr] = useState('');
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [completedIntervals, setCompletedIntervals] = useState({});

  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
  const suggestedWorkout = WEEKLY_SCHEDULE[dayOfWeek]?.workout;

  const updateSet = (exerciseId, setIndex, field, value) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        sets: [
          ...(prev[exerciseId]?.sets || []).slice(0, setIndex),
          { ...(prev[exerciseId]?.sets?.[setIndex] || {}), [field]: value },
          ...(prev[exerciseId]?.sets || []).slice(setIndex + 1),
        ]
      }
    }));
  };

  const addSet = (exerciseId) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        sets: [...(prev[exerciseId]?.sets || []), { weight: '', reps: '' }]
      }
    }));
  };

  const toggleInterval = (id) => {
    setCompletedIntervals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const saveWorkout = () => {
    const workoutLog = {
      type: 'workout',
      workout: selectedWorkout,
      workoutType: WORKOUTS[selectedWorkout]?.type || 'strength',
      exercises: exerciseData,
      cardioData: cardioData,
      completedIntervals,
      nasalPercent,
      hrr: parseFloat(hrr) || null,
      notes: workoutNotes,
      timestamp: new Date().toISOString(),
    };
    onLog(workoutLog);
    alert('Workout saved!');
  };

  if (!selectedWorkout) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-sm text-blue-700">Today's scheduled workout:</div>
          <div className="text-lg font-bold text-blue-900">
            {suggestedWorkout === 'rest' ? 'Rest Day' : WORKOUTS[suggestedWorkout]?.name || 'Rest'}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Strength</h3>
        <div className="grid grid-cols-3 gap-3">
          {['A', 'B', 'C'].map((key) => (
            <button
              key={key}
              onClick={() => setSelectedWorkout(key)}
              className={`p-4 rounded-xl text-left transition-all ${
                key === suggestedWorkout 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="font-semibold">Workout {key}</div>
              <div className={`text-xs ${key === suggestedWorkout ? 'text-blue-100' : 'text-gray-500'}`}>
                {WORKOUTS[key].name.split('(')[0]}
              </div>
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Cardio</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedWorkout('4x4')}
            className={`p-4 rounded-xl text-left transition-all ${
              suggestedWorkout === '4x4' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white shadow-sm hover:shadow-md'
            }`}
          >
            <div className="font-semibold">4×4 HIIT</div>
            <div className={`text-xs ${suggestedWorkout === '4x4' ? 'text-orange-100' : 'text-gray-500'}`}>
              Norwegian Protocol
            </div>
          </button>
          <button
            onClick={() => setSelectedWorkout('zone2')}
            className="p-4 rounded-xl text-left bg-white shadow-sm hover:shadow-md"
          >
            <div className="font-semibold">Zone 2</div>
            <div className="text-xs text-gray-500">Nasal Cardio</div>
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Mobility & Recovery</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedWorkout('D')}
            className="p-4 rounded-xl text-left bg-white shadow-sm hover:shadow-md"
          >
            <div className="font-semibold">Daily Mobility</div>
            <div className="text-xs text-gray-500">10-15 min routine</div>
          </button>
          <button
            onClick={() => setSelectedWorkout('sauna')}
            className="p-4 rounded-xl text-left bg-white shadow-sm hover:shadow-md"
          >
            <div className="font-semibold">Sauna Stretches</div>
            <div className="text-xs text-gray-500">Reference card</div>
          </button>
        </div>
      </div>
    );
  }

  const workout = WORKOUTS[selectedWorkout];
  const isCardio = workout.type === 'cardio';
  const isMobility = workout.type === 'mobility';
  const isReference = workout.type === 'reference';

  // Reference card (sauna stretches) - no logging needed
  if (isReference) {
    return (
      <div className="space-y-4">
        <button 
          onClick={() => setSelectedWorkout(null)}
          className="text-blue-600 text-sm"
        >
          ← Back to workouts
        </button>
        <h2 className="text-xl font-bold text-gray-800">{workout.name}</h2>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
          <strong>Note:</strong> These stretches are done during your sauna session. Logging sauna duration automatically includes these.
        </div>

        <div className="space-y-3">
          {workout.exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-800">{exercise.name}</div>
                  <div className="text-sm text-gray-500">{exercise.duration}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">{exercise.notes}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={() => setSelectedWorkout(null)}
            className="text-blue-600 text-sm mb-1"
          >
            ← Change workout
          </button>
          <h2 className="text-xl font-bold text-gray-800">{workout.name}</h2>
        </div>
        {!isReference && (
          <button
            onClick={saveWorkout}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium"
          >
            Save Workout
          </button>
        )}
      </div>

      {/* Instructions based on workout type */}
      {(selectedWorkout === 'A' || selectedWorkout === 'B') && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          <strong>Yates HIT:</strong> 1-2 warmup sets → 1 working set to failure. Use physiological sighs between sets (2 quick inhales through nose → 1 long exhale through mouth).
        </div>
      )}
      {selectedWorkout === 'C' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
          <strong>Home Workout:</strong> Focus on nasal breathing throughout. 60-90 sec rest between sets.
        </div>
      )}
      {selectedWorkout === '4x4' && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
          <strong>4×4 HIIT:</strong> Mouth breathing is OK during intervals. Target 85-95% max HR during work periods. Nasal during recovery.
        </div>
      )}
      {selectedWorkout === 'zone2' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <strong>Zone 2:</strong> 60-70% max HR. If you can't maintain nasal breathing, you're going too hard. Slow down.
        </div>
      )}
      {selectedWorkout === 'D' && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm text-teal-800">
          <strong>Daily Mobility:</strong> Do every day, ideally morning. Move slowly, breathe deeply. Don't rush.
        </div>
      )}

      {/* Exercises */}
      <div className="space-y-3">
        {workout.exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                {isCardio && (
                  <button
                    onClick={() => toggleInterval(exercise.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      completedIntervals[exercise.id] 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    {completedIntervals[exercise.id] && <CheckCircle className="w-4 h-4" />}
                  </button>
                )}
                <div>
                  <div className="font-semibold text-gray-800">{exercise.name}</div>
                  <div className="text-xs text-gray-500">
                    {isCardio || isMobility ? exercise.duration : (
                      <>
                        {exercise.warmup !== '-' && `Warmup: ${exercise.warmup} • `}
                        Working: {exercise.working}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {exercise.notes}
              </span>
            </div>

            {/* Weight/Reps inputs for strength workouts only */}
            {!isCardio && !isMobility && (
              <div className="space-y-2 mt-3">
                {(exerciseData[exercise.id]?.sets || [{ weight: '', reps: '' }]).map((set, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-8">Set {idx + 1}</span>
                    <input
                      type="number"
                      placeholder="lbs"
                      value={set.weight || ''}
                      onChange={(e) => updateSet(exercise.id, idx, 'weight', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                    <span className="text-gray-400">×</span>
                    <input
                      type="number"
                      placeholder="reps"
                      value={set.reps || ''}
                      onChange={(e) => updateSet(exercise.id, idx, 'reps', e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                  </div>
                ))}
                <button
                  onClick={() => addSet(exercise.id)}
                  className="flex items-center gap-1 text-sm text-blue-600 mt-1"
                >
                  <Plus className="w-4 h-4" /> Add set
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post-Workout section based on type */}
      {isCardio && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Cardio Stats</h3>
          
          {selectedWorkout === '4x4' && (
            <div>
              <label className="text-sm text-gray-600 block mb-2">Max HR During Intervals</label>
              <input
                type="number"
                value={cardioData.maxHR}
                onChange={(e) => setCardioData({ ...cardioData, maxHR: e.target.value })}
                placeholder="e.g., 175"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}
          
          {selectedWorkout === 'zone2' && (
            <>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Average HR</label>
                <input
                  type="number"
                  value={cardioData.avgHR}
                  onChange={(e) => setCardioData({ ...cardioData, avgHR: e.target.value })}
                  placeholder="e.g., 135"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={cardioData.duration}
                  onChange={(e) => setCardioData({ ...cardioData, duration: e.target.value })}
                  placeholder="e.g., 30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Nasal Breathing %</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cardioData.nasalPercent}
                  onChange={(e) => setCardioData({ ...cardioData, nasalPercent: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-center text-lg font-bold text-blue-600">{cardioData.nasalPercent}%</div>
              </div>
            </>
          )}

          <div>
            <label className="text-sm text-gray-600 block mb-2">Heart Rate Recovery (BPM drop at 1 min)</label>
            <input
              type="number"
              value={hrr}
              onChange={(e) => setHrr(e.target.value)}
              placeholder="e.g., 25"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Strength workout post-workout */}
      {!isCardio && !isMobility && !isReference && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Post-Workout</h3>
          
          <div>
            <label className="text-sm text-gray-600 block mb-2">Nasal Breathing %</label>
            <input
              type="range"
              min="0"
              max="100"
              value={nasalPercent}
              onChange={(e) => setNasalPercent(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-lg font-bold text-blue-600">{nasalPercent}%</div>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-2">Heart Rate Recovery (BPM drop at 1 min)</label>
            <input
              type="number"
              value={hrr}
              onChange={(e) => setHrr(e.target.value)}
              placeholder="e.g., 25"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-2">Notes</label>
            <textarea
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              placeholder="PRs, how you felt, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
            />
          </div>
        </div>
      )}

      {/* Mobility post */}
      {isMobility && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Complete</h3>
          <div>
            <label className="text-sm text-gray-600 block mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={cardioData.duration}
              onChange={(e) => setCardioData({ ...cardioData, duration: e.target.value })}
              placeholder="e.g., 12"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-2">Notes</label>
            <textarea
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              placeholder="Tight areas, improvements, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ProtocolsTab = ({ onLog, onComplete }) => {
  return (
    <div className="space-y-3">
      {/* BOLT Score */}
      <Accordion title="BOLT Score" icon={Wind} defaultOpen>
        <div className="space-y-3 pt-3">
          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
            <strong>Instructions:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Sit comfortably, rest 1-2 minutes</li>
              <li>Take a NORMAL breath IN through nose</li>
              <li>Take a NORMAL breath OUT through nose</li>
              <li>Pinch nose and start timer</li>
              <li>Stop at FIRST urge to breathe (not gasping)</li>
              <li>If you gasp on inhale, you went too long</li>
            </ol>
          </div>
          <Stopwatch onSave={(val) => {
            onLog({ type: 'bolt', value: val });
            onComplete?.('bolt');
            alert(`Saved BOLT: ${val} seconds`);
          }} />
          <div className="text-xs text-gray-500">
            Target: 40+ seconds | &lt;20 = needs work | 20-30 = good | 30-40 = very good
          </div>
        </div>
      </Accordion>

      {/* HRV Biofeedback */}
      <Accordion title="HRV Biofeedback Breathing" icon={Heart}>
        <div className="space-y-3 pt-3">
          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
            <strong>Instructions:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Wet Polar H10 electrodes, strap to chest</li>
              <li>Open HRV4Biofeedback app</li>
              <li>Breathe at your resonance frequency (usually 5-6/min)</li>
              <li>Inhale 5-6 sec nose, exhale 5-6 sec nose</li>
              <li>Watch for high-amplitude HRV oscillations</li>
            </ol>
          </div>
          <TimerDisplay initialSeconds={900} onComplete={() => onComplete?.('breathwork')} />
          <button
            onClick={() => onComplete?.('breathwork')}
            className="w-full py-2 bg-green-500 text-white rounded-lg font-medium"
          >
            Mark Complete
          </button>
        </div>
      </Accordion>

      {/* CO2 Tolerance */}
      <Accordion title="CO2 Tolerance Training" icon={Wind}>
        <div className="space-y-3 pt-3">
          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
            <strong>Instructions:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Normal exhale → hold until moderate air hunger</li>
              <li>Release and breathe normally 30-60 sec</li>
              <li>Repeat 3-5 rounds</li>
              <li>Holds should be 50-80% of BOLT score</li>
            </ol>
          </div>
          <TimerDisplay initialSeconds={300} onComplete={() => onComplete?.('co2')} />
          <button
            onClick={() => onComplete?.('co2')}
            className="w-full py-2 bg-green-500 text-white rounded-lg font-medium"
          >
            Mark Complete
          </button>
        </div>
      </Accordion>

      {/* Sauna */}
      <Accordion title="Sauna + Coherent Breathing" icon={Flame}>
        <div className="space-y-3 pt-3">
          <div className="bg-orange-50 rounded-lg p-3 text-sm text-orange-800">
            <strong>Protocol:</strong> 176-212°F for 15-20 min
            <br /><br />
            <strong>During sauna:</strong> Coherent breathing (5-6 breaths/min)
            <br /><br />
            <strong>Stretches:</strong> Forward fold, Figure-4 hip, Spinal twist, Neck stretches, Shoulder stretch, Chest opener
          </div>
          <TimerDisplay initialSeconds={1200} onComplete={() => {
            const mins = prompt('Sauna duration (minutes)?');
            if (mins) onLog({ type: 'sauna', value: parseFloat(mins) });
          }} />
          <button
            onClick={() => {
              const mins = prompt('Sauna duration (minutes)?');
              if (mins) {
                onLog({ type: 'sauna', value: parseFloat(mins) });
                alert(`Logged ${mins} min sauna`);
              }
            }}
            className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium"
          >
            Log Sauna Duration
          </button>
        </div>
      </Accordion>

      {/* Cold */}
      <Accordion title="Cold Exposure" icon={Snowflake}>
        <div className="space-y-3 pt-3">
          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
            <strong>Protocol:</strong> 2-5 min cold shower post-sauna
            <br /><br />
            <strong>Key:</strong> Practice breath control—avoid gasping, use slow nasal breathing
            <br /><br />
            <strong>Note:</strong> Do NOT do immediately before bed
          </div>
          <TimerDisplay initialSeconds={180} />
          <button
            onClick={() => {
              onLog({ type: 'cold', value: true });
              onComplete?.('cold');
              alert('Logged cold exposure');
            }}
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium"
          >
            Mark Complete
          </button>
        </div>
      </Accordion>

      {/* NSDR */}
      <Accordion title="NSDR (Non-Sleep Deep Rest)" icon={Moon}>
        <div className="space-y-3 pt-3">
          <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-800">
            <strong>Benefits:</strong> +65% dopamine increase (PET scan studies)
            <br /><br />
            <strong>When:</strong> 2-4pm or when fatigued
            <br /><br />
            <strong>Duration:</strong> 10-20 min (30 min on rest days)
          </div>
          <a
            href="https://www.youtube.com/watch?v=AKGrmY8OSHM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-600 font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Open Huberman NSDR (YouTube)
          </a>
          <TimerDisplay initialSeconds={600} onComplete={() => onComplete?.('nsdr')} />
          <button
            onClick={() => onComplete?.('nsdr')}
            className="w-full py-2 bg-purple-500 text-white rounded-lg font-medium"
          >
            Mark Complete
          </button>
        </div>
      </Accordion>

      {/* Supplements */}
      <Accordion title="Supplements" icon={Pill}>
        <div className="space-y-3 pt-3">
          <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800">
            <strong>Morning (with Meal 1 at 10am):</strong>
            <ul className="list-disc list-inside mt-1">
              <li>Creatine 5g</li>
              <li>Fish Oil 2000mg EPA</li>
              <li>Vitamin D3+K2 5000 IU</li>
              <li>Tongkat Ali 400mg</li>
              <li>Rhodiola 200-400mg</li>
              <li>B-Complex</li>
              <li>Lion's Mane 500-1000mg</li>
              <li>Panax Ginseng 140mg</li>
            </ul>
            <br />
            <strong>Pre-Workout:</strong> Alpha-GPC 300mg
            <br /><br />
            <strong>Sleep (9pm):</strong>
            <ul className="list-disc list-inside mt-1">
              <li>Magnesium L-Threonate 145mg</li>
              <li>Apigenin 50mg</li>
              <li>L-Theanine 200-400mg (optional)</li>
            </ul>
          </div>
          <button
            onClick={() => {
              onLog({ type: 'supplements', value: 'morning' });
              alert('Logged morning supplements');
            }}
            className="w-full py-2 bg-green-500 text-white rounded-lg font-medium"
          >
            Log Morning Supplements
          </button>
          <button
            onClick={() => {
              onLog({ type: 'supplements', value: 'sleep' });
              alert('Logged sleep supplements');
            }}
            className="w-full py-2 bg-indigo-500 text-white rounded-lg font-medium"
          >
            Log Sleep Supplements
          </button>
        </div>
      </Accordion>
    </div>
  );
};

const TestsTab = ({ onLog }) => {
  const [asrs6, setAsrs6] = useState(Array(6).fill(null));
  const [asrs18, setAsrs18] = useState(Array(18).fill(null));
  const [showAsrs18, setShowAsrs18] = useState(false);
  const [cogScores, setCogScores] = useState({ spatial: '', feature: '', stroop: '' });

  const asrs6Total = asrs6.reduce((a, b) => a + (b || 0), 0);
  const asrs18Total = asrs18.reduce((a, b) => a + (b || 0), 0);

  return (
    <div className="space-y-4">
      {/* ASRS-6 Weekly */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          ASRS-6 (Weekly)
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Rate 0-4: 0=Never, 1=Rarely, 2=Sometimes, 3=Often, 4=Very Often
        </p>
        <div className="space-y-3">
          {ASRS6_QUESTIONS.map((q, idx) => (
            <div key={idx} className="border-b border-gray-100 pb-3">
              <p className="text-sm text-gray-700 mb-2">{idx + 1}. {q}</p>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((score) => (
                  <button
                    key={score}
                    onClick={() => {
                      const newScores = [...asrs6];
                      newScores[idx] = score;
                      setAsrs6(newScores);
                    }}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      asrs6[idx] === score
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">Total: {asrs6Total}/24</div>
          <button
            onClick={() => {
              onLog({ type: 'asrs6', value: asrs6Total, answers: asrs6 });
              alert(`Saved ASRS-6: ${asrs6Total}/24`);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
          >
            Save ASRS-6
          </button>
        </div>
      </div>

      {/* ASRS-18 Full */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <button
          onClick={() => setShowAsrs18(!showAsrs18)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            ASRS-18 Full (Week 1 & 12 only)
          </h3>
          {showAsrs18 ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {showAsrs18 && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600">
              Rate 0-4: 0=Never, 1=Rarely, 2=Sometimes, 3=Often, 4=Very Often
            </p>
            {ASRS18_QUESTIONS.map((q, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-700 mb-2">{idx + 1}. {q}</p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((score) => (
                    <button
                      key={score}
                      onClick={() => {
                        const newScores = [...asrs18];
                        newScores[idx] = score;
                        setAsrs18(newScores);
                      }}
                      className={`w-8 h-8 rounded text-sm font-medium ${
                        asrs18[idx] === score
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <div>Inattention (Q1-9): {asrs18.slice(0, 9).reduce((a, b) => a + (b || 0), 0)}/36</div>
              <div>Hyperactivity (Q10-18): {asrs18.slice(9).reduce((a, b) => a + (b || 0), 0)}/36</div>
              <div className="text-lg font-bold">Total: {asrs18Total}/72</div>
              <button
                onClick={() => {
                  onLog({ type: 'asrs18', value: asrs18Total, answers: asrs18 });
                  alert(`Saved ASRS-18: ${asrs18Total}/72`);
                }}
                className="w-full py-2 bg-purple-500 text-white rounded-lg font-medium"
              >
                Save ASRS-18
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cognitive Tests */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-600" />
          Cambridge Brain Sciences (Weekly)
        </h3>
        <a
          href="https://www.cambridgebrainsciences.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-600 font-medium mb-4"
        >
          <ExternalLink className="w-4 h-4" />
          Open Cambridge Brain Sciences
        </a>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Spatial Span Score</label>
            <input
              type="number"
              value={cogScores.spatial}
              onChange={(e) => setCogScores({ ...cogScores, spatial: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter score"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Feature Match Score</label>
            <input
              type="number"
              value={cogScores.feature}
              onChange={(e) => setCogScores({ ...cogScores, feature: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter score"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Stroop Score</label>
            <input
              type="number"
              value={cogScores.stroop}
              onChange={(e) => setCogScores({ ...cogScores, stroop: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter score"
            />
          </div>
          <button
            onClick={() => {
              onLog({ type: 'cognitive', value: cogScores });
              alert('Saved cognitive test scores');
            }}
            className="w-full py-2 bg-green-500 text-white rounded-lg font-medium"
          >
            Save Cognitive Scores
          </button>
        </div>
      </div>

      {/* Reaction Time */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Timer className="w-5 h-5 text-orange-600" />
          Reaction Time (Daily)
        </h3>
        <a
          href="https://humanbenchmark.com/tests/reactiontime"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-orange-600 font-medium mb-4"
        >
          <ExternalLink className="w-4 h-4" />
          Open Human Benchmark
        </a>
        <p className="text-sm text-gray-600 mb-3">Do 5 trials, enter your average:</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="e.g., 245"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            id="reactionInput"
          />
          <button
            onClick={() => {
              const input = document.getElementById('reactionInput');
              if (input.value) {
                onLog({ type: 'reaction', value: parseFloat(input.value) });
                alert(`Logged reaction time: ${input.value}ms`);
                input.value = '';
              }
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const TrendsTab = ({ data }) => {
  const MiniChart = ({ dataKey, color, title, unit }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={80}>
        <AreaChart data={data.slice(-7)}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#gradient-${dataKey})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="text-right text-sm text-gray-500">
        Latest: {data[data.length - 1]?.[dataKey]?.toFixed(1)} {unit}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">7-Day Trends</h2>
      <MiniChart dataKey="bolt" color="#1F4E79" title="BOLT Score" unit="sec" />
      <MiniChart dataKey="morningHRV" color="#C62828" title="Morning HRV" unit="ms" />
      <MiniChart dataKey="respiratoryRate" color="#7B1FA2" title="Respiratory Rate" unit="/min" />
      <MiniChart dataKey="reactionTime" color="#E65100" title="Reaction Time" unit="ms" />
      <MiniChart dataKey="deepSleep" color="#00695C" title="Deep Sleep" unit="%" />
      <MiniChart dataKey="hrr" color="#2E7D32" title="Heart Rate Recovery" unit="bpm" />

      {/* Full Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h4 className="text-sm font-medium text-gray-700 mb-3">All Data - BOLT Score</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[10, 45]} />
            <Tooltip />
            <Line type="monotone" dataKey="bolt" stroke="#1F4E79" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============================================
// CALENDAR EXPORT
// ============================================

const generateCalendarFile = () => {
  const startDate = new Date('2026-02-10');
  let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ADHD Protocol//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:ADHD Protocol
X-WR-TIMEZONE:America/Chicago
`;

  // Daily reminders for 12 weeks
  for (let day = 0; day < 84; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const week = Math.ceil((day + 1) / 7);
    const phase = week === 1 ? 'Baseline' : week <= 6 ? 'Protocol' : week <= 10 ? 'Exercise Integration' : 'Analysis';

    // Morning routine - 6:00 AM
    icsContent += `BEGIN:VEVENT
DTSTART:${dateStr}T060000
DTEND:${dateStr}T063000
SUMMARY:🌅 Morning Protocol
DESCRIPTION:BOLT Score → HRV → Sunlight → Breathwork (${phase} Week ${week})
BEGIN:VALARM
TRIGGER:-PT0M
ACTION:DISPLAY
DESCRIPTION:Morning Protocol Time
END:VALARM
END:VEVENT
`;

    // NSDR - 2:00 PM
    icsContent += `BEGIN:VEVENT
DTSTART:${dateStr}T140000
DTEND:${dateStr}T142000
SUMMARY:😴 NSDR
DESCRIPTION:Non-Sleep Deep Rest - 10-20 minutes
BEGIN:VALARM
TRIGGER:-PT0M
ACTION:DISPLAY
DESCRIPTION:NSDR Time
END:VALARM
END:VEVENT
`;

    // Evening routine - 9:00 PM
    icsContent += `BEGIN:VEVENT
DTSTART:${dateStr}T210000
DTEND:${dateStr}T213000
SUMMARY:🌙 Evening Protocol
DESCRIPTION:Sleep supplements → Reaction time test → Mouth tape
BEGIN:VALARM
TRIGGER:-PT0M
ACTION:DISPLAY
DESCRIPTION:Evening Protocol Time
END:VALARM
END:VEVENT
`;

    // Sunday testing
    if (dayOfWeek === 'Sun') {
      const medStatus = week % 2 === 1 ? 'UNMEDICATED' : 'MEDICATED';
      icsContent += `BEGIN:VEVENT
DTSTART:${dateStr}T080000
DTEND:${dateStr}T090000
SUMMARY:🧪 Sunday Testing (${medStatus})
DESCRIPTION:Week ${week} - ${medStatus}\\nCambridge Brain Sciences tests\\nASRS-6 questionnaire\\n${week === 1 || week === 12 ? 'ASRS-18 Full Assessment' : ''}
BEGIN:VALARM
TRIGGER:-PT0M
ACTION:DISPLAY
DESCRIPTION:Sunday Testing
END:VALARM
END:VEVENT
`;
    }

    // Training reminders based on day
    const schedule = WEEKLY_SCHEDULE[dayOfWeek];
    if (schedule && schedule.workout !== 'rest') {
      icsContent += `BEGIN:VEVENT
DTSTART:${dateStr}T170000
DTEND:${dateStr}T183000
SUMMARY:💪 ${schedule.training}
DESCRIPTION:Recovery: ${schedule.recovery}
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Training in 30 minutes
END:VALARM
END:VEVENT
`;
    }
  }

  icsContent += 'END:VCALENDAR';
  return icsContent;
};

const CalendarExport = () => {
  const downloadCalendar = () => {
    const icsContent = generateCalendarFile();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'adhd_protocol_reminders.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCalendar}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
    >
      <Download className="w-5 h-5" />
      Download Calendar (.ics)
    </button>
  );
};

// ============================================
// FOOD LOG
// ============================================

const FoodLog = ({ onLog }) => {
  const [mealType, setMealType] = useState('Meal 1');
  const [description, setDescription] = useState('');

  const save = () => {
    if (description.trim()) {
      onLog({
        type: 'meal',
        mealType,
        value: description,
        timestamp: new Date().toISOString(),
      });
      alert(`Logged ${mealType}: ${description}`);
      setDescription('');
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Utensils className="w-5 h-5 text-green-600" />
        Log Meal
      </h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          {['Meal 1', 'Meal 2', 'Meal 3', 'Snack'].map((type) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              className={`px-3 py-1 rounded-full text-sm ${
                mealType === type ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you eat? (e.g., 6oz ground beef, 3 eggs, kefir, sauerkraut)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={3}
        />
        <button
          onClick={save}
          className="w-full py-2 bg-green-500 text-white rounded-lg font-medium"
        >
          Save Meal
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function ADHDProtocolApp() {
  const [data] = useState(generateDemoData());
  const [completed, setCompleted] = useState({});
  const [activeTab, setActiveTab] = useState('today');
  const [logs, setLogs] = useState([]);
  const [showDayPicker, setShowDayPicker] = useState(false);
  
  // Start date: Sunday, February 8, 2026
  const START_DATE = new Date('2026-02-08');
  
  // Calculate current day based on actual date
  const today = new Date();
  const diffTime = today.getTime() - START_DATE.getTime();
  const calculatedDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // Allow manual override, default to calculated day (clamped to 1-84)
  const [selectedDay, setSelectedDay] = useState(null);
  const currentDay = selectedDay || Math.max(1, Math.min(84, calculatedDay));
  
  const currentWeek = Math.ceil(currentDay / 7);
  const phase = currentWeek === 1 ? 'Baseline' : currentWeek <= 6 ? 'Protocol' : currentWeek <= 10 ? 'Exercise Integration' : 'Analysis';
  
  const handleLog = (entry) => {
    const logEntry = { ...entry, timestamp: new Date().toISOString(), day: currentDay };
    setLogs(prev => [...prev, logEntry]);
    console.log('Logged:', logEntry);
    // In production, this would POST to Google Sheets
  };

  const handleComplete = (id) => {
    setCompleted(prev => ({ ...prev, [id]: true }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const streak = 6; // Would calculate from actual data

  const tabs = [
    { id: 'today', label: 'Today', icon: Sun },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'protocols', label: 'Protocols', icon: Wind },
    { id: 'tests', label: 'Tests', icon: Brain },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
  ];

  // Day picker modal
  const DayPicker = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowDayPicker(false)}>
      <div className="bg-white rounded-xl p-4 max-w-sm w-full max-h-96 overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Select Day</h3>
          <button onClick={() => { setSelectedDay(null); setShowDayPicker(false); }} className="text-blue-600 text-sm">
            Reset to Today
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="font-semibold text-gray-500">{d}</div>
          ))}
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(week => (
          <div key={week}>
            <div className="text-xs text-gray-500 mt-2 mb-1">Week {week}</div>
            <div className="grid grid-cols-7 gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
                const day = (week - 1) * 7 + dayOffset + 1;
                const isSelected = day === currentDay;
                const isToday = day === Math.max(1, Math.min(84, calculatedDay));
                const isFuture = day > calculatedDay;
                return (
                  <button
                    key={day}
                    onClick={() => { setSelectedDay(day); setShowDayPicker(false); }}
                    disabled={isFuture}
                    className={`p-2 rounded text-sm ${
                      isSelected ? 'bg-blue-600 text-white' :
                      isToday ? 'bg-blue-100 text-blue-800' :
                      isFuture ? 'bg-gray-100 text-gray-300' :
                      'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {showDayPicker && <DayPicker />}
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 sticky top-0 z-20">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl font-bold">Defeating ADHD</h1>
              <button 
                onClick={() => setShowDayPicker(true)}
                className="text-blue-200 text-sm hover:text-white flex items-center gap-1"
              >
                Day {currentDay} • Week {currentWeek} • {phase}
                {selectedDay && <span className="text-yellow-300 text-xs">(manual)</span>}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">{streak} day streak</span>
              </div>
              <p className="text-sm text-blue-200">{completedCount} tasks done</p>
            </div>
          </div>
          
          {/* Calendar Export */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-blue-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
            <CalendarExport />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4">
        {activeTab === 'today' && (
          <div className="space-y-4">
            <TodayTab 
              data={data} 
              currentDay={currentDay} 
              completed={completed} 
              setCompleted={setCompleted}
              onLog={handleLog}
            />
            <FoodLog onLog={handleLog} />
          </div>
        )}
        {activeTab === 'workout' && <WorkoutTab onLog={handleLog} />}
        {activeTab === 'protocols' && <ProtocolsTab onLog={handleLog} onComplete={handleComplete} />}
        {activeTab === 'tests' && <TestsTab onLog={handleLog} />}
        {activeTab === 'trends' && <TrendsTab data={data} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="max-w-lg mx-auto flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
