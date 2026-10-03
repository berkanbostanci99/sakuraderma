const assert = require('assert');
const S = require('./assets/scores.js');

// PASI max = 72
assert.strictEqual(S.pasi({head:{erythema:4,induration:4,scaling:4,area:100},arms:{erythema:4,induration:4,scaling:4,area:100},trunk:{erythema:4,induration:4,scaling:4,area:100},legs:{erythema:4,induration:4,scaling:4,area:100}}),72);
// SALT max = 100
assert.strictEqual(S.salt({top:100,back:100,left:100,right:100}),100);
// PDAI max activity 250, damage 13
let p=S.pdai({skinActivity:Array(12).fill(10),skinDamage:Array(12).fill(1),scalpActivity:10,scalpDamage:1,mucosaActivity:Array(12).fill(10)});
assert.deepStrictEqual({activity:p.activity,damage:p.damage},{activity:250,damage:13});
// BPDAI max activity 360, damage 12
let b=S.bpdai({blister:Array(12).fill(10),urticaria:Array(12).fill(10),mucosa:Array(12).fill(10),damage:Array(12).fill(1)});
assert.deepStrictEqual({activity:b.activity,damage:b.damage},{activity:360,damage:12});
// EASI max = 72 both age groups
const er={erythema:3,edema:3,excoriation:3,lichenification:3,area:100};
assert.strictEqual(S.easi({head:er,arms:er,trunk:er,legs:er},false),72);
assert.strictEqual(S.easi({head:er,arms:er,trunk:er,legs:er},true),72);
// SCORAD max = 103
assert.strictEqual(S.scorad({extent:100,erythema:3,edema:3,oozing:3,excoriation:3,lichenification:3,dryness:3,pruritus:10,sleep:10}).score,103);
// SCORTEN max = 7 and mortality 90
assert.strictEqual(S.scorten({age:50,malignancy:true,heartRate:130,detachment:20,urea:11,ureaUnit:'mmol',glucose:15,glucoseUnit:'mmol',bicarbonate:10}).score,7);
assert.strictEqual(S.scorten({age:40,malignancy:false,heartRate:120,detachment:10,urea:28,ureaUnit:'bunmgdl',glucose:252,glucoseUnit:'mgdl',bicarbonate:20}).score,0);
assert.strictEqual(S.scorten({age:41,malignancy:false,heartRate:121,detachment:11,urea:61,ureaUnit:'ureamgdl',glucose:253,glucoseUnit:'mgdl',bicarbonate:19}).score,6);
// UAS7 max = 42
assert.strictEqual(S.uas7(Array(7).fill({wheals:3,itch:3})),42);
// IHS4 example
assert.strictEqual(S.ihs4({nodules:2,abscesses:1,tunnels:1}),8);
// NAPSI 10 fingernails max = 80
assert.strictEqual(S.napsi(Array(10).fill({matrix:4,bed:4})),80);
console.log('All Sakura Derma score tests passed.');

// Severity boundary checks
assert.strictEqual(S.pasiSeverity(7).label,'Orta');
assert.strictEqual(S.pasiSeverity(12.1).label,'Şiddetli');
assert.strictEqual(S.pdaiSeverity(25).label,'Şiddetli');
assert.strictEqual(S.bpdaiSeverity(57).label,'Şiddetli');
assert.strictEqual(S.easiSeverity(21).label,'Orta');
assert.strictEqual(S.scoradSeverity(50).label,'Şiddetli');
assert.strictEqual(S.uas7Severity(28).label,'Şiddetli aktivite');
assert.strictEqual(S.ihs4Severity(11).label,'Şiddetli');
console.log('Boundary tests passed.');

// New tools sanity tests
assert.strictEqual(S.vasi([{handUnits:10,depigmentation:50},{handUnits:2,depigmentation:100}]),7);
assert.deepStrictEqual(S.clasi({regions:[{erythema:3,scale:2,dyspigmentation:1,scarring:2}],mucosa:1,acuteHairLoss:1,nonscarringAlopecia:3,scarringAlopecia:2,dyspigmentGte12m:true}),{activity:10,damage:6});
assert.strictEqual(S.absis({bsa:10,weight:1.5,oralExtent:2,drinkDiscomfort:4,foodDiscomfort:5}).total,26);
assert.strictEqual(S.uct([4,4,4,4]),16);
assert.strictEqual(S.poem([4,4,4,4,4,4,4]),28);
assert.strictEqual(S.mmasi({foreheadArea:6,foreheadDarkness:4,rightMalarArea:6,rightMalarDarkness:4,leftMalarArea:6,leftMalarDarkness:4,chinArea:6,chinDarkness:4}),24);
assert.strictEqual(S.gags({forehead:4,rightCheek:4,leftCheek:4,nose:4,chin:4,chestBack:4}),44);
assert.strictEqual(S.rasi({forehead:{area:6,erythema:3,papules:3,telangiectasia:3},rightCheek:{area:6,erythema:3,papules:3,telangiectasia:3},leftCheek:{area:6,erythema:3,papules:3,telangiectasia:3},noseChin:{area:6,erythema:3,papules:3,telangiectasia:3}}),54);
console.log('New tools sanity tests passed.');
