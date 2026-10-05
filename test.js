// Node 断言聚合：读取 index.html，抽取内嵌 JSON 数据并校验仪表盘结构。
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const m = html.match(/<script id="dashboard-data" type="application\/json">([\s\S]*?)<\/script>/);
if (!m) {
  console.error('FAIL: 未找到内嵌 dashboard-data JSON');
  process.exit(1);
}
const data = JSON.parse(m[1]);

let failed = 0;
function assert(cond, msg) {
  if (cond) { console.log('PASS: ' + msg); }
  else { console.error('FAIL: ' + msg); failed++; }
}

assert(data.metrics.length === 4, '指标卡数量 = 4，实际 ' + data.metrics.length);
assert(data.channels.length === 4, '渠道数量 = 4，实际 ' + data.channels.length);
assert(data.metrics[0].label === '日活 DAU', '第一个指标标签正确');
assert(data.metrics.every(x => typeof x.up === 'boolean'), '每个指标都有涨跌方向 up 布尔');
const maxVal = Math.max.apply(null, data.channels.map(c => c.value));
assert(maxVal === 5200, '渠道最大值计算正确（5200），实际 ' + maxVal);
assert(html.includes('bar-fill'), '渲染柱状图的 bar-fill 样式存在');
assert(html.includes('card'), '指标卡渲染容器存在');
assert(!html.match(/src="http/), '完全离线，无外部 http 资源');

if (failed) { console.error('\n' + failed + ' 项失败'); process.exit(1); }
console.log('\n全部断言通过');
