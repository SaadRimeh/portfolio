import assert from 'node:assert/strict'
import { test } from 'node:test'
import { categories, filterProjects, projects } from '../src/data/projects.ts'

test('search ignores case and surrounding whitespace and supports multiple words', () => {
  assert.deepEqual(
    filterProjects('  JS NEXUS  ', 'All projects').map((p) => p.id),
    ['nexus'],
  )
  assert.ok(
    filterProjects('react typescript', 'Mobile').some(
      (p) => p.id === 'salloum',
    ),
  )
  assert.ok(
    filterProjects('postgresql', 'All projects').some(
      (p) => p.id === 'wallet-api',
    ),
  )
})

test('search and category filters combine rather than resetting one another', () => {
  assert.deepEqual(filterProjects('ollama', 'Mobile'), [])
  assert.deepEqual(
    filterProjects('ollama', 'Desktop').map((p) => p.id),
    ['nexus'],
  )
  assert.equal(filterProjects('   ', 'All projects').length, projects.length)
  assert.deepEqual(filterProjects('no-such-project-123', 'All projects'), [])
})

test('every filter has projects and each project has a stable unique identity', () => {
  for (const category of categories)
    assert.ok(filterProjects('', category).length > 0)
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length)
  const repositories = projects.flatMap((project) =>
    project.repository ? [project.repository] : [],
  )
  assert.equal(new Set(repositories).size, repositories.length)
  for (const project of projects) {
    assert.ok(categories.includes(project.category))
    assert.ok(project.description && project.tags.length)
    if (project.repository) assert.match(project.repository, /^[\w.-]+$/)
    assert.ok(project.live || project.repository)
  }
})

test('live app links are HTTPS web deployments, not downloads or admin-only routes', () => {
  for (const project of projects.filter((p) => p.live)) {
    const url = new URL(project.live)
    assert.equal(url.protocol, 'https:')
    assert.doesNotMatch(url.pathname, /\.apk|\/admin(?:\/|$)/i)
    assert.notEqual(url.hostname, 'www.mediafire.com')
  }
  assert.equal(
    projects.find((p) => p.id === 'salloum').live,
    'https://saloum.onrender.com',
  )
  assert.equal(projects.find((p) => p.id === 'salloum').repository, 'SaloumApp')
  assert.equal(projects.find((p) => p.id === 'nexus').category, 'Desktop')
  assert.equal(
    projects.find((p) => p.id === 'skillium').live,
    'https://skillium-gamma.vercel.app/',
  )
  assert.equal(projects.find((p) => p.id === 'skillium').repository, undefined)
})
