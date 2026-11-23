export const portfolioData = {
  personal: {
    name: "S. GOKUL",
    titles: [
      "Information Technology Student",
      "Aspiring Software Developer",
      "AI & Full-Stack Development Enthusiast",
      "Creative Problem Solver"
    ],
    headline: "BUILDING IDEAS INTO DIGITAL REALITY.",
    subtitle: "Information Technology Student | Developer | AI Enthusiast",
    supportingText: "Exploring technology, engineering intelligent solutions, and building digital experiences that solve real-world problems.",
    aboutStory: "I'm Gokul, an Information Technology student passionate about software development, artificial intelligence, and building meaningful digital products. My journey revolves around learning by building. From developing mobile and web applications to exploring AI-powered solutions and participating in hackathons, I continuously challenge myself to understand emerging technologies and apply them to real-world problems. I believe technology is most powerful when it combines creativity, innovation, and practical problem-solving.",
    statusBadge: "Available for Internships & Hackathons",
    location: "Coimbatore, Tamil Nadu, India",
    institution: "Dr. N.G.P. Institute of Technology, Coimbatore",
    degree: "B.Tech Information Technology",
    academicStatus: "Second Year — Third Semester",
    cgpa: "8.38",
    graduationYear: "2029"
  },

  socials: {
    github: {
      username: "thisgokul-007",
      url: "https://github.com/thisgokul-007",
      label: "View GitHub Profile"
    },
    linkedin: {
      profile: "S. Gokul",
      url: "https://www.linkedin.com/in/s-gokul-961855381/",
      label: "Connect on LinkedIn"
    },
    email: "this.gokul.s@gmail.com"
  },

  stats: [
    { label: "CGPA (Current)", value: 8.38, suffix: "", isDecimal: true, desc: "Academic excellence at Dr. N.G.P. IT" },
    { label: "Hackathons", value: 5, suffix: "", desc: "Collaborative building & problem solving" },
    { label: "NPTEL Courses", value: 2, suffix: "", desc: "Nationally recognized certifications" },
    { label: "Graduation", value: 2029, suffix: "", isYear: true, desc: "B.Tech Information Technology" }
  ],

  activities: {
    headline: "HACKATHONS, ACTIVITIES & PARTICIPATION",
    subtitle: "Learning by doing — a commitment to practical experience, collaborative development, and continuous skill growth.",
    items: [
      {
        id: "hackathon",
        count: 5,
        suffix: "",
        label: "Hackathons",
        category: "Competitive Development",
        icon: "Code2",
        color: "#56C8FF",
        desc: "Participated in five hackathons, exploring practical problem-solving, innovation, and collaborative software development."
      },
      {
        id: "workshops",
        count: 1,
        suffix: "",
        label: "Workshop",
        category: "Skill Acquisition",
        icon: "Cpu",
        color: "#9370DB",
        desc: "Attended one technical workshop to expand practical knowledge and development skills."
      },
      {
        id: "webinars",
        count: 1,
        suffix: "",
        label: "Webinar",
        category: "Industry Trends",
        icon: "Lightbulb",
        color: "#FFB86C",
        desc: "Participated in one webinar to explore technology and emerging industry trends."
      },
      {
        id: "nptel",
        count: 2,
        suffix: "",
        label: "NPTEL Courses",
        category: "National Certification",
        icon: "Award",
        color: "#50FA7B",
        desc: "Successfully completed two NPTEL courses with recognized certifications."
      }
    ]
  },

  skills: {
    categories: [
      {
        id: "programming",
        name: "PROGRAMMING",
        color: "#56C8FF",
        skills: [
          { name: "C", level: "Structured Logic", desc: "Procedural programming, memory addressing, pointers, and algorithm basics." },
          { name: "Python", level: "Scripting & AI", desc: "Data processing, Flask web backends, automation scripts, and ML prototyping." },
          { name: "JavaScript", level: "Interactive Web", desc: "ES6+, async/await, DOM manipulation, functional programming, and web APIs." },
          { name: "Java (Basics)", level: "OOP Fundamentals", desc: "Object-oriented principles, classes, inheritance, and core JVM concepts." }
        ]
      },
      {
        id: "web",
        name: "WEB & MOBILE DEVELOPMENT",
        color: "#9370DB",
        skills: [
          { name: "HTML5", level: "Semantic Markup", desc: "Accessible page structures, modern semantic elements, and SEO foundations." },
          { name: "CSS3", level: "Modern Styling", desc: "Flexbox, CSS Grid, keyframe animations, glassmorphism, and responsive layouts." },
          { name: "React", level: "Component Architectures", desc: "Hooks, state management, reactive component trees, and performance optimization." },
          { name: "React Native", level: "Cross-Platform Mobile", desc: "Native components, mobile UI patterns, and cross-platform mobile apps." },
          { name: "Vite", level: "Next-Gen Tooling", desc: "Lightning-fast HMR, ES module bundling, and optimized production builds." },
          { name: "Tailwind CSS", level: "Utility-First Styling", desc: "Rapid component design, customized design systems, and fluid responsive styling." }
        ]
      },
      {
        id: "database",
        name: "DATABASE",
        color: "#50FA7B",
        skills: [
          { name: "MySQL", level: "Relational Modeling", desc: "Schema design, relational indexing, SQL queries, joins, and ACID transactions." }
        ]
      },
      {
        id: "ai",
        name: "AI & EMERGING TECHNOLOGIES",
        color: "#FF79C6",
        skills: [
          { name: "AI Integration", level: "Intelligent Systems", desc: "Connecting modern LLM endpoints and cognitive intelligence into web & mobile interfaces." },
          { name: "Prompt Engineering", level: "Context Orchestration", desc: "Few-shot prompting, structured system prompts, JSON output formatting, and chaining." },
          { name: "Large Language Models", level: "Generative Reasoning", desc: "Leveraging OpenAI and Gemini API models for reasoning, parsing, and automated insights." },
          { name: "Machine Learning fundamentals", level: "Predictive Analytics", desc: "Supervised learning models, classification, regression concepts, and evaluation metrics." },
          { name: "Data Analytics", level: "Exploratory Insight", desc: "Descriptive statistics, pattern recognition, metrics synthesis, and visual charts." }
        ]
      },
      {
        id: "tools",
        name: "DEVELOPMENT TOOLS & PLATFORMS",
        color: "#FFB86C",
        skills: [
          { name: "GitHub", level: "Version Control", desc: "Git workflow, feature branching, merge requests, issues, and code collaboration." },
          { name: "Firebase", level: "Cloud Backend", desc: "Firestore, real-time databases, authentication, and cloud deployment primitives." },
          { name: "Vercel", level: "Edge Hosting", desc: "Serverless web deployment, preview branches, and global edge network delivery." },
          { name: "Antigravity", level: "Agentic Development", desc: "Next-generation agentic AI workspace workflows and developer tooling." },
          { name: "Base44", level: "Prototyping Platform", desc: "Rapid scaffolding and full-stack app iteration tools." },
          { name: "Expo", level: "Mobile Ecosystem", desc: "Managed React Native workflow, EAS builds, OTA updates, and native device testing." }
        ]
      }
    ]
  },

  projects: [
    {
      id: "littleaura",
      number: "01",
      title: "LITTLEAURA",
      category: "AI-Based Smart Parenting Platform",
      tagline: "Growing Together, Every Day.",
      status: "Prototype",
      statusColor: "#56C8FF",
      themeColor: "#56C8FF",
      secondaryColor: "#9370DB",
      accentGlow: "rgba(86, 200, 255, 0.2)",
      description: "An AI-powered smart parenting solution designed for children aged 0–3 years, helping parents track growth milestones, schedules, and daily wellness.",
      problem: "New parents face overwhelming fragmentation when managing newborn health records, vaccination schedules, infant feeding routines, and early childhood developmental milestones without medically grounded or timely guidance.",
      solution: "A unified, AI-assisted parenting ecosystem that aggregates child health tracking, generates predictive milestone reminders, organizes records securely, and provides contextual AI guidance for every developmental stage.",
      features: [
        "Child growth & developmental milestone tracking",
        "Vaccination schedule & medicine reminders",
        "Feeding, sleep rhythm & diaper logging",
        "Monthly baby essentials & milestone alerts",
        "Personalized AI parenting guidance assistant",
        "Secure child health records & medical history",
        "Pediatric medical report organization",
        "AI-powered wellness recommendations",
        "Daily intuitive care management dashboard"
      ],
      technologies: ["React Native", "JavaScript", "Firebase", "MySQL exploration", "Gemini API", "OpenAI exploration", "TensorFlow & Scikit-learn exploration"],
      architecture: "Mobile App (React Native/Expo) → Firebase / Cloud Auth → Node/Express Backend → Gemini/OpenAI API + Scikit-learn → Interactive Health Timeline",
      visualType: "parenting-ai"
    },
    {
      id: "purchasewise",
      number: "02",
      title: "PURCHASEWISE AI",
      category: "AI-Powered Shopping Decision Platform",
      tagline: "Make smarter purchasing decisions.",
      status: "In Development",
      statusColor: "#50FA7B",
      themeColor: "#50FA7B",
      secondaryColor: "#56C8FF",
      accentGlow: "rgba(80, 250, 123, 0.2)",
      description: "An AI-powered purchase decision assistant designed to objectively evaluate consumer products before buying, cutting through marketing fluff and fake reviews.",
      problem: "Consumers spend hours sifting through biased reviews, deceptive product descriptions, and volatile pricing across e-commerce marketplaces without clear, objective verdict indicators.",
      solution: "PurchaseWise AI parses product specs, user sentiments, warranty terms, and long-term value to compute instant BUY, CONSIDER, or AVOID verdicts with concise pros/cons breakdowns.",
      features: [
        "Instant multi-criteria product evaluation",
        "AI-powered purchase recommendations",
        "Deterministic BUY / CONSIDER / AVOID verdicts",
        "Side-by-side feature & value comparison",
        "Decision-support analytics dashboard",
        "Deceptive review & red-flag detection",
        "Price-to-utility ratio scoring"
      ],
      technologies: ["Vite", "React 19", "Tailwind CSS 4", "JavaScript", "OpenAI integration", "Lucide React"],
      architecture: "React 19 Client → Vite Serverless Proxy → OpenAI Reasoning Engine → Sentiment & Feature Matrix → Decision Engine",
      visualType: "shopping-ai"
    },
    {
      id: "skill-mapping",
      number: "03",
      title: "INTELLIGENT SKILL MAPPING & ACADEMIA–INDUSTRY COLLABORATION PLATFORM",
      category: "AI / EdTech / Industry Collaboration",
      tagline: "Bridging the academia-industry divide through intelligence.",
      status: "Concept / Prototype",
      statusColor: "#FFB86C",
      themeColor: "#FFB86C",
      secondaryColor: "#FF79C6",
      accentGlow: "rgba(255, 184, 108, 0.2)",
      description: "A platform concept that connects students, industries, academicians, and institutions to dynamically identify and bridge curriculum skill gaps.",
      problem: "Traditional academic syllabi lag behind fast-evolving industry requirements, resulting in graduate unemployability and recruiter fatigue during technical hiring.",
      solution: "A multilateral ecosystem that evaluates student profiles against live industry job descriptions, identifies granular skill gaps, recommends targeted coursework, and facilitates verified internships.",
      features: [
        "Comprehensive student skill assessment",
        "Algorithmic skill-gap analysis against market roles",
        "Personalized learning roadmaps & course recommendations",
        "Industry hiring opportunity matching",
        "Dynamic student portfolios with project proofs",
        "Internship and placement pipelines",
        "Direct industry-academia collaborative forums",
        "Institutional analytics dashboards for faculties",
        "Granular Role-Based Access Control (RBAC)"
      ],
      technologies: ["React", "JavaScript", "Node.js", "Python", "Cloud Technologies", "Role-Based Access Control"],
      architecture: "Multi-Role Web Portal (Student/Faculty/Recruiter) → Node API & Python Matching Engine → Cloud DB → Analytical Intelligence Views",
      visualType: "edtech-ai"
    },
    {
      id: "aicte-workflow",
      number: "04",
      title: "INTELLIGENT AICTE APPROVAL WORKFLOW AUTOMATION",
      category: "AI / Workflow Automation / GovTech",
      tagline: "Transparent, automated regulatory compliance for institutions.",
      status: "Concept / In Development",
      statusColor: "#BD93F9",
      themeColor: "#BD93F9",
      secondaryColor: "#56C8FF",
      accentGlow: "rgba(189, 147, 249, 0.2)",
      description: "An intelligent workflow automation platform concept designed to modernize AICTE approval processes, compliance monitoring, and institutional communication.",
      problem: "Annual statutory approval processes for higher education institutions involve cumbersome multi-tier inspections, manual document verification, and lack of transparent escalation tracking.",
      solution: "A unified GovTech workflow portal featuring automated document validation, automated committee routing, scrutiny tracking, and real-time status transparency.",
      features: [
        "Centralized regulatory approval dashboard",
        "Automated application routing & milestone gates",
        "Scrutiny and re-scrutiny timeline tracking",
        "Expert Visiting Committee (EVC) scheduling",
        "Standing Appellate Committee (SAC/SHC) stage monitoring",
        "Digital compliance submissions & checklists",
        "Document validity expiration alerts",
        "Automated notifications, reminders & escalations",
        "Immutable audit trail of inspection reports",
        "Real-time institutional approval status tracking"
      ],
      technologies: ["React", "JavaScript", "Node.js", "Workflow State Machines", "Document Parser", "GovTech Security Standards"],
      architecture: "Institutional Portal → Document Processing Pipeline → State Machine Routing → Committee Verification Portal → Audit Log Engine",
      visualType: "govtech-ai"
    },
    {
      id: "ewaste-recycling",
      number: "05",
      title: "E-WASTE RECYCLING MARKETPLACE",
      category: "AI / Sustainability / Computer Vision",
      tagline: "Turning electronic obsolescence into circular economy value.",
      status: "Concept",
      statusColor: "#50FA7B",
      themeColor: "#50FA7B",
      secondaryColor: "#8BE9FD",
      accentGlow: "rgba(80, 250, 123, 0.2)",
      description: "A software solution concept for improving electronic waste recycling through intelligent device identification and direct recycler connections.",
      problem: "Millions of metric tons of toxic electronic waste end up in landfills because consumers and enterprises lack accessible recycling channels and don't know the salvage value of their obsolete devices.",
      solution: "A camera-assisted recycling portal where users capture a photo of obsolete hardware, AI identifies the device and estimated hazardous components, and connects them with certified local e-waste recyclers.",
      features: [
        "Camera-based device scanning & image capture",
        "AI-assisted electronic device classification",
        "Mobile phone, laptop, and peripheral identification",
        "Certified recycler directory & pickup marketplace",
        "Component breakdown & precious metal estimations",
        "Carbon offset & green footprint calculation",
        "Sustainable circular recycling ecosystem"
      ],
      technologies: ["React", "Computer Vision Concepts", "Python AI Backend", "Tailwind CSS", "Marketplace Geolocation"],
      architecture: "Camera Client → CV Inference Engine → Device Knowledgebase → Geolocation Recycler Dispatcher → Disposal Receipt",
      visualType: "sustainability-ai"
    },
    {
      id: "adaptive-manufacturing",
      number: "06",
      title: "ADAPTIVE MANUFACTURING MONITORING SYSTEM",
      category: "AI / Industrial Automation / Smart Manufacturing",
      tagline: "Predictive IoT telemetry for zero-downtime industrial operations.",
      status: "Exploration / Prototype",
      statusColor: "#FF5555",
      themeColor: "#FF79C6",
      secondaryColor: "#FF5555",
      accentGlow: "rgba(255, 85, 85, 0.2)",
      description: "An intelligent manufacturing system concept that monitors industrial machine conditions and generates adaptive recommendations based on real-time sensor data.",
      problem: "Unanticipated mechanical failures in production lines cause catastrophic downtime and financial losses when legacy machinery lacks proactive telemetry.",
      solution: "An end-to-end edge-to-cloud telemetry system connecting microcontroller sensors to an AI anomaly detector, categorizing machine health and issuing adaptive mitigation parameters before breakdowns occur.",
      features: [
        "Real-time temperature telemetry & thermal thresholds",
        "High-frequency vibration & harmonic anomaly monitoring",
        "Machine RPM / spindle speed tracking",
        "Automated operational state tracking (Normal / Warning / Critical)",
        "AI-driven predictive maintenance recommendations",
        "Adaptive speed/cooling throttling advice",
        "Executive production monitoring & uptime dashboard"
      ],
      technologies: ["ESP32 Microcontroller", "Python", "Flask", "Sensor Integration", "AI-based Analysis", "IoT WebSockets"],
      architecture: "Machine Sensors → ESP32 Edge Gateway → Flask Telemetry Ingestion → AI Anomaly Classifier → Adaptive Control Loop → Production Dashboard",
      visualType: "iot-manufacturing"
    }
  ],

  certifications: [
    {
      id: "nptel-soft-skills",
      title: "Soft Skill Development",
      issuer: "NPTEL",
      fullIssuer: "National Programme on Technology Enhanced Learning",
      category: "Professional Communication & Leadership",
      duration: "8-Week Intensive Course",
      score: "80%",
      honors: "Elite + Silver",
      honorsShort: "ELITE + SILVER",
      theme: "silver",
      highlights: [
        "80% Consolidated Score — Elite + Silver Category Award",
        "Interpersonal communication, active listening, and negotiation",
        "Workplace ethics, emotional intelligence, and stress agility",
        "Team leadership, conflict resolution, and executive presentations"
      ]
    },
    {
      id: "nptel-python-joy",
      title: "The Joy of Computing Using Python",
      issuer: "NPTEL",
      fullIssuer: "National Programme on Technology Enhanced Learning",
      category: "Programming & Computational Thinking",
      duration: "NPTEL Certified Course",
      score: null,
      honors: "Elite + Gold",
      honorsShort: "ELITE + GOLD",
      theme: "gold",
      highlights: [
        "Elite + Gold recognition — highest NPTEL achievement tier",
        "Python programming fundamentals and applied problem solving",
        "Algorithmic thinking, data structures, and computational logic",
        "Hands-on programming projects and graded assessments"
      ]
    }
  ],

  beyondTheCode: [
    { title: "Problem-Solving", icon: "Brain", color: "#56C8FF", desc: "Deconstructing complex engineering problems into modular, systematic, and solvable technical milestones." },
    { title: "Creative Thinking", icon: "Sparkles", color: "#9370DB", desc: "Connecting disparate ideas across AI, hardware, and design to devise unconventional yet practical solutions." },
    { title: "Communication", icon: "MessageSquare", color: "#50FA7B", desc: "Articulating technical architecture with clarity to peers, cross-functional teams, and hackathon juries." },
    { title: "Team Collaboration", icon: "Users2", color: "#FFB86C", desc: "Thriving in high-pressure hackathon teams with active listening, mutual support, and cohesive sprint delivery." },
    { title: "Adaptability", icon: "Shuffle", color: "#FF79C6", desc: "Rapidly absorbing unfamiliar libraries, emerging AI APIs, and changing design requirements without friction." },
    { title: "Continuous Learning", icon: "GraduationCap", color: "#8BE9FD", desc: "Proactively diving into workshops, NPTEL courses, and the bleeding edge of software paradigms." },
    { title: "Presentation & Idea Development", icon: "Presentation", color: "#F1FA8C", desc: "Transforming raw concepts into persuasive pitches, structured slides, and compelling demos." },
    { title: "Time Management", icon: "Clock", color: "#56C8FF", desc: "Balancing demanding B.Tech coursework (8.38 CGPA) with hackathons and hands-on coding prototypes." },
    { title: "Leadership Potential", icon: "Compass", color: "#BD93F9", desc: "Guiding project direction, rallying team members around a unified vision, and keeping sprint goals on track." }
  ],

  areasOfInterest: [
    { name: "Artificial Intelligence", tag: "Core Passion", icon: "BrainCircuit", desc: "Exploring cognitive agents, neural modeling, and autonomous capabilities." },
    { name: "Prompt Engineering", tag: "Specialization", icon: "TerminalSquare", desc: "Crafting structured few-shot prompts, meta-prompts, and cognitive chaining." },
    { name: "Data Analytics", tag: "Domain", icon: "BarChart3", desc: "Transforming telemetry and behavioral data into actionable visual intelligence." },
    { name: "Software Development", tag: "Discipline", icon: "Code", desc: "Engineering resilient, maintainable, and scalable software solutions." },
    { name: "Mobile App Development", tag: "Cross-Platform", icon: "Smartphone", desc: "Building intuitive native-feel mobile interfaces using React Native & Expo." },
    { name: "Full-Stack Development", tag: "Architecture", icon: "Layers", desc: "Connecting modern reactive user interfaces with robust backend APIs and schemas." },
    { name: "Emerging Technologies", tag: "Exploration", icon: "Zap", desc: "Staying at the frontier of Web3, Edge Computing, and Agentic Systems." },
    { name: "Hackathons & Innovation", tag: "Mindset", icon: "Flame", desc: "Thriving under time constraints to turn ambitious concepts into working software." }
  ],

  education: {
    period: "2024/2025 – 2029",
    degree: "B.Tech Information Technology",
    institution: "Dr. N.G.P. Institute of Technology, Coimbatore",
    status: "Second Year — Third Semester",
    cgpa: "8.38",
    graduation: "2029",
    highlights: [
      "Department of Information Technology",
      "Consistently maintaining a high academic standing with 8.38 CGPA",
      "Active participant in department hackathons, student coding clubs, and technical committees",
      "Bridging curriculum concepts in Data Structures, OOP, and DBMS with real-world application prototyping"
    ]
  }
};
