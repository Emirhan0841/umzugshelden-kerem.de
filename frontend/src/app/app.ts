import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  mobileMenuOpen = false;
  impressumOpen = false;
  datenschutzOpen = false;
  cookieVisible = false;
  formMsgVisible = false;
  mailtoLink = '';
  year = new Date().getFullYear();

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('cookieConsent');
    this.cookieVisible = !stored;
    this.syncBodyScroll();
  }

  handleAnchorClick(event: Event): void {
    const target = event.target as HTMLElement | null;
    const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    const anchor = document.querySelector(hash);
    if (!anchor) return;
    event.preventDefault();
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', hash);
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  openImpressum(): void {
    this.impressumOpen = true;
    this.syncBodyScroll();
  }

  closeImpressum(): void {
    this.impressumOpen = false;
    this.syncBodyScroll();
  }

  openDatenschutz(): void {
    this.datenschutzOpen = true;
    this.syncBodyScroll();
  }

  closeDatenschutz(): void {
    this.datenschutzOpen = false;
    this.syncBodyScroll();
  }

  acceptCookies(): void {
    localStorage.setItem('cookieConsent', 'accepted');
    this.cookieVisible = false;
    this.syncBodyScroll();
  }

  declineCookies(): void {
    localStorage.setItem('cookieConsent', 'necessary');
    this.cookieVisible = false;
    this.syncBodyScroll();
  }

  prepareEmail(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement | null;
    if (!form) return;

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const from = (data.get('from') || '').toString().trim();
    const to = (data.get('to') || '').toString().trim();
    const date = (data.get('date') || '').toString().trim();
    const service = (data.get('service') || '').toString().trim();
    const details = (data.get('details') || '').toString().trim();

    const subject = `Anfrage: ${service || 'Umzug/Transport'} - ${name || ''}`.trim();
    const body = [
      'Hallo Umzugshelden,',
      '',
      'ich moechte ein Angebot anfragen.',
      '',
      `Name: ${name || '-'}`,
      `Telefon: ${phone || '-'}`,
      `E-Mail: ${email || '-'}`,
      '',
      `Von: ${from || '-'}`,
      `Nach: ${to || '-'}`,
      `Wunschtermin: ${date || '-'}`,
      '',
      `Leistung: ${service || '-'}`,
      'Details:',
      `${details || '-'}`,
      '',
      'Viele Gruesse',
      `${name || ''}`
    ].join('\n');

    const mailto = `mailto:info@umzugshelden-kerem.de?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    this.mailtoLink = mailto;
    this.formMsgVisible = true;
    setTimeout(() => {
      document.getElementById('formMsg')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 0);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    if (this.impressumOpen) {
      this.closeImpressum();
    }
    if (this.datenschutzOpen) {
      this.closeDatenschutz();
    }
  }

  private syncBodyScroll(): void {
    const lock = this.impressumOpen || this.datenschutzOpen || this.cookieVisible;
    if (lock) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }
}
