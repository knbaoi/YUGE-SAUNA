const { useState, useEffect } = React;

// Lucideアイコン描画コンポーネント
const Icon = ({ name, size = 24, color = "currentColor", fill = "none", className = "" }) => {
    if (!window.lucide?.icons) return null;
    const d = window.lucide.icons[name];
    if (!d) return null;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
            fill={fill} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {d.map(([tag, attrs], i) => React.createElement(tag, { ...attrs, key: i }))}
        </svg>
    );
};

// セクション見出しコンポーネント
const SectionTitle = ({ sub, title, light }) => (
    <div className="text-center mb-12 md:mb-16">
        {sub && <p className={`text-xs tracking-[0.2em] mb-4 ${light ? 'text-[#C9A861]' : 'text-[#C9A861]'}`}>{sub}</p>}
        <h2 className={`text-[28px] md:text-[40px] font-light tracking-[0.08em] section-underline ${light ? 'text-white' : 'text-[#2A2A2A]'}`}>{title}</h2>
    </div>
);

// 口コミカードコンポーネント
const ReviewCard = ({ stars, text, name }) => (
    <div className="bg-white rounded-xl p-7 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) =>
            <Icon key={i} name="Star" size={16} color="#C9A861" fill={i < stars ? "#C9A861" : "none"} />
        )}</div>
        <p className="text-[#2A2A2A] leading-[1.8] mb-4">{text}</p>
        <p className="text-sm text-[#6B6B6B] text-right">{name}</p>
    </div>
);

// --- データ定義 ---
const PLANS = [
    {
        name: "10周年90分パック", badge: "⭐ 人気No.1", forWho: "仕事帰りにサクッと",
        oldPrice: "¥2,000", newPrice: "¥1,600", discount: "20% OFF", featured: true,
        items: ["サウナ×2セット（88℃フィンランド式）", "水風呂×2セット（17℃/12℃選択可）", "外気浴スペース利用", "やわらかロウリュ体験", "選べるドリンク1杯"],
        btnColor: "bg-[#2A2A2A]", btnText: "text-white"
    },
    {
        name: "ペア割120分", forWho: "友人・恋人とゆっくり", snsBadge: "📷 Instagram映え",
        oldPrice: "¥5,600", newPrice: "¥4,800", discount: "14% OFF", priceNote: "1人あたり¥2,400",
        items: ["サウナ×2セット（88℃フィンランド式）", "水風呂×2セット", "外気浴スペース利用", "2名同時予約で特別価格", "男女別エリアでも利用可", "ペア専用ラウンジ利用可"],
        btnColor: "bg-[#D9C7B3]", btnText: "text-[#2A2A2A]"
    },
    {
        name: "朝活60分", forWho: "出勤前リフレッシュ", timeBadge: "平日6:00-9:00限定",
        oldPrice: "¥1,800", newPrice: "¥1,200", discount: "33% OFF",
        items: ["サウナ×1セット", "水風呂×1セット", "朝のロウリュ体験", "モーニングドリンク付"],
        btnColor: "bg-[#D9C7B3]", btnText: "text-[#2A2A2A]"
    }
];

const REASONS = [
    { icon: "MapPin", num: "01", title: "神田駅東口から徒歩3分", text: "JR神田駅・東京メトロ神田駅から徒歩3分。大手町・日本橋エリアからもアクセス良好。仕事帰りに気軽に立ち寄れる好立地です。" },
    { icon: "Thermometer", num: "02", title: "プロが設計した黄金比率", text: "サウナ室88℃、水風呂17℃/12℃。サウナ・スパ健康アドバイザー監修の最適温度設定。心地よく「ととのう」体験をお届けします。" },
    { icon: "Droplet", num: "03", title: "選べる2つの水風呂", text: "17℃シングル水風呂と12℃バイブラ水風呂をご用意。その日の体調や好みに合わせてお選びいただけます。" },
    { icon: "Wind", num: "04", title: "都心の夜空を眺める外気浴", text: "屋上に設置された10席の外気浴スペース。都会の喧騒を忘れ、静かな余白時間をお過ごしください。北欧チェア完備。" },
    { icon: "ShieldCheck", num: "05", title: "安心の衛生管理", text: "毎時間の清掃体制、オゾン水による殺菌、24時間換気システム。清潔で快適な空間を維持しています。" }
];

