'usestrict'
/*武将的头像*/
import caocao from 's/images/index/wujiang/caocao/tx.jpg';
import diaochan from 's/images/index/wujiang/diaochan/tx.jpg';
import guangyu from 's/images/index/wujiang/guangyu/tx.jpg';
import huangyueying from 's/images/index/wujiang/huangyueying/tx.jpg';
import liubei from 's/images/index/wujiang/liubei/tx.jpg';
import lusu from 's/images/index/wujiang/lusu/tx.jpg';
import lvbu from 's/images/index/wujiang/lvbu/tx.jpg';
import taishici from 's/images/index/wujiang/taishici/tx.jpg';
import zhangfei from 's/images/index/wujiang/zhangfei/tx.jpg';
import zhaoyun from 's/images/index/wujiang/zhaoyun/tx.jpg';
import zhugeliang from 's/images/index/wujiang/zhugeliang/tx.jpg';

/*武将的装备*/
import caocao_equ from 's/images/index/wujiang/caocao/equ.jpg';
import diaochan_equ from 's/images/index/wujiang/diaochan/equ.jpg';
import guangyu_equ from 's/images/index/wujiang/guangyu/equ.jpg';
import huangyueying_equ from 's/images/index/wujiang/huangyueying/equ.jpg';
import liubei_equ from 's/images/index/wujiang/liubei/equ.jpg';
import lusu_equ from 's/images/index/wujiang/lusu/equ.jpg';
import lvbu_equ from 's/images/index/wujiang/lvbu/equ.jpg';
import taishici_equ from 's/images/index/wujiang/taishici/equ.jpg';
import zhangfei_equ from 's/images/index/wujiang/zhangfei/equ.jpg';
import zhaoyun_equ from 's/images/index/wujiang/zhaoyun/equ.jpg';
import zhugeliang_equ from 's/images/index/wujiang/zhugeliang/equ.jpg';

/*武将的大头贴*/
import caocao_big from 's/images/index/wujiang/caocao/big.png';
import diaochan_big from 's/images/index/wujiang/diaochan/big.png';
import guangyu_big from 's/images/index/wujiang/guangyu/big.png';
import huangyueying_big from 's/images/index/wujiang/huangyueying/big.png';
import liubei_big from 's/images/index/wujiang/liubei/big.png';
import lusu_big from 's/images/index/wujiang/lusu/big.png';
import lvbu_big from 's/images/index/wujiang/lvbu/big.png';
import taishici_big from 's/images/index/wujiang/taishici/big.png';
import zhangfei_big from 's/images/index/wujiang/zhangfei/big.png';
import zhaoyun_big from 's/images/index/wujiang/zhaoyun/big.png';
import zhugeliang_big from 's/images/index/wujiang/zhugeliang/big.png';

/*国家*/
import wei from 's/images/index/wujiang/icon/wei.png';
import shu from 's/images/index/wujiang/icon/shu.png';
import wu from 's/images/index/wujiang/icon/wu.png';
import qun from 's/images/index/wujiang/icon/qun.png';

/*武将类型*/
import fangshou from 's/images/index/wujiang/icon/fangshou.png';
import gongji from 's/images/index/wujiang/icon/gongji.png';
import zhimou from 's/images/index/wujiang/icon/zhimou.png';

/*武将星级*/
import star from 's/images/index/wujiang/icon/star.png';

