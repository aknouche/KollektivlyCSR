export interface Project {
  id: string; // UUID from Supabase
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
  imageUrl?: string;
  start_date?: string | null;
  end_date?: string | null;
}