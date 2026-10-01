const pages = [
  { name: "しゅっぱつ！", subtitle: "たいようけいの たびへ", text: "そらの ずーっと むこうには、\n8つの わくせいが まっているよ。\nいっしょに たんけんへ でかけよう！", fact: "わくせいは、たいようの まわりを ぐるぐる まわっているよ。", art: "intro", label: "たいようの え" },
  { name: "すいせい", subtitle: "たいように いちばん ちかい", text: "ちいさくて、いわが ごつごつ。\nひるは とっても あつく、\nよるは こおるほど さむいんだ。", fact: "たいようの まわりを たった88にちで いっしゅうするよ。", art: "mercury", label: "はいいろで ごつごつした すいせい" },
  { name: "きんせい", subtitle: "きいろい くもに つつまれた ほし", text: "あつい くもが いっぱいで、\n8つの なかで いちばん あついよ。\nよぞらで とても あかるく ひかるんだ。", fact: "きんせいでは、たいようが にしから のぼるよ。", art: "venus", label: "きいろい くもの きんせい" },
  { name: "ちきゅう", subtitle: "ぼくたちの すんでいる ほし", text: "あおい うみ、しろい くも、\nみどりの もりが ある ほし。\nたくさんの いのちが くらしているよ。", fact: "ちきゅうの ひょうめんの およそ7わりは うみなんだ。", art: "earth", label: "あおい うみと みどりの りくがある ちきゅう" },
  { name: "かせい", subtitle: "あかく かがやく ほし", text: "あかい すなと いわで できているよ。\nたかい やまや、おおきな たにが あるんだ。", fact: "たいようけいで いちばん たかい やまが あるよ。", art: "mars", label: "あかい すなに おおわれた かせい" },
  { name: "もくせい", subtitle: "いちばん おおきな わくせい", text: "ぐるぐるの しまもようが めじるし。\nちきゅうが 11こも ならぶくらい、\nとっても おおきいよ！", fact: "おおきな あかい もようは、ながく つづく あらしなんだ。", art: "jupiter", label: "ちゃいろと しろの しまもようの もくせい" },
  { name: "どせい", subtitle: "おおきな わっかの ある ほし", text: "こおりや いわで できた、\nきれいな わっかを つけているよ。\nふわふわの ガスで できているんだ。", fact: "わっかは ひとつに みえるけど、たくさんに わかれているよ。", art: "saturn", label: "おおきな わっかを つけた どせい", ring: true },
  { name: "てんのうせい", subtitle: "よこむきに ころがる ほし", text: "うすい あおみどりいろの わくせい。\nからだを よこに たおしたように、\nくるくる まわっているよ。", fact: "とても さむくて、マイナス200どより ひくくなるよ。", art: "uranus", label: "うすい あおみどりいろの てんのうせい" },
  { name: "かいおうせい", subtitle: "たいようから いちばん とおい", text: "ふかい あおいろの わくせい。\nとても つよい かぜが、\nびゅんびゅん ふいているよ。", fact: "たいようの まわりを いっしゅうするのに 165ねんも かかるよ。", art: "neptune", label: "ふかい あおいろの かいおうせい" },
  { name: "たんけん せいこう！", subtitle: "8つの わくせいに あえたね", text: "すい・きん・ち・か・もく・ど・てん・かい。\nみんな ちがって、みんな すてき！\nまた いつでも うちゅうへ いこう。", fact: "「わくせい いちらん」から、すきな ほしへ もういちど いけるよ。", art: "finish", label: "たんけん せいこうの きらきらメダル" }
];

let current = 0;
let speaking = false;
const $ = (id) => document.getElementById(id);
const els = { eyebrow: $("eyebrow"), art: $("planetArt"), page: $("pageNumber"), title: $("title"), subtitle: $("subtitle"), desc: $("description"), fact: $("factText"), prev: $("prevButton"), next: $("nextButton"), dots: $("progressDots"), progress: $("progressText"), sound: $("soundButton"), panel: $("planetPanel"), scrim: $("scrim"), listButton: $("listButton") };