const wujiang = [{
	name: 'caocao',
	chinese: '曹操',
	url: caocao,
	city: wei,
	equ_name: '',
	equ_cons: '',
	equ: caocao_equ,
	big: caocao_big,
	star: star,
	type: '骑',
	tong: '3.5',
	she: '3',
	attack: 87,
	up: 175,
	chai: 6,
	chai_up: 40,
	defense: 88,
	defense_up: 128,
	speed: 88,
	speed_up: 126,
	iq: 89,
	iq_up: 162,
	cons: '1回合准备，对敌军全体发动1次计策攻击（伤害率135%，受智影响），同时对友军全体发动1次计策攻击（伤害率45%，受智影响）'
}, {
	name: 'diaochan',
	chinese: '貂蝉',
	url: diaochan,
	city: qun,
	equ_name: '',
	equ_cons: '',
	equ: diaochan_equ,
	big: diaochan_big,
	star: star,
	type: '骑',
	tong: '3',
	she: '2',
	attack: 64,
	up: 114,
	chai: 2,
	chai_up: 14,
	defense: 80,
	defense_up: 126,
	speed: 85,
	speed_up: 95,
	iq: 89,
	iq_up: 131,
	cons: '本场战斗中，使我军全体受到所有伤害后，有50%的几率能恢复一定兵力（恢复率36%，受智影响）'
}, {
	name: 'guangyu',
	chinese: '关羽',
	url: guangyu,
	city: shu,
	attack: 101,
	defense: 94,
	iq: 83,
	cons: '战斗前3回合，使我军群体每回合有36%的几率进行2次普通攻击，并有等同的几率使我军群体处于侦查状态，免疫眩晕、多疑、怠战、醉酒和嘲讽效果',
	equ_name: '青龙偃月刀',
	equ_cons: '对敌军单体发动2次物理攻击（伤害率90%），每次攻击的目标独立判定',
	equ: guangyu_equ,
	big: guangyu_big,
	star: star,
	type: '骑',
	tong: '3.5',
	she: '3',
	attack: 101,
	up: 235,
	chai: 3,
	chai_up: 29,
	defense: 94,
	defense_up: 227,
	speed: 105,
	speed_up: 272,
	iq: 83,
	iq_up: 105,
	cons: '战斗前3回合，使我军群体每回合有36%的几率进行2次普通攻击，并有等同的几率使我军群体处于侦查状态，免疫眩晕、多疑、怠战、醉酒和嘲讽效果',
}, {
	name: 'huangyueying',
	chinese: '黄月英',
	url: huangyueying,
	city: shu,
	equ_name: '',
	equ_cons: '',
	equ: huangyueying_equ,
	big: huangyueying_big,
	star: star,
	type: '弓',
	tong: '2.5',
	she: '4',
	attack: 88,
	up: 142,
	chai: 9,
	chai_up: 72,
	defense: 52,
	defense_up: 84,
	speed: 53,
	speed_up: 86,
	iq: 90,
	iq_up: 170,
	cons: '战斗开始后前3回合，诅咒敌军群体，当其试图发动主动或追击武技时，将陷入水淹诅咒，受到计策伤害（伤害率36%，受智影响）'
}, {
	name: 'liubei',
	chinese: '刘备',
	url: liubei,
	city: shu,
	equ_name: '雌雄双股剑',
	equ_cons: '1回合准备，使敌军群体陷入醉酒状态，不分敌我，持续2回合',
	equ: liubei_equ,
	big: liubei_big,
	star: star,
	type: '骑',
	tong: '3.5',
	she: '2',
	attack: 80,
	attack_up: 128,
	chai: 6,
	chai_up: 40,
	defense: 107,
	defense_up: 295,
	speed: 88,
	speed_up: 126,
	iq: 91,
	iq_up: 159,
	cons: '战斗前3回合，使我军全体追击武技造成的伤害 27%，并使敌军群体每回合有18%的几率陷入醉酒状态，不分敌我',
}, {
	name: 'lusu',
	chinese: '鲁肃',
	url: lusu,
	city: wu,
	equ_name: '',
	equ_cons: '',
	equ: lusu_equ,
	big: lusu_big,
	star: star,
	type: '步',
	tong: '2',
	she: '2',
	attack: 33,
	up: 53,
	chai: 16,
	chai_up: 181,
	defense: 70,
	defense_up: 113,
	speed: 29,
	speed_up: 47,
	iq: 94,
	iq_up: 190,
	cons: '战斗中，使我军全体每回合恢复一定兵力（恢复率36%，受智影响）'
}, {
	name: 'lvbu',
	chinese: '吕布',
	url: lvbu,
	city: qun,
	equ_name: '',
	equ_cons: '',
	equ: lvbu_equ,
	big: lvbu_big,
	star: star,
	type: '骑',
	tong: '3.5',
	she: '3',
	attack: 103,
	up: 280,
	chai: 10,
	chai_up: 69,
	defense: 90,
	defense_up: 185,
	speed: 100,
	speed_up: 204,
	iq: 30,
	iq_up: 28,
	cons: '2回合准备，对敌军全体发动1次物理攻击（伤害率225%），造成的伤害无视闪避',
}, {
	name: 'taishici',
	chinese: '太史慈',
	url: taishici,
	city: wu,
	equ_name: '',
	equ_cons: '',
	equ: taishici_equ,
	big: taishici_big,
	star: star,
	type: '骑',
	tong: '2.5',
	she: '3',
	attack: 98,
	up: 189,
	chai: 3,
	chai_up: 24,
	defense: 78,
	defense_up: 114,
	speed: 88,
	speed_up: 142,
	iq: 55,
	iq_up: 57,
	cons: '使自身每回合都能进行2次普通攻击，并使其攻+18'
}, {
	name: 'zhangfei',
	chinese: '张飞',
	url: zhangfei,
	city: shu,
	equ_name: '',
	equ_cons: '',
	equ: zhangfei_equ,
	big: zhangfei_big,
	star: star,
	type: '骑',
	tong: '3',
	she: '1',
	attack: 102,
	up: 263,
	chai: 3,
	chai_up: 27,
	defense: 86,
	defense_up: 177,
	speed: 90,
	speed_up: 131,
	iq: 62,
	iq_up: 62,
	cons: '普通攻击后，对目标发动1次物理攻击（伤害率90%），并有50%的几率再发动1次物理攻击（伤害率90%）'
}, {
	name: 'zhaoyun',
	chinese: '赵云',
	url: zhaoyun,
	city: shu,
	equ_name: '',
	equ_cons: '',
	equ: zhaoyun_equ,
	big: zhaoyun_big,
	star: star,
	type: '骑',
	tong: '3',
	she: '3',
	attack: 97,
	up: 278,
	chai: 4,
	chai_up: 41,
	defense: 91,
	defense_up: 184,
	speed: 92,
	speed_up: 154,
	iq: 45,
	iq_up: 52,
	cons: '以无法发动主动武技为代价，使自身造成的物理伤害+54%'
}, {
	name: 'zhugeliang',
	chinese: '诸葛亮',
	url: zhugeliang,
	city: shu,
	equ_name: '',
	equ_cons: '',
	equ: zhugeliang_equ,
	big: zhugeliang_big,
	star: star,
	type: '骑',
	tong: '3',
	she: '2',
	attack: 47,
	up: 55,
	chai: 5,
	chai_up: 44,
	defense: 89,
	defense_up: 156,
	speed: 85,
	speed_up: 149,
	iq: 101,
	iq_up: 280,
	cons: '战斗前3回合，援护友军全体，为其抵挡普通攻击，并使自身进入闪避状态，受到攻击时有30.0%的几率可以闪避本次伤害'
}];

export const wj_list = wujiang;