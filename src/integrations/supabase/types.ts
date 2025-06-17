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
      crm_customers: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          cpf_cnpj: string | null
          created_at: string | null
          email: string
          id: string
          last_quote_date: string | null
          name: string
          notes: string | null
          phone: string | null
          state: string | null
          total_quotes: number | null
          total_value: number | null
          updated_at: string | null
          user_id: string | null
          whatsapp: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email: string
          id?: string
          last_quote_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          total_quotes?: number | null
          total_value?: number | null
          updated_at?: string | null
          user_id?: string | null
          whatsapp?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string
          id?: string
          last_quote_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          total_quotes?: number | null
          total_value?: number | null
          updated_at?: string | null
          user_id?: string | null
          whatsapp?: string | null
          zip_code?: string | null
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
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
          price: number
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price: number
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
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
      quote_templates: {
        Row: {
          accent_color: string | null
          background_color: string | null
          border_style: string | null
          border_width: number | null
          company_name: string
          created_at: string
          font_family: string | null
          header_text: string
          id: string
          is_default: boolean
          logo_text: string
          name: string
          primary_color: string
          secondary_color: string
          text_color: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          accent_color?: string | null
          background_color?: string | null
          border_style?: string | null
          border_width?: number | null
          company_name?: string
          created_at?: string
          font_family?: string | null
          header_text?: string
          id?: string
          is_default?: boolean
          logo_text?: string
          name: string
          primary_color?: string
          secondary_color?: string
          text_color?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          accent_color?: string | null
          background_color?: string | null
          border_style?: string | null
          border_width?: number | null
          company_name?: string
          created_at?: string
          font_family?: string | null
          header_text?: string
          id?: string
          is_default?: boolean
          logo_text?: string
          name?: string
          primary_color?: string
          secondary_color?: string
          text_color?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          category: string
          created_at: string
          customer_email: string
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          items: Json
          margin_percentage: number
          observations: string | null
          status: string
          subtotal: number
          template_id: string | null
          total: number
          updated_at: string
          use_margin: boolean | null
        }
        Insert: {
          category: string
          created_at?: string
          customer_email: string
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          items: Json
          margin_percentage?: number
          observations?: string | null
          status?: string
          subtotal: number
          template_id?: string | null
          total: number
          updated_at?: string
          use_margin?: boolean | null
        }
        Update: {
          category?: string
          created_at?: string
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          items?: Json
          margin_percentage?: number
          observations?: string | null
          status?: string
          subtotal?: number
          template_id?: string | null
          total?: number
          updated_at?: string
          use_margin?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "quote_templates"
            referencedColumns: ["id"]
          },
        ]
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
      revenues: {
        Row: {
          amount: number
          category: string
          created_at: string
          description: string
          id: string
          notes: string | null
          property: string | null
          revenue_date: string
          source: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          description: string
          id?: string
          notes?: string | null
          property?: string | null
          revenue_date: string
          source?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          description?: string
          id?: string
          notes?: string | null
          property?: string | null
          revenue_date?: string
          source?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
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
      user_margin_settings: {
        Row: {
          created_at: string | null
          id: string
          margin_percentage: number | null
          updated_at: string | null
          use_margin: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          margin_percentage?: number | null
          updated_at?: string | null
          use_margin?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          margin_percentage?: number | null
          updated_at?: string | null
          use_margin?: boolean | null
          user_id?: string | null
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
