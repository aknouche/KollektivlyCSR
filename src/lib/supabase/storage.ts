// Supabase Storage utilities for file uploads
// SECURITY: See SECURITY_ANALYSIS.md Section 6.5, 6.6, 6.7

import { createClient } from './client';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload an image to Supabase Storage
 * SECURITY: Validates file type and size before upload
 */
export async function uploadProjectImage(
  file: File,
  projectId: string
): Promise<UploadResult> {
  // Validate file type (SECURITY: Section 6.5)
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      success: false,
      error: 'Ogiltigt filformat. Endast JPEG, PNG, WebP och GIF är tillåtna.',
    };
  }

  // Validate file size (SECURITY: Section 6.6)
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `Filen är för stor. Maximal storlek är ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    };
  }

  const supabase = createClient();

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${projectId}-${Date.now()}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return {
        success: false,
        error: 'Kunde inte ladda upp bilden. Försök igen.',
      };
    }

    // Get public URL (SECURITY: Section 8.4 - Secure file URLs)
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(data.path);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error('Upload exception:', error);
    return {
      success: false,
      error: 'Ett oväntat fel uppstod vid uppladdning.',
    };
  }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteProjectImage(imageUrl: string): Promise<boolean> {
  const supabase = createClient();

  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts.slice(pathParts.indexOf('project-images') + 1).join('/');

    const { error } = await supabase.storage
      .from('project-images')
      .remove([filePath]);

    if (error) {
      console.error('Storage delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete exception:', error);
    return false;
  }
}

/**
 * Get signed URL for private file access (future use)
 */
export async function getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from('project-images')
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Signed URL error:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Signed URL exception:', error);
    return null;
  }
}
