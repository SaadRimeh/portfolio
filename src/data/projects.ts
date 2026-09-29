export const categories = [
  'All projects',
  'Mobile',
  'Web',
  'Desktop',
  'APIs',
] as const
export type Category = (typeof categories)[number]

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  category: Exclude<Category, 'All projects'>
  tags: string[]
  repository: string
  live?: string
  featured?: boolean
}

// Curated from public project READMEs. Keep deployment links separate from downloads.
export const projects: Project[] = [
  {
    id: 'ruscholar',
    title: 'RuScholar',
    subtitle: 'Language should never limit learning.',
    description:
      'A Telegram bot and Mini App that turn Russian academic messages into translations, terminology, and spaced-repetition flashcards.',
    category: 'Web',
    tags: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Telegram'],
    repository: 'RuScholar-TMA',
    live: 'https://ru-scholar-tma.vercel.app',
    featured: true,
  },
  {
    id: 'nexus',
    title: 'JS Nexus',
    subtitle: 'A workspace for curious developers.',
    description:
      'An offline-first desktop IDE with Monaco Editor, a terminal, Git integration, an event-loop visualizer, and local AI assistance through Ollama.',
    category: 'Desktop',
    tags: ['Electron', 'React', 'TypeScript', 'Monaco', 'Ollama'],
    repository: 'Js-Nexus',
    featured: true,
  },
  {
    id: 'salloum',
    title: 'Salloum Barbershop',
    subtitle: 'A better appointment starts here.',
    description:
      'A bilingual booking experience with appointment management, product reservations, authentication, and Arabic/English layouts.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'TypeScript', 'Clerk', 'REST APIs'],
    repository: 'SaloumApp',
    live: 'https://saloum.onrender.com',
    featured: true,
  },
  {
    id: 'wateera',
    title: 'Wateera',
    subtitle: 'Find a rhythm for your everyday.',
    description:
      'A local-first mobile app that brings daily tasks, study planning, fitness, focus sessions, and personal finances into one place.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'TypeScript', 'Local-first'],
    repository: 'Wateera',
    featured: true,
  },
  {
    id: 'moneypilot',
    title: 'MoneyPilot',
    subtitle: 'Personal finance, on your terms.',
    description:
      'Offline transaction tracking with USD and SYP support, contact management, financial summaries, charts, and Telegram sharing.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage'],
    repository: 'MoneyPilot',
  },
  {
    id: 'structa',
    title: 'Structa',
    subtitle: 'Make room for focused work.',
    description:
      'A daily planner with time blocks, nested tasks, completion insights, streaks, and local storage for an organized day.',
    category: 'Mobile',
    tags: ['React Native', 'TypeScript', 'Zustand', 'Zod'],
    repository: 'Structa',
  },
  {
    id: 'getalphabit',
    title: 'GetAlphaBit',
    subtitle: 'Technical assessment with useful feedback.',
    description:
      'An AI-assisted technical assessment platform with generated questions, grading, candidate dashboards, and an administrator review workflow.',
    category: 'Web',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'Clerk'],
    repository: 'GetAlphaBitFrontEnd',
  },
  {
    id: 'lapgenius',
    title: 'LapGenius',
    subtitle: 'Laptop shopping, made clearer.',
    description:
      'An Arabic e-commerce platform with laptop recommendations, a shopping cart, order tracking, and an administration dashboard.',
    category: 'Web',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    repository: 'LapGenius',
  },
  {
    id: 'wallet',
    title: 'React Native Wallet',
    subtitle: 'An everyday view of your finances.',
    description:
      'A mobile wallet for income, expenses, categorized transactions, and balance summaries, backed by a Node.js API and Neon PostgreSQL.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Clerk'],
    repository: 'React-Native-wallet',
  },
  {
    id: 'codelish',
    title: 'Codelish',
    subtitle: 'Keep the classroom organized.',
    description:
      'An institute management app for courses, groups, students, and attendance, with local persistence for offline use.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage'],
    repository: 'codelish',
  },
  {
    id: 'finance',
    title: 'Personal Finance',
    subtitle: 'Understand where your money goes.',
    description:
      'A budgeting app for recording income and expenses, setting monthly budgets, and exploring spending trends and financial goals.',
    category: 'Web',
    tags: ['TypeScript', 'Budgeting', 'Data visualization'],
    repository: 'personal-finance',
  },
  {
    id: 'tasks',
    title: 'Task Manager',
    subtitle: 'Turn plans into progress.',
    description:
      'A React Native app for creating and organizing tasks, tracking deadlines, and monitoring completion.',
    category: 'Mobile',
    tags: ['React Native', 'JavaScript', 'Productivity'],
    repository: '-Task-Manager',
  },
  {
    id: 'institute',
    title: 'Institute Management API',
    subtitle: 'The systems behind a school.',
    description:
      'A role-based API covering enrollments, attendance, grading, payments, and reporting, with centralized validation.',
    category: 'APIs',
    tags: ['Node.js', 'Express', 'MongoDB', 'Zod', 'JWT'],
    repository: 'institute-management-system',
  },
  {
    id: 'travel',
    title: 'TravelEase',
    subtitle: 'From exploring to booking.',
    description:
      'A travel website with flight, hotel, transport, and trip-package booking flows, account management, and booking history.',
    category: 'Web',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
    repository: 'fullstack-travelwebsite',
  },
  {
    id: 'recipes',
    title: 'Recipe App',
    subtitle: 'Discover something worth cooking.',
    description:
      'A documented full-stack mobile recipe project with category browsing, ingredient search, favorites, and Clerk authentication.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
    repository: 'recipe-app-fullstack',
  },
  {
    id: 'gamza',
    title: 'Gamza',
    subtitle: 'Conversations in real time.',
    description:
      'A full-stack chat project with React, an Express API, MongoDB persistence, and authenticated Socket.IO messaging.',
    category: 'Web',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    repository: 'Chat_App_FullStack',
  },
  {
    id: 'student-api',
    title: 'Student & Course API',
    subtitle: 'The essentials of academic records.',
    description:
      'A REST API for creating, retrieving, updating, and deleting student and course records.',
    category: 'APIs',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    repository: '-Student-Course-Management-API',
  },
  {
    id: 'wallet-api',
    title: 'Wallet API',
    subtitle: 'Transaction data, clearly structured.',
    description:
      'A standalone REST backend for managing wallet transactions with Node.js, Express, and Neon serverless PostgreSQL.',
    category: 'APIs',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
    repository: 'Backend-Wallet',
  },
]

export function filterProjects(query: string, category: Category): Project[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return projects.filter((project) => {
    const searchable = [
      project.title,
      project.description,
      project.repository,
      ...project.tags,
    ]
      .join(' ')
      .toLowerCase()
    return (
      (category === 'All projects' || project.category === category) &&
      terms.every((term) => searchable.includes(term))
    )
  })
}