const FAQS = [
    { q: "初めてサウナを利用しますが、大丈夫ですか？", a: "はい、初心者の方も安心してご利用いただけます。ご来館時にスタッフが入り方やマナーを丁寧にご案内いたします。わからないことがあれば、いつでもお気軽にお声がけください。" },
    { q: "何を持っていけばいいですか？", a: "手ぶらでお越しいただけます。タオル、館内着、シャンプー・ボディソープ、基礎化粧品など、必要なものはすべて無料でご用意しております。" },
    { q: "混雑する時間帯はいつですか？", a: "平日は18:00〜21:00、土日祝は13:00〜17:00が比較的混雑します。朝活プラン（6:00〜9:00）や平日昼間は比較的空いております。予約時にリアルタイム混雑状況をご確認いただけます。" },
    { q: "ロウリュは何時に実施されますか？", a: "毎時00分に実施しております（10:00〜22:00）。フィンランド式の本格ロウリュをお楽しみください。女性専用サウナでは、アロマを使用したやわらかロウリュを実施しております。" },
    { q: "キャンセル料はかかりますか？", a: "入館予定時刻の2時間前までのキャンセルは無料です。2時間前を過ぎてのキャンセルは、料金の50%をキャンセル料としていただきます。" },
    { q: "女性一人でも利用できますか？", a: "はい、女性専用エリア（サウナ室・パウダールーム）を完備しておりますので、お一人でも安心してご利用いただけます。女性スタッフも常駐しております。" },
    { q: "ペア利用の場合、男女別々のエリアですか？", a: "はい、サウナ室・更衣室・水風呂は男女別エリアとなります。ただし、ペア専用ラウンジ（休憩スペース）は共用でご利用いただけますので、ご一緒にお過ごしいただけます。" },
    { q: "10周年キャンペーンはいつまでですか？", a: "2025年12月15日までの期間限定です。オンライン予約時にクーポンコード「YUGE10」を入力いただくと、特別価格が適用されます。" }
];

const REVIEWS = [
    { stars: 5, text: "初めてのサウナでしたが、スタッフの方が丁寧に教えてくれて安心しました。仕事の疲れが一気に抜けて、翌日の仕事も集中できました。これから定期的に通います！", name: "田中様・30代男性・会社員" },
    { stars: 5, text: "友人と2人で利用しました。女性専用エリアが清潔で、アメニティも充実していて最高です。外気浴スペースの雰囲気が本当に素敵で、写真もたくさん撮りました！", name: "佐藤様・20代女性・フリーランス" },
    { stars: 5, text: "朝活プランを利用。出勤前にサウナに入ると、1日のパフォーマンスが全然違います。駅近なのが本当にありがたい。", name: "山田様・40代男性・会社員" },
    { stars: 4, text: "北欧×和モダンの世界観が素敵すぎます。ロウリュも気持ち良くて、毎週通っています。彼氏と来ても、それぞれのエリアで楽しめるのが良いですね。", name: "鈴木様・20代女性・フリーランス" }
];

const WOMEN_FEATURES = ["やわらかロウリュ（アロマ使用）", "ゆったりパウダールーム", "セキュリティ完備", "女性スタッフ常駐"];
const AMENITIES = ["Dysonドライヤー", "オーガニック化粧品", "ヘアアイロン", "基礎化粧品セット", "シャンプー・コンディショナー", "ボディソープ", "化粧水・乳液", "メイク落とし"];

