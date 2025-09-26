export interface Project {
  id: number;
  projektnamn: string;
  kortBeskrivning: string;
  fullBeskrivning: string;
  foreningsnamn: string;
  stad: string;
  budget: string;
  csrKategori: 'Miljö' | 'Ungdom' | 'Inkludering';
  fnMal: string[];
  badges?: Array<'NY' | 'POPULÄR' | 'VERIFIERAD'>;
  viewsLeft?: number;
}