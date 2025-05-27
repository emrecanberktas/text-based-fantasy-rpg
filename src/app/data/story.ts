import { Scene } from "../types/game";

const StoryData: Record<string, Scene> = {
  start: {
    id: "start",
    text: "Karanlık bir ormanda, elinde titreyen bir meşale ile duruyorsun. Soğuk rüzgar yaprakları hışırdatırken, efsanevi Ejderha Tacı’nı bulma umuduyla dolusun. Dedikodulara göre bu taç, sahibine krallığı yönetme gücü veriyor. Önünde üç yol var: sol tarafta eski bir kalenin silüeti, sağda bir köyden yükselen dumanlar, ileride ise ormanın ürkütücü derinlikleri. Hangi yolu seçersin?",
    choices: [
      {
        text: "Kaleye doğru ilerle",
        nextScene: "castle",
        animationType: "move",
      },
      { text: "Köye git", nextScene: "village", animationType: "move" },
      {
        text: "Ormanın derinliklerine dal",
        nextScene: "forest",
        animationType: "move",
      },
    ],
  },
  castle: {
    id: "castle",
    text: "Terk edilmiş kaleye ulaşıyorsun. Yosun tutmuş taş duvarlar, geçmişin ihtişamını fısıldıyor. Ağır demir kapı hafif aralık, içeriden rüzgarın uğultusu ve garip bir fısıltı geliyor. Yerde paslı bir kılıç ve bir kalkan görüyorsun. Ne yaparsın?",
    choices: [
      {
        text: "Kılıcı ve kalkanı al, içeri gir",
        nextScene: "castle_inside",
        effect: { type: "addItem", value: ["kılıç", "kalkan"] },
        animationType: "move",
      },
      {
        text: "Sadece kılıcı al ve içeri gir",
        nextScene: "castle_inside",
        effect: { type: "addItem", value: "kılıç" },
        animationType: "move",
      },
      {
        text: "Hiçbirini alma, gizlice içeri süzül",
        nextScene: "castle_inside",
        animationType: "move",
      },
      { text: "Geri dön", nextScene: "start", animationType: "move" },
    ],
  },
  castle_inside: {
    id: "castle_inside",
    text: "Kaleye giriyorsun. Geniş bir salonun ortasında, tozlu taş zeminde yankılanan adımların dışında sadece sessizlik var. Duvarda eski bir harita ve tozlu bir tablo asılı. Karşında ağır bir kapı var, ama aniden bir hayalet şövalye beliriyor! Zırhı tıngırdıyor, kılıcı parlıyor. Ne yaparsın?",
    choices: [
      {
        text: "Şövalyeyle savaş",
        nextScene: "fight_knight",
        effect: { type: "health", value: -20 },
        animationType: "fight",
      },
      {
        text: "Haritayı al ve kaç",
        nextScene: "escape_map",
        effect: { type: "addItem", value: "harita" },
        animationType: "move",
      },
      {
        text: "Tabloyu incele",
        nextScene: "examine_painting",
        animationType: "talk",
      },
      {
        text: "Şövalyeyle konuşmaya çalış",
        nextScene: "talk_knight",
        animationType: "talk",
      },
    ],
  },
  examine_painting: {
    id: "examine_painting",
    text: "Tabloyu inceliyorsun. Tozlu yüzeyinde bir kraliyet arması ve gizli bir kapıyı işaret eden bir sembol fark ediyorsun. Şövalye hâlâ sana bakıyor, ama harekete geçmedi. Ne yaparsın?",
    choices: [
      {
        text: "Gizli kapıyı ara",
        nextScene: "secret_room",
        effect: { type: "addItem", value: "anahtar" },
        animationType: "move",
      },
      {
        text: "Şövalyeyle savaş",
        nextScene: "fight_knight",
        effect: { type: "health", value: -20 },
        animationType: "fight",
      },
      {
        text: "Geri dön",
        nextScene: "castle_inside",
        animationType: "move",
      },
    ],
  },
  secret_room: {
    id: "secret_room",
    text: "Tablodaki sembole basıyorsun ve bir taş duvar kayarak açılıyor. Dar bir geçitten geçip küçük bir odaya ulaşıyorsun. İçeride bir sandık var, ama kilitli. Anahtarı kullanabilirsin. Ne yaparsın?",
    choices: [
      {
        text: "Sandığı aç",
        nextScene: "treasure_room",
        condition: { hasItem: "anahtar" },
        effect: { type: "addItem", value: "büyülü asa" },
        animationType: "move",
      },
      {
        text: "Sandığı açmaya çalışma, çık",
        nextScene: "castle_inside",
        animationType: "move",
      },
    ],
  },
  fight_knight: {
    id: "fight_knight",
    text: "Hayalet şövalyeyle çarpışıyorsun! Kılıcın varsa kazanma şansın yüksek, kalkanın varsa aldığın hasar azalıyor. Durumun ne?",
    choices: [
      {
        text: "Devam et (kılıç ve kalkan varsa)",
        nextScene: "treasure_room",
        condition: { hasItem: ["kılıç", "kalkan"] },
        effect: { type: "health", value: -10 },
        animationType: "move",
      },
      {
        text: "Devam et (sadece kılıç varsa)",
        nextScene: "treasure_room",
        condition: { hasItem: "kılıç" },
        effect: { type: "health", value: -20 },
        animationType: "move",
      },
      {
        text: "Devam et (kılıç yoksa)",
        nextScene: "end_lose",
        effect: { type: "health", value: -50 },
        animationType: "move",
      },
    ],
  },
  talk_knight: {
    id: "talk_knight",
    text: "Şövalye, hazineyi koruduğunu söylüyor. İksirin varsa seni serbest bırakmayı teklif ediyor, ama sadakat yemini etmeni de isteyebilir. Ne yaparsın?",
    choices: [
      {
        text: "İksiri ver",
        nextScene: "treasure_room",
        condition: { hasItem: "iksir" },
        effect: { type: "removeItem", value: "iksir" },
        animationType: "talk",
      },
      {
        text: "Yemini et",
        nextScene: "treasure_room",
        effect: { type: "addStatus", value: "sadakat yemini" },
        animationType: "talk",
      },
      {
        text: "Reddet ve savaş",
        nextScene: "end_lose",
        effect: { type: "health", value: -40 },
        animationType: "fight",
      },
    ],
  },
  escape_map: {
    id: "escape_map",
    text: "Haritayı kaptın ve kalenin arka kapısından kaçtın. Harita, hazineye giden bir patikayı ve bir nehir kenarındaki balıkçı kulübesini gösteriyor. Ne yaparsın?",
    choices: [
      {
        text: "Patikayı takip et",
        nextScene: "treasure_path",
        animationType: "move",
      },
      {
        text: "Balıkçıya git",
        nextScene: "river",
        animationType: "move",
      },
      { text: "Ormana geri dön", nextScene: "start", animationType: "move" },
    ],
  },
  village: {
    id: "village",
    text: "Köye vardığında, ahşap evlerden yükselen dumanlar ve köylülerin meraklı bakışlarıyla karşılaşıyorsun. Bir tüccar, sana bir sağlık iksiri satmayı teklif ediyor. Meydanda bir bilge, hazine hakkında bilgi verebileceğini söylüyor. Ne yaparsın?",
    choices: [
      {
        text: "İksiri al",
        nextScene: "village_iksir",
        effect: { type: "addItem", value: "iksir" },
        animationType: "talk",
      },
      {
        text: "Bilgeyle konuş",
        nextScene: "village_sage",
        animationType: "talk",
      },
      {
        text: "Köylülerle hazineyi konuş",
        nextScene: "village_talk",
        animationType: "talk",
      },
      { text: "Köyden ayrıl", nextScene: "start", animationType: "move" },
    ],
  },
  village_iksir: {
    id: "village_iksir",
    text: "İksiri aldın! Tüccar sana teşekkür ederken, bir köylü hazineye giden tehlikeli bir patikadan bahsediyor. Ayrıca nehir kenarında bir balıkçının hazine hakkında bilgi bildiğini duyuyorsun. Ne yaparsın?",
    choices: [
      {
        text: "Patikaya git",
        nextScene: "treasure_path",
        animationType: "move",
      },
      {
        text: "Balıkçıya git",
        nextScene: "river",
        animationType: "move",
      },
      {
        text: "Köylülerle daha fazla konuş",
        nextScene: "village_talk",
        animationType: "talk",
      },
    ],
  },
  village_sage: {
    id: "village_sage",
    text: "Bilge, sakallı ve yaşlı bir adam, sana hazineyi bulmanın anahtarının kadim bir tapınakta olduğunu söylüyor. Ancak tapınağa ulaşmak için nehirden geçmen gerekiyor. Ne yaparsın?",
    choices: [
      {
        text: "Nehire git",
        nextScene: "river",
        animationType: "move",
      },
      {
        text: "Tapınağa doğrudan git",
        nextScene: "temple",
        animationType: "move",
      },
      {
        text: "Köyde kal",
        nextScene: "village",
        animationType: "move",
      },
    ],
  },
  village_talk: {
    id: "village_talk",
    text: "Köylüler, hazineyi koruyan bir büyücünün ormanda bir kulübede yaşadığını söylüyor. Ayrıca ormanda bir mağaranın hazineye dair ipuçları barındırdığını fısıldıyorlar. Ne yaparsın?",
    choices: [
      { text: "Büyücüye git", nextScene: "wizard", animationType: "move" },
      { text: "Mağaraya git", nextScene: "cave", animationType: "move" },
      { text: "Köyden ayrıl", nextScene: "start", animationType: "move" },
    ],
  },
  wizard: {
    id: "wizard",
    text: "Ormanda, ağaçların arasında gizlenmiş bir kulübede yaşlı bir büyücüyle karşılaşıyorsun. Sana hazineyi bulman için bir tılsım sunuyor, ama karşılığında sadakat yemini etmeni veya bir iksir vermeni istiyor. Ne yaparsın?",
    choices: [
      {
        text: "Yemini et ve tılsımı al",
        nextScene: "treasure_path",
        effect: [
          { type: "addItem", value: "tılsım" },
          { type: "addStatus", value: "sadakat yemini" },
        ],
        animationType: "talk",
      },
      {
        text: "İksiri ver",
        nextScene: "treasure_path",
        condition: { hasItem: "iksir" },
        effect: [
          { type: "removeItem", value: "iksir" },
          { type: "addItem", value: "tılsım" },
        ],
        animationType: "talk",
      },
      {
        text: "Reddet ve savaş",
        nextScene: "fight_wizard",
        effect: { type: "health", value: -60 },
        animationType: "fight",
      },
    ],
  },
  fight_wizard: {
    id: "fight_wizard",
    text: "Büyücüyle savaşıyorsun! Büyülü asan varsa kazanma şansın var, yoksa büyücünün ateş topu seni yakıyor. Durumun ne?",
    choices: [
      {
        text: "Devam et (büyülü asa varsa)",
        nextScene: "treasure_path",
        condition: { hasItem: "büyülü asa" },
        effect: { type: "addItem", value: "tılsım" },
        animationType: "move",
      },
      {
        text: "Devam et (büyülü asa yoksa)",
        nextScene: "end_lose",
        effect: { type: "health", value: -50 },
        animationType: "move",
      },
    ],
  },
  cave: {
    id: "cave",
    text: "Ormanın derinliklerinde karanlık bir mağaraya ulaşıyorsun. İçeride yankılanan damlalar ve garip bir ışık var. Mağaranın girişinde bir taş tablet üzerinde bir bilmece yazıyor: 'Doğruyu söylersem yalan söylerim.' Ne yaparsın?",
    choices: [
      {
        text: "Bilmeceyi çöz",
        nextScene: "cave_puzzle",
        animationType: "talk",
      },
      {
        text: "Mağaraya girmeden geri dön",
        nextScene: "village_talk",
        animationType: "move",
      },
      {
        text: "Bilmeceyi görmezden gel ve içeri gir",
        nextScene: "cave_trap",
        effect: { type: "health", value: -30 },
        animationType: "move",
      },
    ],
  },
  cave_puzzle: {
    id: "cave_puzzle",
    text: "Bilmeceyi çözüyorsun: Bu bir yalancı paradoksu, yani tablet yalan söylüyor. Doğru yolu seçiyorsun ve mağaranın derinliklerinde bir sandık buluyorsun. İçinde bir anahtar var. Ne yaparsın?",
    choices: [
      {
        text: "Anahtarı al ve çık",
        nextScene: "treasure_path",
        effect: { type: "addItem", value: "anahtar" },
        animationType: "move",
      },
      {
        text: "Mağarada daha fazla ara",
        nextScene: "cave_trap",
        effect: { type: "health", value: -20 },
        animationType: "move",
      },
    ],
  },
  cave_trap: {
    id: "cave_trap",
    text: "Mağaranın derinliklerinde bir tuzak tetikleniyor! Düşen kayalar seni yaralıyor. Hızla dışarı çıkıyorsun, ama hazineye dair bir ipucu bulamıyorsun. Ne yaparsın?",
    choices: [
      {
        text: "Ormana geri dön",
        nextScene: "start",
        animationType: "move",
      },
      {
        text: "Yeniden mağaraya gir",
        nextScene: "cave",
        animationType: "move",
      },
    ],
  },
  river: {
    id: "river",
    text: "Nehir kenarına ulaşıyorsun. Suyun akışı sakin, ama karşında eski bir kulübede yaşayan gizemli bir balıkçı var. Sana hazineye giden tapınağın yerini bildiğini, ama bir iyilik istediğini söylüyor. Ne yaparsın?",
    choices: [
      {
        text: "Balıkçının iyiliğini yap",
        nextScene: "river_help",
        effect: { type: "addItem", value: "balıkçı haritası" },
        animationType: "talk",
      },
      {
        text: "Bilgi için iksir ver",
        nextScene: "temple",
        condition: { hasItem: "iksir" },
        effect: { type: "removeItem", value: "iksir" },
        animationType: "talk",
      },
      {
        text: "Balıkçıyı görmezden gel ve nehri geç",
        nextScene: "temple",
        effect: { type: "health", value: -20 },
        animationType: "move",
      },
    ],
  },
  river_help: {
    id: "river_help",
    text: "Balıkçıya yardım ediyorsun ve o sana hazineye giden tapınağın haritasını veriyor. Harita, tapınakta bir muhafızın olduğunu söylüyor. Ne yaparsın?",
    choices: [
      {
        text: "Tapınağa git",
        nextScene: "temple",
        animationType: "move",
      },
      {
        text: "Nehir kenarında kal",
        nextScene: "river",
        animationType: "move",
      },
    ],
  },
  forest: {
    id: "forest",
    text: "Ormanın derinliklerinde, ağaçların gölgeleri arasında bir kurt sürüsü beliriyor. Gözleri ateş gibi parlıyor, hırlıyorlar. Rüzgar dalları sallarken, bir mağaranın girişini fark ediyorsun. Ne yaparsın?",
    choices: [
      {
        text: "Kurtlara saldır",
        nextScene: "fight_wolf",
        effect: { type: "health", value: -20 },
        animationType: "fight",
      },
      { text: "Mağaraya kaç", nextScene: "cave", animationType: "move" },
      {
        text: "Kurdu sakinleştir",
        nextScene: "wolf_friend",
        condition: { hasItem: "iksir" },
        effect: [
          { type: "removeItem", value: "iksir" },
          { type: "addItem", value: "sadık kurt" },
        ],
        animationType: "talk",
      },
      {
        text: "Ormandan geri kaç",
        nextScene: "escape_forest",
        animationType: "move",
      },
    ],
  },
  fight_wolf: {
    id: "fight_wolf",
    text: "Kurtlarla savaşıyorsun! Kılıcın varsa kazanma şansın var, kalkanın varsa hasar azalıyor. Durumun ne?",
    choices: [
      {
        text: "Devam et (kılıç ve kalkan varsa)",
        nextScene: "treasure_path",
        condition: { hasItem: ["kılıç", "kalkan"] },
        effect: { type: "health", value: -10 },
        animationType: "move",
      },
      {
        text: "Devam et (sadece kılıç varsa)",
        nextScene: "treasure_path",
        condition: { hasItem: "kılıç" },
        effect: { type: "health", value: -20 },
        animationType: "move",
      },
      {
        text: "Devam et (kılıç yoksa)",
        nextScene: "end_lose",
        effect: { type: "health", value: -50 },
        animationType: "move",
      },
    ],
  },
  wolf_friend: {
    id: "wolf_friend",
    text: "İksiri kullanarak kurdu sakinleştirdin! Sadık bir kurt artık seninle, sana hazineye giden patikayı gösteriyor. Kurt, tehlikeleri sezebiliyor. Ne yaparsın?",
    choices: [
      {
        text: "Patikayı takip et",
        nextScene: "treasure_path",
        animationType: "move",
      },
      {
        text: "Mağaraya git",
        nextScene: "cave",
        animationType: "move",
      },
    ],
  },
  escape_forest: {
    id: "escape_forest",
    text: "Kurtlardan kaçtın, ama ormanda yolunu kaybettin. Gecenin karanlığı çöküyor, hazineyi bulma şansın azalıyor. Ne yaparsın?",
    choices: [
      {
        text: "Yeniden ormana dal",
        nextScene: "forest",
        animationType: "move",
      },
      { text: "Ormandan çık", nextScene: "end_escape", animationType: "move" },
    ],
  },
  temple: {
    id: "temple",
    text: "Kadim tapınağa ulaşıyorsun. Yosun kaplı taşlar ve eski yazıtlar, buranın kutsal bir yer olduğunu fısıldıyor. Kapıda bir muhafız beliriyor ve sana bir bilmece soruyor: 'Ne her zaman gelir, ama asla varmaz?' Ne yaparsın?",
    choices: [
      {
        text: "Bilmeceyi cevapla: Yarın",
        nextScene: "temple_inside",
        animationType: "talk",
      },
      {
        text: "Büyülü asa ile muhafızı etkisizleştir",
        nextScene: "temple_inside",
        condition: { hasItem: "büyülü asa" },
        animationType: "fight",
      },
      {
        text: "Kaç",
        nextScene: "end_escape",
        effect: { type: "health", value: -10 },
        animationType: "move",
      },
    ],
  },
  temple_inside: {
    id: "temple_inside",
    text: "Tapınağın içine giriyorsun. Ortada bir sunak ve üzerinde parlayan bir tılsım var. Ancak sunak, bir büyüyle korunuyor. Ne yaparsın?",
    choices: [
      {
        text: "Tılsımı al",
        nextScene: "treasure_path",
        condition: { hasItem: "büyülü asa" },
        effect: { type: "addItem", value: "tılsım" },
        animationType: "move",
      },
      {
        text: "Büyüyü çözmeye çalış",
        nextScene: "temple_trap",
        effect: { type: "health", value: -30 },
        animationType: "talk",
      },
      {
        text: "Tapınaktan çık",
        nextScene: "end_escape",
        animationType: "move",
      },
    ],
  },
  temple_trap: {
    id: "temple_trap",
    text: "Büyüyü çözmeye çalışırken bir tuzak tetikleniyor! Tapınak sarsılıyor ve taşlar düşüyor. Yaralı bir şekilde dışarı çıkıyorsun. Ne yaparsın?",
    choices: [
      {
        text: "Yeniden tapınağa gir",
        nextScene: "temple",
        animationType: "move",
      },
      {
        text: "Ormana geri dön",
        nextScene: "start",
        animationType: "move",
      },
    ],
  },
  treasure_path: {
    id: "treasure_path",
    text: "Hazineye giden patikada, yerdeki taşların bir mekanizmayı tetiklediğini fark ediyorsun. Tuzak, ölümcül oklar fırlatıyor. Ne yaparsın?",
    choices: [
      {
        text: "Tılsımla tuzağı etkisizleştir",
        nextScene: "end_win",
        condition: { hasItem: "tılsım" },
        animationType: "talk",
      },
      {
        text: "Sadık kurtla geç",
        nextScene: "end_win",
        condition: { hasItem: "sadık kurt" },
        animationType: "move",
      },
      {
        text: "Büyülü asa ile tuzağı durdur",
        nextScene: "end_win",
        condition: { hasItem: "büyülü asa" },
        animationType: "fight",
      },
      {
        text: "Dikkatlice geç",
        nextScene: "end_lose",
        effect: { type: "health", value: -50 },
        animationType: "move",
      },
    ],
  },
  end_win: {
    id: "end_win",
    text: "Tebrikler! Ejderha Tacı’nı buldun! Krallıkta bir kahraman olarak anılıyorsun. Ancak, sadakat yemini ettiysen, büyücü seni krallığı ele geçirmek için çağırıyor. Ne yaparsın?",
    choices: [
      {
        text: "Krallığı yönet",
        nextScene: "end_king",
        condition: { hasStatus: "sadakat yemini" },
        animationType: "talk",
      },
      {
        text: "Hazineyi krallığa teslim et",
        nextScene: "end_hero",
        animationType: "move",
      },
    ],
  },
  end_king: {
    id: "end_king",
    text: "Büyücünün yardımıyla Ejderha Tacı’nı kullanarak krallığı ele geçiriyorsun. Ancak halk, senin sadakat yemininin bedelini sorguluyor. Oyunu kazandın, ama karanlık bir hükümdar oldun.",
    choices: [],
  },
  end_hero: {
    id: "end_hero",
    text: "Ejderha Tacı’nı krallığa teslim ediyorsun. Halk seni bir kahraman olarak kutluyor ve krallık barış içinde yaşıyor. Oyunu kazandın!",
    choices: [],
  },
  end_lose: {
    id: "end_lose",
    text: "Maalesef, yanlış bir seçim yaptın ve maceran burada sona erdi. Ejderha Tacı’nı bulamadan yenildin. Oyunu kaybettin.",
    choices: [],
  },
  end_escape: {
    id: "end_escape",
    text: "Hazineyi bulamadan ormandan kaçtın. Güvenliktesin, ama ne bir kahraman ne de bir efsane oldun. Maceran burada bitti.",
    choices: [],
  },
};

export default StoryData;
