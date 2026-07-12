import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const dir = resolve(root, 'src/components')
const files = readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'))

function splitTopLevel(s) {
  const out = []
  let depth = 0, cur = '', inStr = null
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (inStr) {
      cur += c
      if (c === inStr && s[i - 1] !== '\\') inStr = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; cur += c; continue }
    if (c === '{' || c === '(' || c === '[') depth++
    if (c === '}' || c === ')' || c === ']') depth--
    if (c === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue }
    cur += c
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

function extractProps(src) {
  const out = { defaults: {}, split: [] }
  const reMerge = /mergeProps\(\{\s*([\s\S]*?)\s*\},\s*props\)/g
  let m
  while ((m = reMerge.exec(src))) {
    for (const seg of splitTopLevel(m[1])) {
      const colon = seg.indexOf(':')
      if (colon <= 0) continue
      const key = seg.slice(0, colon).trim().replace(/^['"]|['"]$/g, '')
      let val = seg.slice(colon + 1).trim()
      if (/^['"]/.test(val)) val = val.slice(1, -1)
      if (val.startsWith('(') || /^function/.test(val)) val = '<fn>'
      out.defaults[key] = val
    }
  }
  const reSplit = /splitProps\(\s*([\s\S]*?),\s*\[([\s\S]*?)\]\s*\)/g
  while ((m = reSplit.exec(src))) {
    for (const seg of splitTopLevel(m[2])) {
      const t = seg.replace(/^['"]|['"]$/g, '')
      if (t && !out.split.includes(t)) out.split.push(t)
    }
  }
  return out
}

function extractOrigin(src) {
  const re = /\.origin\s*=\s*\{\s*([\s\S]*?)\s*\}/m
  const m = src.match(re)
  if (!m) return []
  return splitTopLevel(m[1]).map(s => s.split(':')[0].trim()).filter(Boolean)
}

for (const f of files) {
  const src = readFileSync(resolve(dir, f), 'utf-8')
  const p = extractProps(src)
  const origin = extractOrigin(src)
  console.log(`### ${f}  #defaults=${JSON.stringify(p.defaults)}  #split=${JSON.stringify(p.split)}  #origin=${JSON.stringify(origin)}`)
}
