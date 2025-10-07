// Validation schemas using Zod
// SECURITY: See SECURITY_ANALYSIS.md Section 3.1 - Input validation

import { z } from 'zod';

// Organization registration schema
export const organizationRegistrationSchema = z.object({
  organizationName: z
    .string()
    .min(2, 'Organisationsnamn måste vara minst 2 tecken')
    .max(200, 'Organisationsnamn får vara max 200 tecken')
    .trim(),

  organizationNumber: z
    .string()
    .regex(/^\d{6}-?\d{4}$/, 'Organisationsnummer måste vara format XXXXXX-XXXX')
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .email('Ogiltig e-postadress')
    .max(255, 'E-postadress får vara max 255 tecken')
    .toLowerCase()
    .trim(),

  contactPerson: z
    .string()
    .min(2, 'Kontaktperson måste vara minst 2 tecken')
    .max(100, 'Kontaktperson får vara max 100 tecken')
    .trim(),

  phoneNumber: z
    .string()
    .regex(/^(\+46|0)[0-9]{7,13}$/, 'Ogiltigt telefonnummer (använd svenskt format)')
    .optional()
    .or(z.literal('')),

  website: z
    .string()
    .url('Ogiltig webbadress')
    .max(500, 'Webbadress får vara max 500 tecken')
    .optional()
    .or(z.literal('')),

  city: z
    .string()
    .min(2, 'Stad måste vara minst 2 tecken')
    .max(100, 'Stad får vara max 100 tecken')
    .trim(),

  address: z
    .string()
    .max(200, 'Adress får vara max 200 tecken')
    .optional()
    .or(z.literal('')),

  description: z
    .string()
    .max(2000, 'Beskrivning får vara max 2000 tecken')
    .optional()
    .or(z.literal('')),

  gdprConsent: z
    .boolean()
    .refine((val) => val === true, 'Du måste godkänna villkoren för att fortsätta'),

  captchaToken: z
    .string()
    .min(1, 'Vänligen slutför captcha-verifieringen'),
});

export type OrganizationRegistrationInput = z.infer<typeof organizationRegistrationSchema>;

// Project submission schema
export const projectSubmissionSchema = z.object({
  projektnamn: z
    .string()
    .min(5, 'Projektnamn måste vara minst 5 tecken')
    .max(200, 'Projektnamn får vara max 200 tecken')
    .trim(),

  kortBeskrivning: z
    .string()
    .min(20, 'Kort beskrivning måste vara minst 20 tecken')
    .max(500, 'Kort beskrivning får vara max 500 tecken')
    .trim(),

  fullBeskrivning: z
    .string()
    .min(100, 'Full beskrivning måste vara minst 100 tecken')
    .max(5000, 'Full beskrivning får vara max 5000 tecken')
    .trim(),

  stad: z
    .string()
    .min(2, 'Stad måste vara minst 2 tecken')
    .max(100, 'Stad får vara max 100 tecken')
    .trim(),

  budget: z
    .string()
    .min(1, 'Budget krävs')
    .max(50, 'Budget får vara max 50 tecken')
    .trim(),

  csrKategori: z
    .enum(['Miljö', 'Ungdom', 'Inkludering'], {
      message: 'Välj en giltig kategori',
    }),

  fnMal: z
    .array(z.string())
    .min(1, 'Välj minst ett FN-mål')
    .max(10, 'Välj max 10 FN-mål'),
});

export type ProjectSubmissionInput = z.infer<typeof projectSubmissionSchema>;

// Contact message schema
export const contactMessageSchema = z.object({
  projectId: z
    .string()
    .cuid('Ogiltigt projekt-ID'),

  companyName: z
    .string()
    .min(2, 'Företagsnamn måste vara minst 2 tecken')
    .max(200, 'Företagsnamn får vara max 200 tecken')
    .trim(),

  companyEmail: z
    .string()
    .email('Ogiltig e-postadress')
    .max(255, 'E-postadress får vara max 255 tecken')
    .toLowerCase()
    .trim(),

  contactPerson: z
    .string()
    .min(2, 'Kontaktperson måste vara minst 2 tecken')
    .max(100, 'Kontaktperson får vara max 100 tecken')
    .trim(),

  phoneNumber: z
    .string()
    .regex(/^(\+46|0)[0-9]{7,13}$/, 'Ogiltigt telefonnummer')
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .min(20, 'Meddelande måste vara minst 20 tecken')
    .max(2000, 'Meddelande får vara max 2000 tecken')
    .trim(),

  captchaToken: z
    .string()
    .min(1, 'Vänligen slutför captcha-verifieringen'),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

// Email validation helper
export function isSpamEmail(email: string): boolean {
  const spamDomains = [
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
    'spam4.me',
    'temp-mail.org',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  return spamDomains.includes(domain);
}

// Organization number validation helper
export function isValidSwedishOrgNumber(orgNumber: string): boolean {
  // Remove hyphen if present
  const cleanNumber = orgNumber.replace('-', '');

  // Must be 10 digits
  if (!/^\d{10}$/.test(cleanNumber)) {
    return false;
  }

  // Luhn algorithm check (Swedish org numbers use this)
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(cleanNumber[i]);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(cleanNumber[9]);
}