const FACILITY_SPECS = [
    { title: "サウナ室（男性）", specs: [["温度", "88℃"], ["定員", "12名"], ["タイプ", "フィンランド式"], ["ストーン", "サウナストーン200kg使用"], ["ロウリュ", "毎時00分実施"], ["照明", "間接照明（調光可能）"]] },
    { title: "女性専用サウナ", specs: [["温度", "85℃"], ["定員", "8名"], ["タイプ", "やわらかロウリュ"], ["アロマ", "日替わりアロマオイル"], ["特徴", "北欧デザイン、柔らかい木材使用"]] },
    { title: "水風呂（17℃シングル）", specs: [["温度", "17℃（±0.5℃）"], ["定員", "4名"], ["水質", "オゾン水循環濾過"], ["深さ", "90cm"]] },
    { title: "水風呂（12℃バイブラ）", specs: [["温度", "12℃（±0.5℃）"], ["定員", "3名"], ["タイプ", "バイブラジェット"], ["水質", "軟水使用"]] },
    { title: "外気浴スペース", specs: [["場所", "屋上（5階）"], ["席数", "10席（北欧チェア）"], ["特徴", "都心の夜景を一望"], ["植栽", "観葉植物配置"]] },
    { title: "パウダールーム", specs: [["設備", "Dysonドライヤー、ヘアアイロン"], ["アメニティ", "オーガニック化粧品完備"], ["席数", "12席（女性専用8席）"]] }
];

const PRICE_TABLE = [
    ["60分", "¥1,800", "¥2,000"], ["90分", "¥2,200", "¥2,500"], ["120分", "¥2,800", "¥3,200"],
    ["ペア割120分", "¥5,200", "¥5,800"], ["朝活60分", "¥1,800", "—"]
];