function render() {
  const p = pages[current];
  stopSpeech();
  els.eyebrow.textContent = current === 0 ? "ちいさな うちゅうの ものがたり" : current === pages.length - 1 ? "おかえりなさい" : `たいようから ${current}ばんめ`;
  els.page.textContent = current > 0 && current < 9 ? `PLANET ${String(current).padStart(2, "0")}` : "";
  els.title.textContent = p.name;
  els.subtitle.textContent = p.subtitle;
  els.desc.textContent = p.text;
  els.fact.textContent = p.fact;
  els.art.className = `planet ${p.art}`;
  els.art.setAttribute("aria-label", p.label);
  els.art.innerHTML = p.ring ? '<span class="ring" aria-hidden="true"></span>' : "";
  els.prev.disabled = current === 0;
  els.next.querySelector("span").textContent = current === pages.length - 1 ? "さいしょへ" : "つぎへ";
  els.progress.textContent = `${current + 1} / ${pages.length} ページ`;
  [...els.dots.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
  document.querySelectorAll(".planet-item").forEach((item) => item.classList.toggle("current", Number(item.dataset.page) === current));
}

function goTo(index) {
  current = (index + pages.length) % pages.length;
  render();
  document.querySelector(".book").animate([{ opacity: .6 }, { opacity: 1 }], { duration: 260 });
}

function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  speaking = false;
  els.sound.setAttribute("aria-pressed", "false");
  els.sound.lastElementChild.textContent = "よみあげる";
}

function toggleSpeech() {
  if (!("speechSynthesis" in window)) {
    alert("このブラウザでは よみあげを つかえません。");
    return;
  }
  if (speaking) return stopSpeech();
  const p = pages[current];
  const utterance = new SpeechSynthesisUtterance(`${p.name}。${p.subtitle}。${p.text}。びっくりポイント。${p.fact}`);
  utterance.lang = "ja-JP";
  utterance.rate = .82;
  utterance.pitch = 1.08;
  utterance.onend = stopSpeech;
  speaking = true;
  els.sound.setAttribute("aria-pressed", "true");
  els.sound.lastElementChild.textContent = "とめる";
  window.speechSynthesis.speak(utterance);
}

function setPanel(open) {
  els.panel.classList.toggle("open", open);
  els.panel.setAttribute("aria-hidden", String(!open));
  els.listButton.setAttribute("aria-expanded", String(open));
  els.scrim.hidden = !open;
  if (open) $("closeButton").focus(); else els.listButton.focus();
}

pages.forEach((p, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `${i + 1}ページめへ`);
  dot.addEventListener("click", () => goTo(i));
  els.dots.append(dot);
});

pages.slice(1, 9).forEach((p, offset) => {
  const button = document.createElement("button");
  button.className = "planet-item";
  button.type = "button";
  button.dataset.page = offset + 1;
  const colors = ["#aaa197", "#e8a34d", "#42a9db", "#db6642", "#c88e65", "#e2bd68", "#75d5d8", "#276ac8"];
  button.innerHTML = `<span class="mini-planet" style="--mini:${colors[offset]}" aria-hidden="true"></span><span>${p.name}</span><small>${offset + 1}ばんめ</small>`;
  button.addEventListener("click", () => { goTo(offset + 1); setPanel(false); });
  $("planetList").append(button);
});

els.prev.addEventListener("click", () => goTo(current - 1));
els.next.addEventListener("click", () => goTo(current === pages.length - 1 ? 0 : current + 1));
els.sound.addEventListener("click", toggleSpeech);
els.listButton.addEventListener("click", () => setPanel(true));
$("closeButton").addEventListener("click", () => setPanel(false));
els.scrim.addEventListener("click", () => setPanel(false));
document.querySelector(".brand").addEventListener("click", (event) => { event.preventDefault(); goTo(0); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.panel.classList.contains("open")) setPanel(false);
  if (event.key === "ArrowRight" && !els.panel.classList.contains("open")) goTo(current === pages.length - 1 ? 0 : current + 1);
  if (event.key === "ArrowLeft" && current > 0 && !els.panel.classList.contains("open")) goTo(current - 1);
});

render();
