/* 공통: 헤더 · 푸터 · 전화 버튼 · 스크롤 효과 */
(function () {
  const C = window.CW;
  const tel = "tel:" + C.phone.replace(/[^0-9+]/g, "");
  const page = document.body.dataset.page || "";
  const won = n => n.toLocaleString("ko-KR");
  const KAKAO_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C6.48 3 2 6.58 2 11c0 2.85 1.86 5.35 4.66 6.76l-.95 3.5c-.08.3.26.54.52.37l4.16-2.76c.53.06 1.07.09 1.61.09 5.52 0 10-3.58 10-8S17.52 3 12 3z"/></svg>`;
  const kakaoBtn = (label, cls = "btn ghost") => C.kakao
    ? `<a class="${cls} kakao-btn" href="${C.kakao}" target="_blank" rel="noopener">${KAKAO_ICON}${label}</a>` : "";

  const links = [
    ["index.html", "Label", "home"],
    ["crew.html", "Crew", "crew"],
    ["process.html", "Process", "process"],
    ["consult.html", "Consult", "consult"],
  ];

  const hdr = document.createElement("header");
  hdr.className = "hdr";
  hdr.innerHTML = `
    <a class="logo" href="index.html">C WORKS<small>LABEL</small></a>
    <button class="burger" aria-label="메뉴">MENU</button>
    <nav class="nav">
      ${links.map(([h, t, k]) => `<a href="${h}" class="${page === k ? "on" : ""}">${t}</a>`).join("")}
      <a class="call" href="${tel}">CS ${C.phone}</a>
    </nav>`;
  document.body.prepend(hdr);
  const nav = hdr.querySelector(".nav");
  hdr.querySelector(".burger").onclick = () => nav.classList.toggle("open");
  nav.addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("open"); });

  const onScroll = () => hdr.classList.toggle("solid", scrollY > 40 || page !== "home");
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const ftr = document.createElement("footer");
  ftr.className = "ftr";
  ftr.innerHTML = `
    <div class="wrap">
      <p class="eyebrow">Production by professionals</p>
      <h2 class="big">One hundred pieces.<br>Twenty years of hands.</h2>
      <div class="btns">
        <a class="btn" href="consult.html">제작 상담 신청 <span class="arr">→</span></a>
        <a class="btn ghost" href="${tel}">전화 상담 ${C.phone}</a>
        ${kakaoBtn("카카오톡 상담")}
      </div>
      <div class="ftr-grid">
        <div><b>C Works Label</b>동대문 업력 20년 이상 디자이너들의 프로모션 레이블.<br>스타일당 ${C.minQty}장 이상 · 총 ${won(C.minBudget / 10000)}만원 이상 제작.</div>
        <div><b>Contact</b><a href="${tel}">${C.phone}</a><br><a href="mailto:${C.email}">${C.email}</a>${C.kakao ? `<br><a href="${C.kakao}" target="_blank" rel="noopener">카카오톡 채널</a>` : ""}</div>
        <div><b>Hours</b>${C.hours}</div>
        <div><b>Studio</b>${C.address}</div>
      </div>
      <p class="copy">${C.bizInfo}<br>© ${new Date().getFullYear()} ${C.brand}. All rights reserved.</p>
    </div>`;
  document.body.append(ftr);

  const fabs = document.createElement("div");
  fabs.className = "fabs";
  fabs.innerHTML = (C.kakao ? `<a class="fab kakao" href="${C.kakao}" target="_blank" rel="noopener">${KAKAO_ICON}카톡 상담</a>` : "")
    + `<a class="fab" href="${tel}"><i></i>CS 바로 연결</a>`;
  document.body.append(fabs);

  // 사진 채우기: data-img 속성 → 배경
  document.querySelectorAll("[data-img]").forEach(el => {
    if (el.dataset.img) el.style.backgroundImage = `url("${el.dataset.img}")`;
  });

  // reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  window.observeReveal = root => (root || document).querySelectorAll(".rv:not(.in)").forEach(el => io.observe(el));
  observeReveal();

  // 페이지 안 <span class="js-kakao" data-label="..."> 자리에 카톡 버튼 채우기
  document.querySelectorAll(".js-kakao").forEach(el => { el.outerHTML = kakaoBtn(el.dataset.label || "카카오톡 상담"); });

  window.CWU = { tel, won, kakaoBtn };
})();
