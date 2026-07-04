export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
  { id: 'resume', label: 'Resume' },
]

export const PERSONAL_INFO = {
  name: 'Khatravat Goutham Rathod',
  shortName: 'Goutham',
  initials: 'KGR',
  role: 'Associate Software Engineer',
  taglines: [
    'Full Stack Development',
    'Data Engineering',
    'AI / ML Integration',
    'Zoho Development',
    'Business & Collaboration',
  ],
  bio: `Associate Software Engineer at Forsys Software with expertise in full-stack development, data engineering, and AI-powered integrations. I build seamless data pipelines, intelligent chatbots, and robust CRM integrations that drive real business value. Passionate about technology, open to collaborating on exciting ideas and business ventures.`,
  location: 'Hyderabad, India',
  email: 'khatravatgoutham@gmail.com',
  whatsapp: '917702980607',
  github: 'https://github.com/20goutham',
  linkedin: 'https://www.linkedin.com/in/swegouthamrathod24/',
  interests: ['Badminton', 'Swimming', 'Travelling'],
  openToCollaboration: true,
}

export const EDUCATION = [
  {
    id: 1,
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Technology',
    institution: 'Indian Institute of Engineering Science and Technology (NIT), Shibpur',
    duration: 'Dec 2020 – May 2024',
    cgpa: '8.03',
    highlights: [
      'Specialized in Data Structures, Algorithms, and System Design',
      'Core subjects: Operating Systems, DBMS, Computer Networks',
      'Worked on distributed systems and encryption algorithms',
    ],
  },
]

