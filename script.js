// Fonksyon pou kontwole ouvèti ak fèmti Meni an
function toggleMenu(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('myDropdown');
    if (dropdown) {
        dropdown.classList.toggle('open');
    }
}

function closeMenu() {
    const dropdown = document.getElementById('myDropdown');
    if (dropdown) {
        dropdown.classList.remove('open');
    }
}

// Louvri modal kòmand lan
function openOrderModal(sevis) {
    const modal = document.getElementById('orderModal');
    const modalTitle = document.getElementById('modalTitle');
    const sevisInput = document.getElementById('sevis_chwazi');
    const dateInput = document.getElementById('date_fete');
    const dateHelp = document.getElementById('dateHelp');
    
    if (!modal) return;
    
    modal.style.display = 'flex';
    
    if (sevis === 'patisserie') {
        sevisInput.value = "Gato ak Desè Pwofesyonèl";
        modalTitle.innerText = 'Kòmande Patisri Ekskiz';
    } else if (sevis === 'decor') {
        sevisInput.value = "Dekorasyon ak Atizay Balon";
        modalTitle.innerText = 'Kòmande Sèvis Dekorasyon';
    } else if (sevis === 'traiteur') {
        sevisInput.value = "Sèvis Traiteur / Finger Food";
        modalTitle.innerText = 'Kòmande Sèvis Traiteur';
    } else {
        sevisInput.value = "Kòmand Jeneral / Lòt Sèvis";
        modalTitle.innerText = 'Fè Yon Kòmand';
    }

    // Kalkil otomatik pou dat limit yo
    const jodiya = new Date();
    if (sevis === 'traiteur') {
        const limitMwa = new Date();
        limitMwa.setMonth(jodiya.getMonth() + 1);
        const fomaMinMwa = limitMwa.toISOString().split('T')[0];
        dateInput.min = fomaMinMwa;
        dateInput.value = fomaMinMwa;
        dateHelp.innerText = "📅 Sèvis Traiteur mande 1 mwa davans minimum.";
    } else {
        const limitJou = new Date();
        limitJou.setDate(jodiya.getDate() + 3); 
        const fomaMin = limitJou.toISOString().split('T')[0];
        dateInput.min = fomaMin;
        dateInput.value = fomaMin;
        dateHelp.innerText = "📅 Règleman: 3 a 5 jou davans minimum.";
    }
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) modal.style.display = 'none';
}

// Lè tout paj la fin chaje
document.addEventListener("DOMContentLoaded", function() {
    
    // Branche bouton meni an pou l ka reponn san fòse
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            toggleMenu(e);
        });
    }

    // Tcheke ak valide fòm lan
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nom = document.getElementById('nom').value.trim();
            const telefon = document.getElementById('telefon').value.trim();
            const detay = document.getElementById('detay').value.trim();
            const dateChwazi = document.getElementById('date_fete').value;
            const sevis = document.getElementById('sevis_chwazi').value;

            // Non sèlman ak lèt
            const nonRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
            if (!nonRegex.test(nom)) {
                alert("⚠️ Erè: Non an dwe gen lèt sèlman, li pa ka gen chif.");
                return;
            }

            // Telefòn fòma
            const telRegex = /^\+?[0-9\s\-]{8,15}$/;
            if (!telRegex.test(telefon)) {
                alert("⚠️ Erè: Nimewo telefòn lan pa kòrèk.");
                return;
            }

            const nimewoWhatsApp = "50947339176";
            const tèksMesaj = `Bonjour EUD Pâtisserie & Décor, mwen sot fè yon kòmand sou sit la. Men detay mwen:\n\n` +
                              `• *Nom:* ${nom}\n` +
                              `• *Telefòn:* ${telefon}\n` +
                              `• *Sèvis:* ${sevis}\n` +
                              `• *Dat Evènman:* ${dateChwazi}\n` +
                              `• *Detay:* ${detay}\n\n` +
                              `Tanpri analize kòmand mwen an pou ban mwen pri total la. M pral sou paj peman an pou m fè avans 75% lan.`;

            const urlWhatsApp = `https://wa.me/${nimewoWhatsApp}?text=${encodeURIComponent(tèksMesaj)}`;
            
            window.open(urlWhatsApp, '_blank');
            closeOrderModal();
            
            setTimeout(() => {
                window.location.href = "peman.html";
            }, 1200);
        });
    }
});

// Fèmen eleman yo si moun lan klike nenpòt kote deyò
window.addEventListener('click', function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
    
    const dropdown = document.getElementById('myDropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        closeMenu();
    }
});