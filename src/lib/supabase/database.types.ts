// TypeScript types for Supabase Database
// Generated from schema, kept in sync with migrations

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          organization_name: string
          organization_number: string | null
          email: string
          email_verified: boolean
          contact_person: string
          phone_number: string | null
          website: string | null
          city: string
          address: string | null
          description: string | null
          gdpr_consent: boolean
          consent_date: string | null
          status: 'PENDING' | 'VERIFIED' | 'APPROVED' | 'SUSPENDED' | 'REJECTED'
          auth_user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          organization_name: string
          organization_number?: string | null
          email: string
          email_verified?: boolean
          contact_person: string
          phone_number?: string | null
          website?: string | null
          city: string
          address?: string | null
          description?: string | null
          gdpr_consent?: boolean
          consent_date?: string | null
          status?: 'PENDING' | 'VERIFIED' | 'APPROVED' | 'SUSPENDED' | 'REJECTED'
          auth_user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          organization_name?: string
          organization_number?: string | null
          email?: string
          email_verified?: boolean
          contact_person?: string
          phone_number?: string | null
          website?: string | null
          city?: string
          address?: string | null
          description?: string | null
          gdpr_consent?: boolean
          consent_date?: string | null
          status?: 'PENDING' | 'VERIFIED' | 'APPROVED' | 'SUSPENDED' | 'REJECTED'
          auth_user_id?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          organization_id: string
          projektnamn: string
          kort_beskrivning: string
          full_beskrivning: string
          stad: string
          budget: string
          csr_kategori: string
          fn_mal: string[]
          image_url: string | null
          badges: string[]
          view_count: number
          contact_count: number
          moderation_score: number | null
          moderation_flags: string[]
          status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'FLAGGED' | 'REJECTED' | 'ARCHIVED'
          published_at: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          review_notes: string | null
          start_date: string | null
          end_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          organization_id: string
          projektnamn: string
          kort_beskrivning: string
          full_beskrivning: string
          stad: string
          budget: string
          csr_kategori: string
          fn_mal: string[]
          image_url?: string | null
          badges?: string[]
          view_count?: number
          contact_count?: number
          moderation_score?: number | null
          moderation_flags?: string[]
          status?: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'FLAGGED' | 'REJECTED' | 'ARCHIVED'
          published_at?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          review_notes?: string | null
          start_date?: string | null
          end_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          organization_id?: string
          projektnamn?: string
          kort_beskrivning?: string
          full_beskrivning?: string
          stad?: string
          budget?: string
          csr_kategori?: string
          fn_mal?: string[]
          image_url?: string | null
          badges?: string[]
          view_count?: number
          contact_count?: number
          moderation_score?: number | null
          moderation_flags?: string[]
          status?: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'FLAGGED' | 'REJECTED' | 'ARCHIVED'
          published_at?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          review_notes?: string | null
          start_date?: string | null
          end_date?: string | null
        }
      }
      verification_tokens: {
        Row: {
          id: string
          created_at: string
          token: string
          type: 'EMAIL_VERIFICATION' | 'MAGIC_LINK' | 'PASSWORD_RESET'
          expires_at: string
          used: boolean
          used_at: string | null
          organization_id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          token: string
          type: 'EMAIL_VERIFICATION' | 'MAGIC_LINK' | 'PASSWORD_RESET'
          expires_at: string
          used?: boolean
          used_at?: string | null
          organization_id: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          token?: string
          type?: 'EMAIL_VERIFICATION' | 'MAGIC_LINK' | 'PASSWORD_RESET'
          expires_at?: string
          used?: boolean
          used_at?: string | null
          organization_id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          project_id: string
          organization_id: string
          company_name: string
          company_email: string
          contact_person: string
          phone_number: string | null
          message: string
          moderation_score: number | null
          moderation_passed: boolean
          status: 'PENDING' | 'SENT' | 'READ' | 'REPLIED' | 'BLOCKED'
          sent_at: string | null
          read_at: string | null
          sender_ip: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          project_id: string
          organization_id: string
          company_name: string
          company_email: string
          contact_person: string
          phone_number?: string | null
          message: string
          moderation_score?: number | null
          moderation_passed?: boolean
          status?: 'PENDING' | 'SENT' | 'READ' | 'REPLIED' | 'BLOCKED'
          sent_at?: string | null
          read_at?: string | null
          sender_ip?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          project_id?: string
          organization_id?: string
          company_name?: string
          company_email?: string
          contact_person?: string
          phone_number?: string | null
          message?: string
          moderation_score?: number | null
          moderation_passed?: boolean
          status?: 'PENDING' | 'SENT' | 'READ' | 'REPLIED' | 'BLOCKED'
          sent_at?: string | null
          read_at?: string | null
          sender_ip?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          created_at: string
          action: string
          entity_type: string
          entity_id: string
          admin_email: string
          admin_ip: string | null
          old_value: string | null
          new_value: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          action: string
          entity_type: string
          entity_id: string
          admin_email: string
          admin_ip?: string | null
          old_value?: string | null
          new_value?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          action?: string
          entity_type?: string
          entity_id?: string
          admin_email?: string
          admin_ip?: string | null
          old_value?: string | null
          new_value?: string | null
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_project_view_count: {
        Args: {
          project_uuid: string
        }
        Returns: void
      }
    }
    Enums: {
      organization_status: 'PENDING' | 'VERIFIED' | 'APPROVED' | 'SUSPENDED' | 'REJECTED'
      project_status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'FLAGGED' | 'REJECTED' | 'ARCHIVED'
      token_type: 'EMAIL_VERIFICATION' | 'MAGIC_LINK' | 'PASSWORD_RESET'
      message_status: 'PENDING' | 'SENT' | 'READ' | 'REPLIED' | 'BLOCKED'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
