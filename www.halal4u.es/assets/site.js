(() => {
  "use strict";

  const phone = "34634432424";
  const freeDeliveryLimit = 250;
  const scriptUrl = document.currentScript?.src;
  const appRoot = scriptUrl ? new URL("../", scriptUrl).pathname : "/";
  const products = [
    {
      id: "20454070",
      name: "PEPPERONI HALAL FOR PIZZA 10 x 1 KG",
      shortName: "Pepperoni halal para pizza",
      pack: "10 x 1 kg",
      price: 135,
      category: "charcuteria",
      categoryLabel: "Charcutería",
      description: "Pepperoni halal de vacuno y pavo para pizza. Producto congelado.",
      image: "20454070.webp",
      href: "/product/20454070/pepperoni-halal-for-pizza-10-x-1-kg.html"
    },
    {
      id: "20454164",
      name: "SALAMI HALAL 1 x 10 KG",
      shortName: "Salami halal",
      pack: "1 x 10 kg",
      price: 135,
      category: "charcuteria",
      categoryLabel: "Charcutería",
      description: "Salami halal de vacuno y pavo para pizza. Producto congelado.",
      image: "20454164.webp",
      href: "/product/20454164/salami-halal-1-x-10-kg.html"
    },
    {
      id: "20456066",
      name: "FIAMBRE TURKEY-PAVO HALAL FOR PIZZA 1 x 10 KG",
      shortName: "Fiambre de pavo halal",
      pack: "1 x 10 kg",
      price: 125,
      category: "charcuteria",
      categoryLabel: "Charcutería",
      description: "Fiambre halal de pavo para pizza. Producto congelado.",
      image: "20456066.webp",
      href: "/product/20456066/fiambre-turkey-pavo-halal-for-pizza-1-x-10-kg.html"
    },
    {
      id: "20456088",
      name: "BACON TURKEY-PAVO HALAL FOR PIZZA 1 x 10 KG",
      shortName: "Bacon de pavo halal",
      pack: "1 x 10 kg",
      price: 135,
      category: "charcuteria",
      categoryLabel: "Charcutería",
      description: "Bacon halal de pavo para pizza. Producto congelado.",
      image: "20456088.webp",
      href: "/product/20456088/bacon-turkey-pavo-halal-for-pizza-1-x-10-kg.html"
    },
    {
      id: "22125696",
      name: "HAMBURGUESA HALAL VACUNO-TERNERA BURGER MEAT 113GX48",
      shortName: "Hamburguesa halal de vacuno",
      pack: "Caja de 48 · 113 g por unidad",
      price: 47.3,
      category: "burgers",
      categoryLabel: "Hamburguesas",
      description: "Hamburguesas halal de vacuno y ternera, congeladas. Caja de 48 unidades de 113 g.",
      image: "22125696.webp",
      href: "/product/22125696/hamburguesa-halal-vacuno-ternera-burger-meat-113gx48.html"
    },
    {
      id: "22128210",
      name: "HAMBURGUESA DE POLLO CRISPY HALAL 5 x 1 KG",
      shortName: "Hamburguesa crispy de pollo",
      pack: "5 x 1 kg · 100 g por unidad",
      price: 40,
      category: "pollo",
      categoryLabel: "Pollo",
      description: "Hamburguesa halal de pollo crispy con cornflakes. Congelada; 100 g por unidad.",
      image: "22128210.webp",
      href: "/product/22128210/hamburguesa-de-pollo-crispy-halal-5-x-1-kg.html"
    },
    {
      id: "23957701",
      name: "CORDÓN BLEU HALAL (5 x 1 KG)",
      shortName: "Cordón bleu halal",
      pack: "5 x 1 kg",
      price: 40,
      category: "pollo",
      categoryLabel: "Pollo",
      description: "Cordón bleu halal, en formato de 5 x 1 kg.",
      image: "23957701.webp",
      href: "/product/23957701/cordon-bleu-halal-5-x-1-kg.html"
    },
    {
      id: "23958186",
      name: "ALITAS POLLO TEX-MÉX HALAL (5 x 1 KG)",
      shortName: "Alitas de pollo Tex-Mex",
      pack: "5 x 1 kg",
      price: 40,
      category: "pollo",
      categoryLabel: "Pollo",
      description: "Alitas de pollo halal Tex-Mex, ligeramente picantes. Formato de 5 x 1 kg.",
      image: "23958186.webp",
      href: "/product/23958186/alitas-pollo-tex-mex-halal-5x1kg.html"
    },
    {
      id: "23958235",
      name: "HALAL FINGERS POLLO AMERICAN CRISPY (5 x 1 KG)",
      shortName: "Fingers de pollo crispy",
      pack: "5 x 1 kg",
      price: 48,
      category: "pollo",
      categoryLabel: "Pollo",
      description: "Fingers de pollo halal American Crispy, en formato de 5 x 1 kg.",
      image: "23958235.webp",
      href: "/product/23958235/halal-fingers-pollo-american-crispy-5x1kg.html"
    },
    {
      id: "23958368",
      name: "HALAL NUGGES POLLO (5 x 1 KG)",
      shortName: "Nuggets de pollo halal",
      pack: "5 x 1 kg",
      price: 35,
      category: "pollo",
      categoryLabel: "Pollo",
      description: "Nuggets de pollo halal crujientes con cornflakes. Formato de 5 x 1 kg.",
      image: "23958368.webp",
      href: "/product/23958368/halal-nugges-pollo-5x1kg.html"
    }
  ];

  const money = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
  const page = document.body.dataset.page || "home";
  const currentProduct = products.find((product) => product.id === document.body.dataset.productId);
  const main = document.querySelector("#main-content");
  const toastRegion = document.querySelector("#toast-region");
  let menuOpen = false;
  const requestedCategory = new URLSearchParams(window.location.search).get("categoria");
  let activeFilter = ["charcuteria", "burgers", "pollo"].includes(requestedCategory) ? requestedCategory : "all";
  let searchTerm = "";
  function readList(key) {
    const value = readStored(key, []);
    if (Array.isArray(value)) return value;
    console.error(`Los datos guardados para ${key} no tienen el formato esperado.`);
    showToast("No se pudieron recuperar tus datos guardados en este navegador.");
    return [];
  }

  let cart = readList("halal4u-cart").filter((item) => item && products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0);
  let wishlist = readList("halal4u-wishlist").filter((id) => products.some((product) => product.id === id));

  function fixLocalPaths(root = document.body) {
    root.querySelectorAll('a[href^="/"], img[src^="/"]').forEach((element) => {
      const attribute = element.tagName === "IMG" ? "src" : "href";
      element.setAttribute(attribute, `${appRoot}${element.getAttribute(attribute).replace(/^\/+/, "")}`);
    });
  }

  function readStored(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.error(`No se pudo leer ${key} del almacenamiento local.`, error);
      showToast("No se pudieron recuperar tus datos guardados en este navegador.");
      return fallback;
    }
  }

  function persist(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`No se pudo guardar ${key} en el almacenamiento local.`, error);
      showToast("No se pudo guardar el cambio. Comprueba el almacenamiento de tu navegador.");
      return false;
    }
  }

  function showToast(message) {
    if (!toastRegion) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    toastRegion.append(toast);
    window.setTimeout(() => toast.remove(), 3200);
  }

  function icon(name) {
    const paths = {
      heart: '<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 21l7.6-7.6 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z"/>',
      bag: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>'
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
  }

  function productImage(product) {
    return `/assets/images/${product.image}`;
  }

  function productCard(product) {
    const isSaved = wishlist.includes(product.id);
    return `<article class="product-card reveal">
      <a class="product-card-image" href="${product.href}" aria-label="Ver ${product.shortName}">
        <img src="${productImage(product)}" alt="${product.name}" loading="lazy" width="640" height="640">
        <span class="product-tag">${product.categoryLabel}</span>
      </a>
      <button class="save-button" type="button" data-action="wishlist" data-id="${product.id}" aria-label="${isSaved ? "Quitar de" : "Añadir a"} favoritos: ${product.shortName}" aria-pressed="${isSaved}">${icon("heart")}</button>
      <div class="product-card-body">
        <h3 class="product-card-title"><a href="${product.href}">${product.name}</a></h3>
        <p class="product-pack">${product.pack}</p>
        <div class="product-card-bottom">
          <span class="product-price">${money.format(product.price)}</span>
          <button class="add-button" type="button" data-action="add" data-id="${product.id}" aria-label="Añadir ${product.shortName} al carrito">${icon("plus")}</button>
        </div>
      </div>
    </article>`;
  }

  function shell() {
    const active = page === "home" ? "home" : page === "store" ? "store" : page === "contact" ? "contact" : page === "shipping" ? "shipping" : "";
    return `<a class="skip-link" href="#main-content">Ir al contenido principal</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="wordmark" href="/index.html"><img src="/assets/images/logo-halal4u.webp" alt="logo" fetchpriority="high" width="auto" height="96"></a>
          <nav class="main-nav${menuOpen ? " is-open" : ""}" id="main-nav" aria-label="Navegación principal">
            <a href="/index.html"${active === "home" ? ' aria-current="page"' : ""}>Inicio</a>
            <a href="/store.html"${active === "store" ? ' aria-current="page"' : ""}>Tienda</a>
            <a href="/envio-y-devoluciones.html"${active === "shipping" ? ' aria-current="page"' : ""}>Envíos</a>
            <a href="/contacto.html"${active === "contact" ? ' aria-current="page"' : ""}>Contacto</a>
          </nav>
          <div class="header-actions">
            <a class="icon-link" data-nav="wishlist" href="/wishlist.html" aria-label="Favoritos, ${wishlist.length} productos">${icon("heart")}<span>Favoritos</span><span class="count" data-count="wishlist">${wishlist.length}</span></a>
            <a class="icon-link" data-nav="cart" href="/cart.html" aria-label="Carrito, ${cart.reduce((sum, item) => sum + item.quantity, 0)} productos">${icon("bag")}<span>Carrito</span><span class="count" data-count="cart">${cart.reduce((sum, item) => sum + item.quantity, 0)}</span></a>
            <button class="menu-toggle" type="button" aria-label="${menuOpen ? "Cerrar" : "Abrir"} menú" aria-controls="main-nav" aria-expanded="${menuOpen}">${icon(menuOpen ? "close" : "menu")}</button>
          </div>
        </div>
      </header>
      <div class="announcement"><strong>Envío gratis desde 250 €</strong><span aria-hidden="true">·</span> España y Portugal</div>`;
  }

  function footer() {
    return `<footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="wordmark" href="/index.html"><img src="/assets/images/logo-halal4u.webp" alt="logo" fetchpriority="high" width="auto" height="120" style="filter: invert(.55);"></a>
            <p>Una empresa familiar dedicada a acercarte productos halal de calidad, online y desde nuestro almacén físico.</p>
          </div>
          <div class="footer-col">
            <h2>Explora</h2>
            <a href="/store.html">Tienda</a>
            <a href="/envio-y-devoluciones.html">Envíos y devoluciones</a>
            <a href="/wishlist.html">Favoritos</a>
            <a href="/cart.html">Carrito</a>
          </div>
          <div class="footer-col">
            <h2>Estamos cerca</h2>
            <a href="/contacto.html">Contacto</a>
            <a href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">WhatsApp · +34 634 432 424</a>
            <a href="https://maps.google.com/?q=Calle+Jer%C3%B3nimo+de+Val%C3%A8ncia+18%2C+Badajoz" target="_blank" rel="noopener noreferrer">Badajoz, España</a>
          </div>
        </div>
        <div class="footer-bottom"><span>© ${new Date().getFullYear()} Halal4u</span><span>Una tienda familiar, con atención cercana.</span></div>
      </div>
    </footer>`;
  }

  function homePage() {
    const featured = products.slice(0, 4);
    const categories = [
      { id: "charcuteria", title: "Charcutería", description: "Pavo, salami y pepperoni.", product: products[0] },
      { id: "burgers", title: "Hamburguesas", description: "Vacuno y pollo crispy.", product: products[4] },
      { id: "pollo", title: "Especialidades de pollo", description: "Alitas, fingers, nuggets y más.", product: products[5] }
    ];
    return `<main class="main-content" id="main-content">
      <section class="hero" aria-labelledby="home-heading">
        <div class="hero-main">
          <div class="hero-copy">
            <span class="eyebrow">Halal4u · Tienda online</span>
            <h1 id="home-heading">Buenos alimentos.<br><span>Con confianza halal.</span></h1>
            <p>Charcutería y especialidades congeladas halal, para llevar algo bueno a tu mesa.</p>
            <div class="hero-actions">
              <a class="button button-light" href="/store.html">Ver productos <span aria-hidden="true">→</span></a>
              <a class="button button-secondary" href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">Contactar por WhatsApp</a>
            </div>
            <p class="hero-note">Una empresa familiar · Atención desde Badajoz</p>
          </div>
          <div class="hero-media">
            <img src="/assets/images/hero-food.webp" alt="Fiambre halal de pavo servido con verduras frescas" fetchpriority="high" width="1400" height="933">
          </div>
        </div>
      </section>
      <section class="trust-strip" aria-label="Información de compra">
        <div class="container trust-inner">
          <div class="trust-item"><span class="trust-symbol">01</span><span><strong>Envío gratis</strong>En pedidos superiores a 250 €</span></div>
          <div class="trust-item"><span class="trust-symbol">02</span><span><strong>España y Portugal</strong>Entrega estimada: 3–5 días laborables</span></div>
          <div class="trust-item"><span class="trust-symbol">03</span><span><strong>Atención directa</strong>Estamos en Badajoz</span></div>
        </div>
      </section>
      <section class="section" id="seleccion" aria-labelledby="selection-heading">
        <div class="container">
          <div class="section-heading">
            <div><span class="eyebrow">La selección Halal4u</span><h2 id="selection-heading">Productos destacados</h2></div>
            <a class="text-link" href="/store.html">Ver toda la tienda <span aria-hidden="true">→</span></a>
          </div>
          <div class="product-grid">${featured.map(productCard).join("")}</div>
        </div>
      </section>
      <section class="category-section" aria-labelledby="category-heading">
        <div class="container">
          <div class="section-heading"><div><span class="eyebrow">Encuentra lo que buscas</span><h2 id="category-heading">Explora por categoría</h2></div></div>
          <div class="category-grid">${categories.map((category) => `<a class="category-card" href="/store.html?categoria=${category.id}#catalogo">
            <div><h3>${category.title}</h3><p>${category.description}</p><span class="category-link">Ver selección →</span></div>
            <img src="${productImage(category.product)}" alt="" loading="lazy" width="112" height="100">
          </a>`).join("")}</div>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="about-heading">
        <div class="container editorial-grid">
          <div class="editorial-copy">
            <span class="eyebrow">Sobre Halal4u</span>
            <h2 id="about-heading">Una empresa familiar. Una atención cercana.</h2>
            <p>Todo comenzó con la pasión por ofrecer productos halal de calidad, tanto online como desde nuestro almacén físico. Como empresa familiar, cuidamos la atención personalizada y cada detalle.</p>
            <p>Trabajamos con calidad, integridad y respeto por la tradición halal.</p>
            <a class="text-link" href="/contacto.html">Conoce nuestro equipo y contacta →</a>
          </div>
          <div>
            <div class="editorial-image"><img src="/assets/images/halal-guarantee.png" alt="Sello de garantía halal de Junta Islámica" loading="lazy" width="800" height="300"></div>
            <div class="editorial-links" aria-label="Información para tu pedido">
              <a href="/envio-y-devoluciones.html">Plazos, envíos y devoluciones <span aria-hidden="true">→</span></a>
              <a href="/contacto.html">Visítanos en Badajoz <span aria-hidden="true">→</span></a>
              <a href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">Consulta tu pedido por WhatsApp <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>
    </main>`;
  }

  function storePage() {
    return `<main class="main-content" id="main-content">
      <section class="page-hero"><div class="container"><span class="eyebrow">La selección Halal4u</span><h1>La tienda</h1><p>Charcutería, hamburguesas y especialidades de pollo halal. Consulta los formatos y precios publicados; la disponibilidad se confirma al realizar tu pedido.</p></div></section>
      <section class="page-content" id="catalogo"><div class="container">
        <div class="catalog-toolbar">
          <div class="filter-list" role="group" aria-label="Filtrar productos">
            <button class="filter-button" type="button" data-filter="all" aria-pressed="${activeFilter === "all"}">Todo</button>
            <button class="filter-button" type="button" data-filter="charcuteria" aria-pressed="${activeFilter === "charcuteria"}">Charcutería</button>
            <button class="filter-button" type="button" data-filter="burgers" aria-pressed="${activeFilter === "burgers"}">Hamburguesas</button>
            <button class="filter-button" type="button" data-filter="pollo" aria-pressed="${activeFilter === "pollo"}">Pollo</button>
          </div>
          <label class="search-field">${icon("search")}<input type="search" id="product-search" placeholder="Buscar en la tienda" aria-label="Buscar productos"></label>
        </div>
        <p class="form-hint" id="product-count" aria-live="polite"></p>
        <h2 class="visually-hidden">Productos Halal4u</h2>
        <div class="product-grid" id="catalog-grid"></div>
      </div></section>
    </main>`;
  }

  function contactPage() {
    return `<main class="main-content" id="main-content">
      <section class="page-hero"><div class="container"><span class="eyebrow">Estamos para ayudarte</span><h1>Una conversación<br>lo cambia todo.</h1><p>Cuéntanos qué necesitas. Puedes escribirnos aquí o contactar directamente por WhatsApp.</p></div></section>
      <section class="page-content"><div class="container contact-layout">
        <div>
          <h2 class="serif" style="font-size:29px">Escríbenos</h2>
          <form class="contact-form" id="contact-form">
            <div class="field"><label for="contact-name">Nombre <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autocomplete="name" required maxlength="100"></div>
            <div class="field"><label for="contact-email">Correo electrónico <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="180"></div>
            <div class="field"><label for="contact-message">Mensaje <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" required maxlength="1500"></textarea></div>
            <div class="honeypot" aria-hidden="true"><label for="website">Dejar este campo vacío</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>
            <button class="button" type="submit">Preparar mensaje en WhatsApp <span aria-hidden="true">↗</span></button>
            <p class="form-hint">Se abrirá WhatsApp con tu mensaje preparado para que puedas enviarlo.</p>
            <p class="form-status" id="contact-status" role="status" aria-live="polite"></p>
          </form>
        </div>
        <aside class="contact-card">
          <h2>Visítanos o llámanos</h2>
          <div class="contact-block"><span class="contact-label">Dirección</span><p>HALAL4U<br>Calle Jerónimo de València, 18<br>Pol. Ind. El Nevero – Mercabadajoz<br>06006 Badajoz, España</p></div>
          <div class="contact-block"><span class="contact-label">Teléfono y WhatsApp</span><a href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">+34 634 432 424</a></div>
          <div class="contact-block"><span class="contact-label">Horario</span><p>Lunes a viernes<br>9:00–17:00</p></div>
          <div class="contact-block"><span class="contact-label">Cómo llegar</span><a href="https://maps.google.com/?q=Calle+Jer%C3%B3nimo+de+Val%C3%A8ncia+18%2C+Badajoz" target="_blank" rel="noopener noreferrer">Abrir ubicación en Maps ↗</a></div>
        </aside>
      </div></section>
    </main>`;
  }

  function shippingPage() {
    return `<main class="main-content" id="main-content">
      <section class="page-hero"><div class="container"><span class="eyebrow">Información útil</span><h1>Envíos y devoluciones</h1><p>Información clara para que sepas qué esperar al hacer tu pedido.</p></div></section>
      <section class="page-content"><div class="container policy-copy">
        <h2>Envío</h2>
        <p>El plazo estimado de entrega es de <strong>3 a 5 días laborables</strong>. La tienda anuncia envío gratis en pedidos superiores a 250 €.</p>
        <p>Para confirmar la disponibilidad, el destino y los detalles de tu pedido, ponte en contacto con nosotros antes de realizarlo.</p>
        <h2>Devoluciones y reclamaciones</h2>
        <p>Las reclamaciones o devoluciones deben comunicarse dentro de los 7 días siguientes a la recepción de la mercancía.</p>
        <p>No se admitirán devoluciones si un producto refrigerado o congelado no se ha conservado adecuadamente o se ha roto la cadena de frío.</p>
        <h2>Costes de devolución</h2>
        <p>Los costes de devolución dependerán de qué parte sea responsable de la incidencia. Nos esforzamos por tratar cada situación de forma justa y transparente.</p>
        <div class="callout">¿Tienes una pregunta sobre tu pedido? <a class="text-link" href="/contacto.html">Contacta con Halal4u</a> o llámanos al +34 634 432 424.</div>
      </div></section>
    </main>`;
  }

  function productPage() {
    if (!currentProduct) return notFoundPage();
    document.title = `${currentProduct.shortName} · Halal4u`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${currentProduct.name}. ${currentProduct.description} ${money.format(currentProduct.price)}.`;
    const image = document.querySelector('meta[property="og:image"]');
    if (image) image.content = `https://www.halal4u.es${productImage(currentProduct)}`;
    return `<main class="main-content" id="main-content">
      <section class="page-content"><div class="container">
        <nav class="breadcrumb" aria-label="Migas de pan"><a href="/index.html">Inicio</a><span aria-hidden="true">/</span><a href="/store.html">Tienda</a><span aria-hidden="true">/</span><span>${currentProduct.shortName}</span></nav>
        <div class="product-detail">
          <div class="product-detail-image"><img src="${productImage(currentProduct)}" alt="${currentProduct.name}" fetchpriority="high" width="640" height="640"></div>
          <div class="product-detail-copy">
            <span class="eyebrow">${currentProduct.categoryLabel}</span>
            <h1>${currentProduct.name}</h1>
            <p class="detail-price">${money.format(currentProduct.price)}</p>
            <p class="availability-note">Disponibilidad a confirmar. Escríbenos para consultar tu pedido y los detalles del envío.</p>
            <p class="detail-description">${currentProduct.description}</p>
            <div class="buy-row">
              <label class="visually-hidden" for="product-quantity">Cantidad</label>
              <input class="quantity-input" id="product-quantity" type="number" min="1" max="99" value="1" inputmode="numeric" aria-label="Cantidad">
              <button class="button" type="button" data-action="add" data-id="${currentProduct.id}">Añadir al carrito</button>
              <button class="button button-secondary" type="button" data-action="wishlist" data-id="${currentProduct.id}" aria-pressed="${wishlist.includes(currentProduct.id)}">${wishlist.includes(currentProduct.id) ? "Guardado en favoritos" : "Guardar favorito"} ${icon("heart")}</button>
            </div>
            <ul class="product-details-list">
              <li>Formato: ${currentProduct.pack}</li>
              <li>Pedido y disponibilidad: consúltanos directamente</li>
              <li>Envío gratis en pedidos superiores a 250 €</li>
            </ul>
          </div>
        </div>
      </div></section>
    </main>`;
  }

  function cartPage() {
    return `<main class="main-content" id="main-content">
      <section class="page-hero"><div class="container"><span class="eyebrow">Tu selección</span><h1>Tu carrito</h1><p>Revisa los productos y cantidades. Confirmaremos disponibilidad y envío contigo por WhatsApp.</p></div></section>
      <section class="page-content"><div class="container" id="cart-content"></div></section>
    </main>`;
  }

  function wishlistPage() {
    return `<main class="main-content" id="main-content">
      <section class="page-hero"><div class="container"><span class="eyebrow">Para más tarde</span><h1>Tus favoritos</h1><p>Guarda aquí los productos que quieres volver a encontrar.</p></div></section>
      <section class="page-content"><div class="container"><h2 class="visually-hidden">Productos favoritos</h2><div class="product-grid" id="wishlist-grid"></div></div></section>
    </main>`;
  }

  function accountPage() {
    return `<main class="main-content" id="main-content">
      <section class="page-hero"><div class="container"><span class="eyebrow">Atención cercana</span><h1>¿Necesitas ayuda<br>con un pedido?</h1><p>El acceso a cuentas de cliente no está disponible en esta versión de la tienda. Escríbenos y te ayudaremos directamente.</p><a class="button" href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">Contactar por WhatsApp ↗</a></div></section>
      <section class="page-content"><div class="container"><a class="text-link" href="/store.html">Seguir explorando la tienda →</a></div></section>
    </main>`;
  }

  function notFoundPage() {
    return `<main class="main-content" id="main-content"><section class="page-hero"><div class="container"><span class="eyebrow">No encontramos esa página</span><h1>Sigamos por aquí.</h1><p>Vuelve a la tienda para descubrir nuestros productos.</p><a class="button" href="/store.html">Ir a la tienda</a></div></section></main>`;
  }

  function totalItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function cartTotal() {
    return cart.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function updateCounts() {
    document.querySelectorAll('[data-count="cart"]').forEach((node) => { node.textContent = totalItems(); });
    document.querySelectorAll('[data-count="wishlist"]').forEach((node) => { node.textContent = wishlist.length; });
    const cartLink = document.querySelector('[data-nav="cart"]');
    const wishlistLink = document.querySelector('[data-nav="wishlist"]');
    if (cartLink) cartLink.setAttribute("aria-label", `Carrito, ${totalItems()} productos`);
    if (wishlistLink) wishlistLink.setAttribute("aria-label", `Favoritos, ${wishlist.length} productos`);
  }

  function setCart(nextCart) {
    cart = nextCart.filter((item) => products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0);
    persist("halal4u-cart", cart);
    updateCounts();
    if (page === "cart") renderCart();
  }

  function setWishlist(nextWishlist) {
    wishlist = [...new Set(nextWishlist.filter((id) => products.some((product) => product.id === id)))];
    persist("halal4u-wishlist", wishlist);
    updateCounts();
    refreshProductCards();
    if (page === "wishlist") renderWishlist();
    if (page === "product" && currentProduct) {
      const button = document.querySelector('[data-action="wishlist"]');
      if (button) {
        const saved = wishlist.includes(currentProduct.id);
        button.setAttribute("aria-pressed", String(saved));
        button.innerHTML = `${saved ? "Guardado en favoritos" : "Guardar favorito"} ${icon("heart")}`;
      }
    }
  }

  function addToCart(id, quantity = 1) {
    const amount = Math.max(1, Math.min(99, Number.parseInt(quantity, 10) || 1));
    const existing = cart.find((item) => item.id === id);
    const next = existing
      ? cart.map((item) => item.id === id ? { ...item, quantity: Math.min(99, item.quantity + amount) } : item)
      : [...cart, { id, quantity: amount }];
    setCart(next);
    showToast(`${products.find((product) => product.id === id)?.shortName || "Producto"} añadido al carrito.`);
  }

  function toggleWishlist(id) {
    const saved = wishlist.includes(id);
    setWishlist(saved ? wishlist.filter((item) => item !== id) : [...wishlist, id]);
    showToast(saved ? "Producto quitado de favoritos." : "Producto guardado en favoritos.");
  }

  function refreshProductCards() {
    if (page === "store") renderCatalog();
    if (page === "home") {
      const featured = document.querySelector(".product-grid");
      if (featured) {
        featured.innerHTML = products.slice(0, 4).map(productCard).join("");
        fixLocalPaths(featured);
      }
    }
  }

  function renderCatalog() {
    const grid = document.querySelector("#catalog-grid");
    if (!grid) return;
    const filtered = products.filter((product) => {
      const matchesCategory = activeFilter === "all" || product.category === activeFilter;
      const search = `${product.name} ${product.shortName} ${product.categoryLabel} ${product.pack}`.toLocaleLowerCase("es");
      return matchesCategory && search.includes(searchTerm.toLocaleLowerCase("es"));
    });
    grid.innerHTML = filtered.length ? filtered.map(productCard).join("") : `<div class="empty-state"><h2>No encontramos productos</h2><p>Prueba con otra búsqueda o categoría.</p></div>`;
    const count = document.querySelector("#product-count");
    if (count) count.textContent = `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;
    fixLocalPaths(grid);
    observeReveals();
  }

  function renderCart() {
    const content = document.querySelector("#cart-content");
    if (!content) return;
    const rows = cart.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) return "";
      return `<article class="cart-row">
        <a class="cart-row-image" href="${product.href}"><img src="${productImage(product)}" alt="" loading="lazy" width="100" height="90"></a>
        <div><h3><a href="${product.href}" style="text-decoration:none">${product.name}</a></h3><p>${product.pack} · ${money.format(product.price)}</p>
          <div class="cart-controls"><label class="visually-hidden" for="quantity-${product.id}">Cantidad de ${product.shortName}</label><input id="quantity-${product.id}" type="number" min="1" max="99" value="${item.quantity}" data-action="quantity" data-id="${product.id}" aria-label="Cantidad de ${product.shortName}"><button class="remove-button" type="button" data-action="remove" data-id="${product.id}">Quitar</button></div>
        </div><span class="cart-row-total">${money.format(product.price * item.quantity)}</span>
      </article>`;
    }).join("");
    if (!cart.length) {
      content.innerHTML = `<div class="empty-state"><h2>Tu carrito está esperando.</h2><p>Descubre la selección de Halal4u y añade lo que te apetezca.</p><a class="button" href="/store.html">Explorar la tienda</a></div>`;
      fixLocalPaths(content);
      return;
    }
    const total = cartTotal();
    const freeDeliveryMinimum = freeDeliveryLimit + 0.01;
    const freeDeliveryReached = total > freeDeliveryLimit;
    const remaining = freeDeliveryReached ? 0 : Math.max(0, Math.round((freeDeliveryMinimum - total) * 100) / 100);
    const progress = Math.min(100, total / freeDeliveryMinimum * 100);
    content.innerHTML = `<div class="cart-layout"><div class="cart-list"><h2 class="visually-hidden">Productos en tu carrito</h2>${rows}</div>
      <aside class="cart-summary"><h2>Resumen</h2>
        <div class="summary-line"><span>Subtotal</span><strong>${money.format(total)}</strong></div>
        <div class="shipping-progress">${freeDeliveryReached ? "¡Has alcanzado el envío gratis!" : `Añade ${money.format(remaining)} para alcanzar el envío gratis.`}</div>
        <div class="progress-track" role="progressbar" aria-label="Progreso hacia el envío gratis" aria-valuemin="0" aria-valuemax="${freeDeliveryMinimum}" aria-valuenow="${Math.min(total, freeDeliveryMinimum)}"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="summary-line"><span>Envío</span><strong>A confirmar</strong></div>
        <div class="summary-line summary-total"><span>Total de productos</span><strong>${money.format(total)}</strong></div>
        <button class="button" type="button" data-action="checkout">Consultar pedido por WhatsApp ↗</button>
        <p class="form-hint">Disponibilidad, envío y pago se confirman directamente con Halal4u.</p>
      </aside></div>`;
    fixLocalPaths(content);
  }

  function renderWishlist() {
    const grid = document.querySelector("#wishlist-grid");
    if (!grid) return;
    const saved = products.filter((product) => wishlist.includes(product.id));
    grid.innerHTML = saved.length ? saved.map(productCard).join("") : `<div class="empty-state"><h2>Aún no has guardado favoritos.</h2><p>Guarda los productos que te interesen para tenerlos a mano.</p><a class="button" href="/store.html">Descubrir productos</a></div>`;
    fixLocalPaths(grid);
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
  }

  function checkout() {
    if (!cart.length) return;
    const lines = cart.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return product ? `- ${product.name} x ${item.quantity} (${money.format(product.price * item.quantity)})` : "";
    }).filter(Boolean);
    const message = `Hola, quiero consultar este pedido de Halal4u:\n${lines.join("\n")}\nSubtotal de productos: ${money.format(cartTotal())}\n\n¿Podéis confirmar disponibilidad, envío y formas de pago?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function bindInteractions() {
    document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
      menuOpen = !menuOpen;
      const button = event.currentTarget;
      const nav = document.querySelector("#main-nav");
      button.setAttribute("aria-expanded", String(menuOpen));
      button.setAttribute("aria-label", `${menuOpen ? "Cerrar" : "Abrir"} menú`);
      button.innerHTML = icon(menuOpen ? "close" : "menu");
      nav.classList.toggle("is-open", menuOpen);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !menuOpen) return;
      menuOpen = false;
      const button = document.querySelector(".menu-toggle");
      button?.setAttribute("aria-expanded", "false");
      button?.setAttribute("aria-label", "Abrir menú");
      if (button) button.innerHTML = icon("menu");
      document.querySelector("#main-nav")?.classList.remove("is-open");
      button?.focus();
    });

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const { action, id } = button.dataset;
      if (action === "add") {
        const quantityInput = document.querySelector("#product-quantity");
        addToCart(id, quantityInput?.value || 1);
      } else if (action === "wishlist") {
        toggleWishlist(id);
      } else if (action === "remove") {
        setCart(cart.filter((item) => item.id !== id));
      } else if (action === "checkout") {
        checkout();
      }
    });

    document.addEventListener("change", (event) => {
      const input = event.target.closest('[data-action="quantity"]');
      if (!input) return;
      const quantity = Number.parseInt(input.value, 10);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        showToast("Elige una cantidad entre 1 y 99.");
        renderCart();
        return;
      }
      setCart(cart.map((item) => item.id === input.dataset.id ? { ...item, quantity } : item));
    });

    document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      renderCatalog();
    }));

    document.querySelector("#product-search")?.addEventListener("input", (event) => {
      searchTerm = event.currentTarget.value.trim();
      renderCatalog();
    });

    document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.elements.website.value) return;
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const message = `Hola, soy ${data.get("name")} (${data.get("email")}).\n\n${data.get("message")}`;
      const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      const opened = window.open(link, "_blank");
      const status = document.querySelector("#contact-status");
      if (status) {
        if (opened) {
          opened.opener = null;
          status.textContent = "WhatsApp se ha abierto con tu mensaje. Envíalo desde allí para que podamos atenderte.";
        } else {
          status.innerHTML = `Tu mensaje está preparado. <a href="${link}" target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>`;
        }
      }
    });
  }

  if (main) {
    main.outerHTML = page === "home" ? homePage()
      : page === "store" ? storePage()
        : page === "contact" ? contactPage()
          : page === "shipping" ? shippingPage()
            : page === "product" ? productPage()
              : page === "cart" ? cartPage()
                : page === "wishlist" ? wishlistPage()
                  : page === "account" ? accountPage()
                    : notFoundPage();
    const placeholderHeader = document.querySelector(".site-header");
    placeholderHeader?.insertAdjacentHTML("beforebegin", shell());
    placeholderHeader?.remove();
    document.querySelector(".site-footer")?.remove();
    document.body.insertAdjacentHTML("beforeend", footer());
    fixLocalPaths();
  }

  bindInteractions();
  updateCounts();
  if (page === "store") renderCatalog();
  if (page === "cart") renderCart();
  if (page === "wishlist") renderWishlist();
  observeReveals();
})();
