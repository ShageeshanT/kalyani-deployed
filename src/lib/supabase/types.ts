export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      branches: {
        Row: {
          address: string
          city: string
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      custom_requests: {
        Row: {
          admin_notes: string | null
          budget_range: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          design_description: string
          id: string
          preferred_material:
            | Database["public"]["Enums"]["product_material"]
            | null
          quoted_price: number | null
          reference_images: string[] | null
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          budget_range?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          design_description: string
          id?: string
          preferred_material?:
            | Database["public"]["Enums"]["product_material"]
            | null
          quoted_price?: number | null
          reference_images?: string[] | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          budget_range?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          design_description?: string
          id?: string
          preferred_material?:
            | Database["public"]["Enums"]["product_material"]
            | null
          quoted_price?: number | null
          reference_images?: string[] | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      gems: {
        Row: {
          carat_weight: number | null
          clarity: string | null
          color: string | null
          created_at: string
          cut: string | null
          description: string | null
          gem_type: string
          id: string
          images: string[] | null
          is_available: boolean
          is_featured: boolean
          name: string
          origin: string | null
          price_lkr: number | null
          treatment: string | null
          updated_at: string | null
        }
        Insert: {
          carat_weight?: number | null
          clarity?: string | null
          color?: string | null
          created_at?: string
          cut?: string | null
          description?: string | null
          gem_type: string
          id?: string
          images?: string[] | null
          is_available?: boolean
          is_featured?: boolean
          name: string
          origin?: string | null
          price_lkr?: number | null
          treatment?: string | null
          updated_at?: string | null
        }
        Update: {
          carat_weight?: number | null
          clarity?: string | null
          color?: string | null
          created_at?: string
          cut?: string | null
          description?: string | null
          gem_type?: string
          id?: string
          images?: string[] | null
          is_available?: boolean
          is_featured?: boolean
          name?: string
          origin?: string | null
          price_lkr?: number | null
          treatment?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gold_rates: {
        Row: {
          created_at: string
          gold_18k_per_gram: number
          gold_22k_per_gram: number
          gold_24k_per_gram: number
          id: string
          rate_date: string
        }
        Insert: {
          created_at?: string
          gold_18k_per_gram: number
          gold_22k_per_gram: number
          gold_24k_per_gram: number
          id?: string
          rate_date: string
        }
        Update: {
          created_at?: string
          gold_18k_per_gram?: number
          gold_22k_per_gram?: number
          gold_24k_per_gram?: number
          id?: string
          rate_date?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      offers: {
        Row: {
          created_at: string
          description: string | null
          discount_percentage: number | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          start_date: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          start_date?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          start_date?: string | null
          title?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price_lkr: number
          product_id: string | null
          product_name: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price_lkr: number
          product_id?: string | null
          product_name: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price_lkr?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          id: string
          notes: string | null
          order_number: string
          shipping_address: string
          shipping_city: string
          shipping_phone: string
          status: Database["public"]["Enums"]["order_status"]
          total_lkr: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          id?: string
          notes?: string | null
          order_number: string
          shipping_address: string
          shipping_city: string
          shipping_phone: string
          status?: Database["public"]["Enums"]["order_status"]
          total_lkr: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          id?: string
          notes?: string | null
          order_number?: string
          shipping_address?: string
          shipping_city?: string
          shipping_phone?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_lkr?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: Database["public"]["Enums"]["product_category"]
          created_at: string
          description: string | null
          dimensions: string | null
          gemstone_details: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          material: Database["public"]["Enums"]["product_material"]
          name: string
          price_lkr: number
          slug: string
          stock_quantity: number | null
          updated_at: string
          weight_grams: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["product_category"]
          created_at?: string
          description?: string | null
          dimensions?: string | null
          gemstone_details?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          material: Database["public"]["Enums"]["product_material"]
          name: string
          price_lkr: number
          slug: string
          stock_quantity?: number | null
          updated_at?: string
          weight_grams?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string
          description?: string | null
          dimensions?: string | null
          gemstone_details?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          material?: Database["public"]["Enums"]["product_material"]
          name?: string
          price_lkr?: number
          slug?: string
          stock_quantity?: number | null
          updated_at?: string
          weight_grams?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          pincode: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      repair_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          estimated_cost: number | null
          id: string
          item_description: string
          item_images: string[] | null
          pickup_preference: string | null
          repair_description: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          estimated_cost?: number | null
          id?: string
          item_description: string
          item_images?: string[] | null
          pickup_preference?: string | null
          repair_description: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          estimated_cost?: number | null
          id?: string
          item_description?: string
          item_images?: string[] | null
          pickup_preference?: string | null
          repair_description?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          district: string | null
          email: string | null
          id: string
          message: string
          name: string
          rating: number
          status: "pending" | "approved" | "declined"
        }
        Insert: {
          created_at?: string
          district?: string | null
          email?: string | null
          id?: string
          message: string
          name: string
          rating: number
          status?: "pending" | "approved" | "declined"
        }
        Update: {
          created_at?: string
          district?: string | null
          email?: string | null
          id?: string
          message?: string
          name?: string
          rating?: number
          status?: "pending" | "approved" | "declined"
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      product_category:
        | "rings"
        | "necklaces"
        | "earrings"
        | "bracelets"
        | "pendants"
        | "bangles"
      product_material:
        | "gold_24k"
        | "gold_22k"
        | "gold_18k"
        | "gold_14k"
        | "silver"
        | "platinum"
        | "rose_gold"
        | "white_gold"
      request_status:
        | "pending"
        | "in_review"
        | "quoted"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "customer"],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      product_category: [
        "rings",
        "necklaces",
        "earrings",
        "bracelets",
        "pendants",
        "bangles",
      ],
      product_material: [
        "gold_24k",
        "gold_22k",
        "gold_18k",
        "gold_14k",
        "silver",
        "platinum",
        "rose_gold",
        "white_gold",
      ],
      request_status: [
        "pending",
        "in_review",
        "quoted",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
