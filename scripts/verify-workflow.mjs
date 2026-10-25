import fs from 'node:fs';
import assert from 'node:assert/strict';
import YAML from 'yaml';
for (const file of fs.readdirSync('.github/workflows').filter(name=>/\.ya?ml$/.test(name))) {
    const doc=YAML.parseDocument(fs.readFileSync(`.github/workflows/${file}`,'utf8'),{uniqueKeys:true});
    assert.equal(doc.errors.length,0,`${file}: ${doc.errors.map(e=>e.message).join('; ')}`);
}
const windows=YAML.parse(fs.readFileSync('.github/workflows/windows.yml','utf8'));
assert.ok(windows.on.push.branches.includes('**'));
assert.ok(windows.jobs.windows.steps.some(step=>step.run==='node scripts/publish-windows.mjs' && step.if==="github.event_name == 'push'"));
console.log('GitHub Actions YAML and Windows publishing gate verified.');