export const EXPERIENCE = [
  {
    id: 1,
    company: 'Forsys Software India Pvt Ltd',
    role: 'Associate Software Engineer',
    duration: 'Nov 2024 – Present',
    location: 'Hyderabad, India',
    type: 'Full-time',
    domains: [
      {
        area: 'Data Engineering',
        points: [
          'Built end-to-end data pipelines for DigiCert client — ingestion, processing, and analytics',
          'Migrated data from Conga CPQ and Salesforce to RCA (Salesforce) using Flodata tool',
          'Optimized data pipeline performance by 20–30% through query and workflow improvements',
        ],
      },
      {
        area: 'AI / NLP',
        points: [
          'Developed AI-powered NLP chatbot integrated with MWA for automated leave management',
          'Reduced manual HR intervention significantly through intelligent conversational flows',
        ],
      },
      {
        area: 'Zoho Development & Integration',
        points: [
          'Integrated Zoho People and Zoho Recruit with MWA for seamless HR data sync',
          'Led migration from Zoho CRM to Keka CRM using Python for data movement and transformation',
          'Reduced CRM operational overhead by 30% through automation and integration',
        ],
      },
      {
        area: 'Keka & HR Integrations',
        points: [
          'Built two-way integration between Keka HR platform and MWA for automated attendance and leave sync',
          'Ensured real-time data consistency across platforms with error handling and logging',
        ],
      },
    ],
    tech: ['Python', 'Flodata', 'Zoho People', 'Zoho Recruit', 'Keka CRM', 'Salesforce', 'NLP', 'REST APIs', 'SQL'],
  },
  {
    id: 2,
    company: 'Tata Consultancy Services (TCS)',
    role: 'Intern',
    duration: '2023',
    location: 'India',
    type: 'Internship',
    domains: [
      {
        area: 'Distributed Systems & Networking',
        points: [
          'Implemented Streamlet Protocol for efficient distributed communication with reduced latency',
          'Modeled complex networked systems using SimPy library in Python — Client-Server and P2P architectures',
          'Researched Blockchain technology for security and data transparency use cases',
        ],
      },
      {
        area: 'Cryptography',
        points: [
          'Implemented Advanced Encryption Standard (AES) from scratch in C++',
          'Built full key expansion, substitution, permutation, and mixing rounds for 128-bit block encryption',
        ],
      },
    ],
    tech: ['C++', 'Python', 'SimPy', 'Blockchain', 'Networking', 'AES', 'Distributed Systems'],
  },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'Flodata Validation Agent',
    description:
      'A data quality and mapping validation platform that prevents failed migrations through pre-flight schema validation and post-extract source data checks.',
    tech: ['Python', 'FastAPI', 'React', 'Groq API', 'Claude', 'Presidio', 'SQLAlchemy'],
    highlights: [
      'Hybrid AI/Python validation engine with Groq and Claude-assisted semantic review',
      'Multi-format parser for CSV, Excel, PDF, DOCX, PPTX, and OCR inputs',
      'PII redaction, structured logging, and deployment-ready API design',
    ],
    github: null,
    live: null,
    color: 'from-emerald-500 to-cyan-500',
    caseStudy: {
      problem: 'Data migration teams needed a reliable way to catch mapping errors, field mismatches, invalid formats, and sensitive data risks before migration jobs failed downstream.',
      solution: 'Built a FastAPI and React platform that validates mapping sheets before migration and verifies extracted source data against mapping constraints. The engine combines deterministic fuzzy matching with Groq Llama 3 and Claude-assisted semantic checks for ambiguous rows.',
      outcome: 'Created a deployment-ready validation workflow that can process bulk mapping and source-data records with lower manual review effort, reduced LLM calls, safer PII handling, and an extensible foundation for future live source connectors.',
    },
  },
  {
    id: 2,
    title: 'Keka HRMS to MWA Integration Platform',
    description:
      'A production employee data synchronization platform connecting Keka HRMS with MWA for high-volume onboarding, profile updates, exits, and manager assignment sync.',
    tech: ['Python', 'Flask', 'PostgreSQL', 'Claude', 'Gunicorn', 'httpx', 'pytest'],
    highlights: [
      'Automated daily Keka to MWA employee sync built to handle bulk employee records',
      'Weekly reverse sync from MWA to Keka for dotted-line managers',
      'PostgreSQL audit layer with run history, watermarks, and replay support',
      'Claude-assisted implementation support for API logic, validation flows, and debugging',
    ],
    github: null,
    live: null,
    color: 'from-blue-500 to-teal-400',
    caseStudy: {
      problem: 'HR and operations teams were maintaining employee records across Keka HRMS and MWA manually, creating duplicated effort, delayed updates, and risk of inconsistent organizational data.',
      solution: 'Designed and built a Flask REST API with scheduled sync jobs, bulk and single-employee triggers, retry handling, and PostgreSQL-backed audit logs. Used Claude during development to accelerate API logic, validation flow design, and debugging. Deployed the platform on Linux with Gunicorn, systemd services, and cron scheduling.',
      outcome: 'Eliminated repetitive cross-system HR data entry and gave the team observable, replayable synchronization that can handle a strong volume of employee records between internal HRMS data and the client resource management system.',
    },
  },
  {
    id: 3,
    title: 'Leave Management System',
    description:
      'A full-featured leave management platform with multi-level approval workflows, conflict resolution, and automated reporting. Smart leave allocation with centralized record management.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'REST API'],
    highlights: [
      'Multi-level approval workflows with conflict resolution',
      'Smart leave allocation and time-off balancing',
      'Automated reporting with centralized records',
    ],
    github: null,
    live: null,
    color: 'from-purple-500 to-cyan-500',
    caseStudy: {
      problem: 'Teams needed a centralized way to manage employee leave without email chains, manual approvals, and no visibility into leave conflicts or balances.',
      solution: 'Built a full-stack platform with React.js frontend and Node.js/MongoDB backend. Implemented role-based access, multi-level approval workflows, and automated conflict detection logic.',
      outcome: 'Eliminated manual processes, reduced approval time, and gave HR full visibility into team availability through automated reports and a centralized dashboard.',
    },
  },
  {
    id: 4,
    title: 'URL Shortener',
    description:
      'A clean and functional URL shortener built with Django, featuring analytics for tracking URL usage and a fully responsive interface across all devices.',
    tech: ['Django', 'Python', 'SQLite', 'Bootstrap'],
    highlights: [
      'Clean and user-friendly interface',
      'Analytics features for URL usage tracking',
      'Fully responsive multi-device design',
    ],
    github: null,
    live: null,
    color: 'from-cyan-500 to-blue-500',
    caseStudy: {
      problem: 'Long, unreadable URLs were hard to share and provided no way to measure engagement or click performance.',
      solution: 'Built a Django application with custom slug generation, SQLite-backed click tracking, and an analytics dashboard showing usage patterns per link.',
      outcome: 'Clean shareable links with real-time analytics. Fully responsive across mobile and desktop with instant redirect performance.',
    },
  },
]

export const SKILLS = [
  { name: 'OOP', percent: 95, category: 'Core' },
  { name: 'MySQL', percent: 93, category: 'Database' },
  { name: 'C / C++', percent: 92, category: 'Core' },
  { name: 'React.js', percent: 90, category: 'Frontend' },
  { name: 'Data Engineering', percent: 88, category: 'Data' },
  { name: 'Python', percent: 87, category: 'Backend' },
  { name: 'Node.js', percent: 80, category: 'Backend' },
  { name: 'Django', percent: 78, category: 'Backend' },
  { name: 'REST APIs', percent: 85, category: 'Backend' },
  { name: 'MongoDB', percent: 72, category: 'Database' },
  { name: 'Git', percent: 82, category: 'Tools' },
  { name: 'HTML / CSS', percent: 80, category: 'Frontend' },
]

export const TOOLS = [
  'Flodata', 'Zoho People', 'Zoho Recruit', 'Keka CRM',
  'Salesforce', 'VS Code', 'Git', 'Postman',
  'Chrome DevTools', 'npm', 'Windows', 'Ubuntu',
]

export const RESUME_FILE = '/resumes/resume.html'