// --- メインAppコンポーネント ---
const App = () => {
    const [showFixedCTA, setShowFixedCTA] = useState(false);
    const [copied, setCopied] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const daysLeft = Math.max(0, Math.ceil((new Date('2025-12-15') - new Date()) / 86400000));

    useEffect(() => {
        const onScroll = () => setShowFixedCTA(window.scrollY > 800);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const copyCode = () => {
        navigator.clipboard.writeText('YUGE10');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCTA = () => alert('予約ページへ遷移します（実装時は実際のURLに変更）');

    return (
        <div className="relative">
            {/* トースト通知 */}
            {copied && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#C9A861] text-white px-6 py-3 rounded-lg shadow-lg z-[200] animate-fade-in-down font-bold">
                    ✓ コピーしました！
                </div>
            )}

            {/* ===== 1. ファーストビュー ===== */}
            <section className="relative min-h-[650px] h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center z-0" style={{
                    backgroundImage: `linear-gradient(180deg, rgba(42,42,42,0.3) 0%, rgba(42,42,42,0.6) 100%), url('Images0210/ChatGPT Image Nov 18, 2025, 08_47_46 AM.png')`
                }} />

                {/* ロゴ */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                    <img src="sozai/2.png" alt="湯気 YUGE Sauna & Spa" className="h-24 md:h-32 w-auto brightness-0 invert" />
                </div>

                {/* 10周年バッジ */}
                <div className="absolute top-6 right-6 z-20 w-20 h-20 bg-[#C9A861] rounded-full flex flex-col items-center justify-center text-white shadow-lg border border-white/20">
                    <span className="text-[11px] leading-none">10th</span>
                    <span className="text-lg font-bold leading-tight">¥1,600</span>
                    <span className="text-[10px] leading-none">～</span>
                </div>

                {/* メインコピー */}
                <div className="relative z-10 text-center px-6 max-w-[800px]">
                    <h1 className="font-serif text-[40px] md:text-[60px] font-light text-white leading-[1.3] tracking-[0.05em] mb-4" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.8)' }}>
                        残業後、90分で<br />明日の自分を取り戻す
                    </h1>
                    <p className="text-white/70 text-sm md:text-base mb-2">都会の余白で、わたしだけの時間</p>
                    <p className="text-lg text-white opacity-95 tracking-[0.05em] mt-6 mb-6">
                        神田駅徒歩3分｜北欧×和モダン｜10周年限定 ¥1,600～
                    </p>
                    {/* 3特徴アイコン */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {[["🚶", "徒歩3分"], ["♨️", "ロウリュ毎時"], ["🌙", "23時まで営業"]].map(([emoji, label], i) => (
                            <span key={i} className="bg-white/15 backdrop-blur-[10px] text-white px-5 py-2.5 rounded-3xl text-sm">{emoji} {label}</span>
                        ))}
                    </div>
                    <button onClick={handleCTA} className="w-[300px] md:w-[360px] h-[60px] bg-[#C9A861] text-white text-lg font-bold tracking-[0.1em] btn-cta rounded-md">
                        空き状況を確認する
                    </button>
                </div>

                {/* スクロールヒント */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 opacity-80">
                    <div className="animate-bounce-slow"><Icon name="ChevronDown" size={24} color="white" /></div>
                    <span className="text-[12px] tracking-[0.2em]">SCROLL</span>
                </div>
            </section>

            {/* ===== 2. スマホ固定CTA ===== */}
            {showFixedCTA && (
                <div className="fixed bottom-0 left-0 w-full h-[68px] bg-[#2A2A2A] z-[100] shadow-[0_-3px_15px_rgba(0,0,0,0.15)] md:hidden flex flex-col items-center justify-center fixed-cta-enter cursor-pointer active:scale-[0.98] transition-transform"
                    onClick={handleCTA}>
                    <span className="text-[12px] text-white opacity-85">キャンセル2時間前まで無料</span>
                    <span className="text-white text-lg font-bold">¥1,600で今すぐ予約</span>
                </div>
            )}

            {/* ===== 3. 10周年キャンペーン ===== */}
            <section id="campaign" className="py-[100px] md:py-[160px] bg-[#FAFAF8] px-5 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <SectionTitle sub="10TH ANNIVERSARY" title="10周年記念 特別プラン" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        {PLANS.map((plan, idx) => (
                            <div key={idx} className={`relative bg-white border border-[#E5E5E5] rounded-2xl p-8 md:p-10 flex flex-col card-hover shadow-[0_6px_20px_rgba(0,0,0,0.04)] ${plan.featured ? 'border-[#C9A861] border-2' : ''}`}>
                                {plan.badge && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C9A861] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">{plan.badge}</div>
                                )}
                                {plan.snsBadge && <span className="text-xs text-[#6B6B6B] mb-1">{plan.snsBadge}</span>}
                                {plan.timeBadge && <span className="inline-block text-xs bg-[#F5F0E8] text-[#C9A861] px-3 py-1 rounded-full mb-2 w-fit font-bold">{plan.timeBadge}</span>}
                                <h3 className="text-2xl font-semibold text-[#2A2A2A]">{plan.name}</h3>
                                <p className="text-[#6B6B6B] mt-2 mb-6">{plan.forWho}</p>
                                <div className="text-center my-6 overflow-hidden">
                                    <div className="flex items-baseline justify-center gap-1 flex-wrap">
                                        <span className="text-lg md:text-2xl text-[#999] line-through whitespace-nowrap">{plan.oldPrice}</span>
                                        <span className="text-base md:text-xl text-[#C9A861]">→</span>
                                        <span className="text-[36px] md:text-[48px] font-bold text-[#2A2A2A] whitespace-nowrap">{plan.newPrice}</span>
                                        <span className="inline-block bg-[#FFE5E5] text-[#D32F2F] text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-md whitespace-nowrap">{plan.discount}</span>
                                    </div>
                                    {plan.priceNote && <p className="text-sm text-[#6B6B6B] mt-2">{plan.priceNote}</p>}
                                </div>
                                <ul className="flex-grow space-y-3 mb-8">
                                    {plan.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3 text-[#2A2A2A] leading-[2]">
                                            <Icon name="Check" size={18} color="#C9A861" className="mt-1.5 shrink-0" />{item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center gap-2 text-sm text-[#D32F2F] mb-6">
                                    <Icon name="Clock" size={16} color="#D32F2F" />期間：2025年12月15日まで（残り{daysLeft}日）
                                </div>
                                <button onClick={handleCTA} className={`w-full h-[52px] ${plan.btnColor} ${plan.btnText} font-bold rounded-lg btn-cta text-base`}>このプランで予約する</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 4. 不安解消ブロック ===== */}
            <section className="bg-[#F5F0E8] py-[60px] md:py-20 px-5 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <SectionTitle sub="FIRST TIME WELCOME" title="初めての方も安心してご利用いただけます" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "UserCheck", title: "初心者大歓迎", text: "入り方ガイドをスタッフが丁寧にご案内。サウナマナーもお伝えします。" },
                            { icon: "ShoppingBag", title: "手ぶらで来館OK", text: "タオル・館内着・アメニティ完備。仕事帰りにそのままお越しください。" },
                            { icon: "Users", title: "混雑状況が見える", text: "予約時にリアルタイム混雑度を表示。落ち着いて利用できる時間帯を選べます。" }
                        ].map((card, i) => (
                            <div key={i} className="bg-white rounded-xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                                <Icon name={card.icon} size={40} color="#C9A861" className="mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                                <p className="text-[#6B6B6B] leading-[1.8]">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 5. 実績データ ===== */}
            <section className="bg-[#2A2A2A] text-white py-20 md:py-[100px] px-5">
                <div className="max-w-[1200px] mx-auto">
                    <p className="text-center text-xs tracking-[0.2em] text-[#C9A861] mb-12">TRUSTED BY MANY</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="flex justify-center gap-1 mb-4">{[...Array(5)].map((_, i) =>
                                <Icon key={i} name="Star" size={32} color="#C9A861" fill="#C9A861" />
                            )}</div>
                            <span className="text-[64px] md:text-[80px] font-bold">4.7</span>
                            <span className="text-base opacity-70 ml-2">/ 5.0</span>
                            <p className="text-sm mt-2 opacity-80">Google口コミ平均</p>
                        </div>
                        <div>
                            <Icon name="Users" size={32} color="#C9A861" className="mx-auto mb-4" />
                            <span className="text-[64px] md:text-[80px] font-bold">50,000+</span>
                            <p className="text-base opacity-70 mt-2">人突破</p>
                            <p className="text-sm mt-2 opacity-80">年間利用者数</p>
                        </div>
                        <div>
                            <Icon name="Repeat" size={32} color="#C9A861" className="mx-auto mb-4" />
                            <span className="text-[64px] md:text-[80px] font-bold">46%</span>
                            <p className="text-base opacity-70 mt-2">再訪率</p>
                            <p className="text-sm mt-2 opacity-80">リピーター率</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 6. 選ばれる5つの理由 ===== */}
            <section className="py-[100px] md:py-[140px] bg-[#FAFAF8] px-5 md:px-10">
                <div className="max-w-[900px] mx-auto">
                    <SectionTitle sub="WHY YUGE" title="YUGEが選ばれる5つの理由" />
                    <div className="space-y-16 mt-16">
                        {REASONS.map((r, i) => (
                            <div key={i} className={`flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 ${i < REASONS.length - 1 ? 'pb-16 border-b border-[#E5E5E5]' : ''}`}>
                                <div className="w-[60px] h-[60px] rounded-full bg-[#F5F0E8] flex items-center justify-center shrink-0 relative">
                                    <Icon name={r.icon} size={32} color="#C9A861" />
                                    <span className="absolute -top-2 -right-2 text-xs text-[#C9A861] font-bold">{r.num}</span>
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-semibold text-[#2A2A2A] mb-3">{r.title}</h3>
                                    <p className="text-[#6B6B6B] leading-[1.8]">{r.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 7. 女性専用エリア ===== */}
            <section className="bg-[#F5F0E8] py-20 md:py-[100px] px-5 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <SectionTitle sub="FOR WOMEN" title="女性専用エリア＆充実のアメニティ" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                        <div className="bg-white rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                            <div className="w-full h-48 bg-gradient-to-r from-[#F5F0E8] to-[#D9C7B3] rounded-lg mb-6 flex items-center justify-center">
                                <span className="text-[#6B6B6B] text-lg">Women's Sauna Area</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">女性専用サウナ＆パウダールーム</h3>
                            <ul className="space-y-3">
                                {WOMEN_FEATURES.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#6B6B6B]">
                                        <Icon name="Check" size={18} color="#C9A861" />{f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                            <h3 className="text-xl font-semibold mb-6">プレミアムアメニティ完備</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {AMENITIES.map((a, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-[#6B6B6B] bg-[#F5F0E8] rounded-lg px-4 py-3">
                                        <Icon name="Check" size={14} color="#C9A861" />{a}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <button className="instagram-gradient text-white px-8 py-3 rounded-full font-bold text-sm btn-cta inline-flex items-center gap-2">
                            <Icon name="Instagram" size={20} color="white" />Instagramで施設の雰囲気を見る
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== 8. ロウリュ体験 ===== */}
            <section className="relative py-[100px] md:py-[120px] px-5 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                    backgroundImage: `linear-gradient(180deg, rgba(42,42,42,0.6) 0%, rgba(42,42,42,0.8) 100%), url('Images0210/ChatGPT Image Nov 18, 2025, 08_47_58 AM.png')`
                }} />
                <div className="relative z-10 text-center text-white max-w-[600px] mx-auto">
                    <p className="text-xs tracking-[0.3em] text-[#C9A861] mb-6">LÖYLY EXPERIENCE</p>
                    <h2 className="font-serif text-[32px] md:text-[40px] font-light mb-8">本格フィンランド式ロウリュ</h2>
                    <p className="text-lg leading-[1.8] opacity-90 mb-6">毎時00分、サウナストーンに水をかける本格ロウリュを実施。一気に立ち上る熱波で深い発汗を促します。</p>
                    <p className="text-base opacity-80">実施時間：毎時00分（10:00〜22:00）</p>
                </div>
            </section>

            {/* ===== 9. 利用者の声 ===== */}
            <section className="py-20 md:py-[100px] bg-[#FAFAF8] px-5 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <SectionTitle sub="REVIEWS" title="利用者の声" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        {REVIEWS.map((r, i) => <ReviewCard key={i} {...r} />)}
                    </div>
                </div>
            </section>

            {/* ===== 10. クーポンコード ===== */}
            <section className="bg-[#FFF9F0] py-[60px] px-5 text-center">
                <p className="text-[#6B6B6B] mb-6">予約時にこのコードをご入力ください</p>
                <div className="bg-white border-[3px] border-dashed border-[#C9A861] rounded-xl p-8 max-w-[400px] mx-auto cursor-pointer" onClick={copyCode}>
                    <span className="text-[40px] font-bold text-[#2A2A2A] tracking-[0.3em] block mb-4">YUGE10</span>
                    <div className="flex items-center justify-center gap-2 text-[#C9A861] font-bold">
                        <Icon name={copied ? "Check" : "Copy"} size={20} color="#C9A861" />{copied ? "コピーしました！" : "コードをコピーする"}
                    </div>
                </div>
                <p className="text-sm text-[#6B6B6B] mt-4 max-w-md mx-auto">予約ページでクーポンコードを入力すると、10周年特別価格が適用されます</p>
            </section>

            {/* ===== 11. FAQ ===== */}
            <section className="py-20 md:py-[100px] bg-[#FAFAF8] px-5">
                <div className="max-w-[800px] mx-auto">
                    <SectionTitle sub="FAQ" title="よくあるご質問" />
                    <div className="mt-12">
                        {FAQS.map((item, idx) => (
                            <div key={idx} className="border-b border-[#E5E5E5]">
                                <button className="w-full flex items-center gap-4 py-6 text-left hover:bg-[#F5F0E8] transition-colors px-2 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                                    <div className="w-8 h-8 rounded-full bg-[#C9A861] text-white flex items-center justify-center text-sm font-bold shrink-0">Q</div>
                                    <span className="text-lg font-semibold text-[#2A2A2A] flex-grow">{item.q}</span>
                                    <Icon name="ChevronDown" size={24} color="#C9A861" className={`shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="pl-14 pr-4 pb-6 text-[#6B6B6B] leading-[1.8] animate-fade-in-down">{item.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 12. 施設詳細 ===== */}
            <section className="bg-[#F5F0E8] py-20 md:py-[100px] px-5 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <SectionTitle sub="FACILITIES" title="施設詳細" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                        {FACILITY_SPECS.map((f, i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                                <div className="h-48 bg-gradient-to-r from-[#2A2A2A] to-[#444] flex items-center justify-center">
                                    <span className="text-white/60 text-lg tracking-wider">{f.title}</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">{f.title}</h3>
                                    <table className="w-full">
                                        <tbody>
                                            {f.specs.map(([k, v], j) => (
                                                <tr key={j} className="border-b border-[#E5E5E5]">
                                                    <td className="py-3 text-sm text-[#6B6B6B] w-28">{k}</td>
                                                    <td className="py-3 text-[#2A2A2A]">{v}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 13. アクセス ===== */}
            <section className="py-20 md:py-[100px] bg-[#FAFAF8] px-5 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    <SectionTitle sub="ACCESS" title="アクセス・営業時間" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                        <div className="w-full h-[400px] rounded-lg overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828!2d139.7687!3d35.6912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c0303a4939b%3A0xc6a894a8618e4708!2z56We55Sw6aeF!5e0!3m2!1sja!2sjp!4v1620000000000" width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="YUGE Map"></iframe>
                        </div>
                        <div className="flex flex-col justify-center space-y-6">
                            {[
                                ["MapPin", "住所", "〒101-0047 東京都千代田区内神田2-XX-XX YUGEビル5F"],
                                ["Train", "アクセス", "JR神田駅 東口より徒歩3分\n東京メトロ銀座線 神田駅より徒歩3分\nJR東京駅より徒歩15分"],
                                ["Clock", "営業時間", "平日：10:00〜24:00（最終受付23:00）\n土日祝：9:00〜24:00（最終受付23:00）\n朝活プラン：平日6:00〜9:00"],
                                ["Calendar", "定休日", "第2火曜日（祝日の場合は翌日）"],
                                ["Phone", "電話", "03-XXXX-XXXX（受付時間：10:00〜22:00）"],
                                ["Mail", "メール", "info@yuge-sauna.jp"]
                            ].map(([icon, label, value], i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Icon name={icon} size={20} color="#C9A861" className="mt-1 shrink-0" />
                                    <div>
                                        <span className="font-semibold text-[#2A2A2A]">{label}</span>
                                        <p className="text-[#6B6B6B] whitespace-pre-line mt-1">{value}</p>
                                    </div>
                                </div>
                            ))}
                            <p className="text-sm text-[#6B6B6B]">※専用駐車場はございません。近隣のコインパーキングをご利用ください。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 14. 通常料金表 ===== */}
            <section className="bg-[#F5F0E8] py-[60px] md:py-20 px-5">
                <div className="max-w-[600px] mx-auto">
                    <h3 className="text-2xl font-light text-center mb-2 tracking-[0.08em]">通常料金</h3>
                    <p className="text-sm text-[#6B6B6B] text-center mb-8">※10周年キャンペーン終了後の通常料金です</p>
                    <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
                        <table className="w-full text-center">
                            <thead><tr className="bg-[#2A2A2A] text-white">
                                <th className="py-4 px-4">プラン</th><th className="py-4 px-4">平日</th><th className="py-4 px-4">土日祝</th>
                            </tr></thead>
                            <tbody>
                                {PRICE_TABLE.map(([plan, weekday, weekend], i) => (
                                    <tr key={i} className="border-b border-[#E5E5E5]">
                                        <td className="py-4 px-4 text-sm font-semibold">{plan}</td>
                                        <td className="py-4 px-4">{weekday}</td>
                                        <td className="py-4 px-4">{weekend}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-sm text-[#6B6B6B] space-y-1">
                        <p>※レンタルタオル・館内着・アメニティ込みの料金です</p>
                        <p>※延長料金：30分ごと¥500</p>
                        <p>※クレジットカード・PayPay・交通系IC対応</p>
                    </div>
                </div>
            </section>

            {/* ===== 15. 最終CTA ===== */}
            <section className="bg-[#2A2A2A] text-white py-[100px] md:py-[140px] px-5 text-center">
                <p className="text-xs tracking-[0.3em] text-[#C9A861] mb-6">READY TO RELAX?</p>
                <h2 className="font-serif text-[32px] md:text-[40px] font-light leading-[1.4] mb-4">今日、ととのう準備は<br />できていますか？</h2>
                <p className="text-xl opacity-90 mb-12">残業後90分。神田で、明日の自分を取り戻す。</p>
                <button onClick={handleCTA} className="w-full max-w-[420px] h-[68px] text-white text-xl font-bold tracking-[0.1em] rounded-lg btn-cta" style={{ background: 'linear-gradient(135deg, #C9A861 0%, #D4B574 100%)' }}>
                    ¥1,600で今すぐ予約する
                </button>
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-6 text-base opacity-80">
                    <span>✓ キャンセル2時間前まで無料</span><span>✓ クレカ・PayPay対応</span><span>✓ 約1分で予約完了</span>
                </div>
                <p className="text-sm text-[#C9A861] mt-8">10周年特別価格は12月15日まで｜残り{daysLeft}日</p>
            </section>

            {/* ===== 16. フッター ===== */}
            <footer className="bg-[#1A1A1A] text-white pt-[60px] pb-10 px-5">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                    <div>
                        <img src="sozai/2.png" alt="YUGE" className="h-12 w-auto brightness-0 invert mb-2" />
                        <p className="text-sm opacity-70 mt-2">北欧の静けさと、和の温もり</p>
                        <div className="flex gap-4 mt-6">
                            {["Instagram", "Twitter", "Facebook"].map((s, i) => (
                                <a key={i} href="#" className="opacity-60 hover:opacity-100 hover:text-[#C9A861] transition-all">
                                    <Icon name={s} size={24} color="currentColor" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold mb-4">MENU</h4>
                        <ul className="space-y-2 text-base opacity-70">
                            {["施設紹介", "料金プラン", "よくある質問", "アクセス", "お問い合わせ"].map((l, i) => (
                                <li key={i}><a href="#" className="hover:text-[#C9A861] transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold mb-4">CONTACT</h4>
                        <div className="space-y-2 text-base opacity-70">
                            <p>03-XXXX-XXXX</p><p>info@yuge-sauna.jp</p><p>営業時間：10:00〜24:00</p><p>定休日：第2火曜日</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto border-t border-[#333] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40">
                    <p>© 2025 YUGE Sauna & Spa. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:opacity-100">プライバシーポリシー</a>
                        <a href="#" className="hover:opacity-100">利用規約</a>
                        <a href="#" className="hover:opacity-100">特定商取引法</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
