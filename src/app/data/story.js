export default {
  start: {
    id: "start",
    text: "Karanlık bir ormanda, elinde sadece bir meşale ile duruyorsun. Efsanevi Ejderha Tacı’nı bulmak için yola çıktın. Önünde üç yol var: sol tarafta bir kale silüeti, sağda bir köyden gelen dumanlar, ileride ormanın derinlikleri. Ne yaparsın?",
    choices: [
      { text: "Kaleye doğru ilerle", nextScene: "castle" },
      { text: "Köye git", nextScene: "village" },
      { text: "Ormanın derinliklerine dal", nextScene: "forest" },
    ],
  },
  castle: {
    id: "castle",
    text: "Terk edilmiş bir kaleye ulaşıyorsun. Kapı aralık, içeriden rüzgarın uğultusu geliyor. Yerde bir paslı kılıç görüyorsun. Ne yaparsın?",
    choices: [
      {
        text: "Kılıcı al ve içeri gir",
        nextScene: "castle_inside",
        effect: { addItem: "kılıç" },
      },
      { text: "Kılıcı alma, içeri gizlice gir", nextScene: "castle_inside" },
      { text: "Geri dön", nextScene: "start" },
    ],
  },
  castle_inside: {
    id: "castle_inside",
    text: "Kaleye giriyorsun. Karanlık bir salonda, duvarda bir harita ve bir kapı görüyorsun. Ancak kapının önünde bir hayalet şövalye beliriyor! Ne yaparsın?",
    choices: [
      {
        text: "Şövalyeyle savaş",
        nextScene: "fight_knight",
        effect: { health: -30 },
      },
      {
        text: "Haritayı al ve kaç",
        nextScene: "escape_map",
        effect: { addItem: "harita" },
      },
      { text: "Konuşmaya çalış", nextScene: "talk_knight" },
    ],
  },
  fight_knight: {
    id: "fight_knight",
    text: "Şövalyeyle çarpışıyorsun. Kılıcın varsa kazanıyorsun, yoksa ağır yaralanıyorsun! Durumun ne?",
    choices: [
      {
        text: "Devam et (kılıç varsa)",
        nextScene: "treasure_room",
        condition: { hasItem: "kılıç" },
      },
      {
        text: "Devam et (kılıç yoksa)",
        nextScene: "end_lose",
        effect: { health: -50 },
      },
    ],
  },
  talk_knight: {
    id: "talk_knight",
    text: "Şövalye sana hazineyi koruduğunu söylüyor. İksirin varsa seni bırakmayı kabul ediyor. Ne yaparsın?",
    choices: [
      {
        text: "İksiri ver",
        nextScene: "treasure_room",
        condition: { hasItem: "iksir" },
        effect: { removeItem: "iksir" },
      },
      {
        text: "İksiri vermeyi reddet",
        nextScene: "end_lose",
        effect: { health: -40 },
      },
    ],
  },
  escape_map: {
    id: "escape_map",
    text: "Haritayı kaptın ve kalenin arka kapısından kaçtın. Harita, hazineye giden bir patikayı gösteriyor. Ne yaparsın?",
    choices: [
      { text: "Patikayı takip et", nextScene: "treasure_path" },
      { text: "Ormana geri dön", nextScene: "start" },
    ],
  },
  village: {
    id: "village",
    text: "Köye vardığında, köylüler seni şüpheyle süzüyor. Bir tüccar, sana bir sağlık iksiri satmayı teklif ediyor. Ne yaparsın?",
    choices: [
      {
        text: "İksiri al",
        nextScene: "village_iksir",
        effect: { addItem: "iksir" },
      },
      { text: "Köylülere hazineyi sor", nextScene: "village_talk" },
      { text: "Köyden ayrıl", nextScene: "start" },
    ],
  },
  village_iksir: {
    id: "village_iksir",
    text: "İksiri aldın! Bir köylü, hazineye giden bir patikadan bahsediyor ama tehlikeli olduğunu söylüyor. Ne yaparsın?",
    choices: [
      { text: "Patikaya git", nextScene: "treasure_path" },
      { text: "Köylülerle daha fazla konuş", nextScene: "village_talk" },
    ],
  },
  village_talk: {
    id: "village_talk",
    text: "Köylüler, hazineyi koruyan bir büyücünün ormanda yaşadığını söylüyor. Onunla konuşmak için ormana gider misin?",
    choices: [
      { text: "Büyücüye git", nextScene: "wizard" },
      { text: "Köyden ayrıl", nextScene: "start" },
    ],
  },
  wizard: {
    id: "wizard",
    text: "Ormanda bir kulübede büyücüyle karşılaşıyorsun. Sana hazineyi bulman için bir tılsım veriyor, ama karşılığında sadakat yemini istiyor. Ne yaparsın?",
    choices: [
      {
        text: "Yemini et ve tılsımı al",
        nextScene: "treasure_path",
        effect: { addItem: "tılsım" },
      },
      {
        text: "Reddet ve savaş",
        nextScene: "end_lose",
        effect: { health: -60 },
      },
    ],
  },
  forest: {
    id: "forest",
    text: "Ormanın derinliklerinde bir kurt sürüsü beliriyor. Gözleri parlıyor, hırlıyorlar. Ne yaparsın?",
    choices: [
      {
        text: "Kurda saldır",
        nextScene: "fight_wolf",
        effect: { health: -20 },
      },
      { text: "Kaç", nextScene: "escape_forest" },
      {
        text: "Kurdu sakinleştir",
        nextScene: "wolf_friend",
        condition: { hasItem: "iksir" },
        effect: { removeItem: "iksir", addItem: "sadık kurt" },
      },
    ],
  },
  fight_wolf: {
    id: "fight_wolf",
    text: "Kurtlarla savaşıyorsun. Kılıcın varsa kazanıyorsun, yoksa yaralanıyorsun. Durumun ne?",
    choices: [
      {
        text: "Devam et (kılıç varsa)",
        nextScene: "treasure_path",
        condition: { hasItem: "kılıç" },
      },
      {
        text: "Devam et (kılıç yoksa)",
        nextScene: "end_lose",
        effect: { health: -50 },
      },
    ],
  },
  wolf_friend: {
    id: "wolf_friend",
    text: "İksiri kullanarak kurdu sakinleştirdin! Sadık bir kurt artık seninle. Hazineye giden patikayı gösteriyor. Ne yaparsın?",
    choices: [{ text: "Patikayı takip et", nextScene: "treasure_path" }],
  },
  escape_forest: {
    id: "escape_forest",
    text: "Kurtlardan kaçtın ama ormanda kayboldun. Hazineyi bulma şansın azaldı. Ne yaparsın?",
    choices: [
      { text: "Yeniden ormana dal", nextScene: "forest" },
      { text: "Ormandan çık", nextScene: "end_escape" },
    ],
  },
  treasure_path: {
    id: "treasure_path",
    text: "Hazineye giden patikada bir tuzak fark ediyorsun: yerdeki taşlar bir mekanizmayı tetikliyor. Ne yaparsın?",
    choices: [
      {
        text: "Tılsımla tuzağı etkisizleştir",
        nextScene: "end_win",
        condition: { hasItem: "tılsım" },
      },
      {
        text: "Dikkatlice geç",
        nextScene: "end_lose",
        effect: { health: -50 },
      },
      {
        text: "Sadık kurtla geç",
        nextScene: "end_win",
        condition: { hasItem: "sadık kurt" },
      },
    ],
  },
  end_win: {
    id: "end_win",
    text: "Tebrikler! Ejderha Tacı’nı buldun ve krallıkta bir kahraman oldun! Oyunu kazandın!",
    choices: [],
  },
  end_lose: {
    id: "end_lose",
    text: "Maalesef, yanlış bir seçim yaptın ve maceran burada sona erdi. Oyunu kaybettin.",
    choices: [],
  },
  end_escape: {
    id: "end_escape",
    text: "Hazineyi bulamadan ormandan kaçtın. Güvenliktesin, ama bir kahraman olamadın.",
    choices: [],
  },
};
