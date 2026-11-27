const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function createContext(unit, saved = {}) {
  const elements = new Map();
  const handlers = {};
  function element(key) {
    if (!elements.has(key)) elements.set(key, {
      innerHTML: '', textContent: '', value: '', style: {}, dataset: {},
      classList: {toggle() {}, add() {}, remove() {}},
      setAttribute() {}, focus() {}, querySelectorAll() { return []; }
    });
    return elements.get(key);
  }
  const context = {
    window: {scrollTo() {}, addEventListener() {}},
    document: {
      body: {dataset: {}, classList: {add() {}, remove() {}}},
      querySelector: element, querySelectorAll() { return []; },
      addEventListener(type, callback) { (handlers[type] ||= []).push(callback); }
    },
    location: {search: '?unit=' + unit, hash: '#home'}, URLSearchParams,
    localStorage: {getItem: key => saved[key] || null, setItem: (key, value) => {saved[key] = value;}},
    setTimeout() {return 1;}, clearTimeout() {}, setInterval() {return 1;}, clearInterval() {}, console
  };
  vm.createContext(context);
  for (const file of ['data.js', 'theory.js', 'courses.js', 'course-04.js', 'app.js']) {
    vm.runInContext(fs.readFileSync('dist/' + file, 'utf8'), context);
  }
  return {context, elements, saved, run: code => vm.runInContext(code, context)};
}

const saved = {'english-studio-v1': JSON.stringify({answers: {}, read: ['start'], known: [0], drafts: {profile: 'My original draft'}, checks: {}})};
for (const unit of [2, 3, 4]) {
  const {run, context, elements} = createContext(unit, saved);
  const data = run('D');
  assert.equal(data.number, unit);
  assert.equal(data.lessons.length, 6);
  assert(data.questions.length >= 60);
  assert.equal(new Set(data.questions.map(q => q.id)).size, data.questions.length);
  for (const q of data.questions) {
    assert(data.lessons.some(l => l.id === q.topic));
    assert(q.why && q.prompt);
    assert(context.window.EnglishStudio.judge(q, q.answer), q.id);
    assert(!context.window.EnglishStudio.judge(q, 'deliberately wrong'), q.id);
    if (q.type === 'choice') {
      assert(q.options.includes(q.answer));
      assert.equal(new Set(q.options).size, q.options.length);
    }
    if (q.type === 'drag' || q.type === 'dialogue') {
      assert.equal(q.blanks.length, (q.template || q.turns.map(t => t.text).join(' ')).split('___').length - 1);
    }
  }
  for (const lesson of data.lessons) {
    assert(data.questions.some(q => q.topic === lesson.id));
    assert(data.theory[lesson.id].sections.length);
  }
  const pages = ['home', ...data.lessons.map(l => 'guide/' + l.id), 'practice', 'practice/mixed', 'practice/errors', 'vocab', 'review', 'plan', 'sources', ...Object.keys(data.resources).map(k => 'sources/' + k), ...Object.keys(data.tasks).map(k => 'writing/' + k)];
  for (const page of pages) {
    context.location.hash = '#' + page;
    run('render()');
    const html = elements.get('#main').innerHTML;
    assert(html.length > 100, page);
    assert(!html.includes('undefined'), page);
    assert(!html.includes('NaN'), page);
  }
  for (const topic of data.lessons.map(l => l.id)) {
    run(`startSession('${topic}'); practice('${topic}')`);
    assert(run('session.qs.length > 0'));
  }
  run(`state.read.push(D.lessons[0].id); state.drafts.test='Unit ${unit} draft'; save()`);
  for (const suffix of ['study-pack', 'textbook-answer-key']) {
    assert(fs.existsSync(`dist/unit-0${unit}-${suffix}.pdf`));
  }
  console.log(`PASS: unit ${unit}: ${data.questions.length} questions, ${data.vocab.length} cards, all routes, tasks and resources.`);
}
assert.equal(JSON.parse(saved['english-studio-v1']).drafts.profile, 'My original draft');
assert.equal(JSON.parse(saved['english-studio-unit-2-v1']).drafts.test, 'Unit 2 draft');
assert.equal(JSON.parse(saved['english-studio-unit-3-v1']).drafts.test, 'Unit 3 draft');
assert.equal(createContext(4, saved).run('state.drafts.test'), 'Unit 4 draft');
assert.equal(createContext(2, saved).run('state.drafts.test'), 'Unit 2 draft');
assert.equal(createContext(1, saved).run('state.drafts.profile'), 'My original draft');
console.log('PASS: original unit 1 progress and drafts preserved; unit 2–4 saves isolated and restored.');
