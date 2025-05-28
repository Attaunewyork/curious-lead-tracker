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
      clients: {
        Row: {
          address: string
          city: string
          cpf_cnpj: string
          created_at: string
          email: string
          id: string
          name: string
          observations: string | null
          phone: string
          state: string
          updated_at: string
          zip_code: string
        }
        Insert: {
          address: string
          city: string
          cpf_cnpj: string
          created_at?: string
          email: string
          id?: string
          name: string
          observations?: string | null
          phone: string
          state: string
          updated_at?: string
          zip_code: string
        }
        Update: {
          address?: string
          city?: string
          cpf_cnpj?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          observations?: string | null
          phone?: string
          state?: string
          updated_at?: string
          zip_code?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          address: string
          cpf: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          position: string
          rg: string
          salary: number
          start_date: string
          updated_at: string
        }
        Insert: {
          address: string
          cpf: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          position: string
          rg: string
          salary: number
          start_date: string
          updated_at?: string
        }
        Update: {
          address?: string
          cpf?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          position?: string
          rg?: string
          salary?: number
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          description: string
          expense_date: string
          id: string
          notes: string | null
          property: string | null
          updated_at: string
          vendor: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          description: string
          expense_date: string
          id?: string
          notes?: string | null
          property?: string | null
          updated_at?: string
          vendor?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          description?: string
          expense_date?: string
          id?: string
          notes?: string | null
          property?: string | null
          updated_at?: string
          vendor?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: string
          updated_at: string
          value: number | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          area_m2: number | null
          available: boolean | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string
          description: string | null
          furnished: boolean | null
          id: string
          images: string[] | null
          parking_spaces: number | null
          price: number | null
          property_type: string
          state: string
          title: string
          updated_at: string
          zipcode: string | null
        }
        Insert: {
          address: string
          area_m2?: number | null
          available?: boolean | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string
          description?: string | null
          furnished?: boolean | null
          id?: string
          images?: string[] | null
          parking_spaces?: number | null
          price?: number | null
          property_type?: string
          state: string
          title: string
          updated_at?: string
          zipcode?: string | null
        }
        Update: {
          address?: string
          area_m2?: number | null
          available?: boolean | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string
          description?: string | null
          furnished?: boolean | null
          id?: string
          images?: string[] | null
          parking_spaces?: number | null
          price?: number | null
          property_type?: string
          state?: string
          title?: string
          updated_at?: string
          zipcode?: string | null
        }
        Relationships: []
      }
      rentals: {
        Row: {
          created_at: string
          deposit: number | null
          end_date: string
          id: string
          observations: string | null
          property_address: string
          rent_value: number
          start_date: string
          status: string
          tenant_cpf: string
          tenant_email: string
          tenant_name: string
          tenant_phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deposit?: number | null
          end_date: string
          id?: string
          observations?: string | null
          property_address: string
          rent_value: number
          start_date: string
          status?: string
          tenant_cpf: string
          tenant_email: string
          tenant_name: string
          tenant_phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deposit?: number | null
          end_date?: string
          id?: string
          observations?: string | null
          property_address?: string
          rent_value?: number
          start_date?: string
          status?: string
          tenant_cpf?: string
          tenant_email?: string
          tenant_name?: string
          tenant_phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          category: string
          created_at: string
          description: string
          email: string | null
          id: string
          phone: string
          priority: string
          property_address: string
          requested_by: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          email?: string | null
          id?: string
          phone: string
          priority?: string
          property_address: string
          requested_by: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          email?: string | null
          id?: string
          phone?: string
          priority?: string
          property_address?: string
          requested_by?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          body: Json | null
          created_at: string
          endpoint: string
          headers: Json | null
          id: string
          ip_address: string | null
          method: string
          response_body: Json | null
          response_status: number | null
          user_agent: string | null
        }
        Insert: {
          body?: Json | null
          created_at?: string
          endpoint: string
          headers?: Json | null
          id?: string
          ip_address?: string | null
          method: string
          response_body?: Json | null
          response_status?: number | null
          user_agent?: string | null
        }
        Update: {
          body?: Json | null
          created_at?: string
          endpoint?: string
          headers?: Json | null
          id?: string
          ip_address?: string | null
          method?: string
          response_body?: Json | null
          response_status?: number | null
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
