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
      Clients: {
        Row: {
          address: string
          age: number
          firstName: string
          id: number
          lastName: string
          mail: string
        }
        Insert: {
          address: string
          age: number
          firstName: string
          id?: number
          lastName: string
          mail: string
        }
        Update: {
          address?: string
          age?: number
          firstName?: string
          id?: number
          lastName?: string
          mail?: string
        }
        Relationships: []
      }
      Companyreport: {
        Row: {
          id: number
          salesVolume: number | null
        }
        Insert: {
          id?: number
          salesVolume?: number | null
        }
        Update: {
          id?: number
          salesVolume?: number | null
        }
        Relationships: []
      }
      "Demo-Tabelle": {
        Row: {
          Text: string
        }
        Insert: {
          Text?: string
        }
        Update: {
          Text?: string
        }
        Relationships: []
      }
      "Demo-Tabelle 2": {
        Row: {
          id: number
          Text: string
        }
        Insert: {
          id: number
          Text: string
        }
        Update: {
          id?: number
          Text?: string
        }
        Relationships: []
      }
      Employees: {
        Row: {
          age: number
          firstName: string
          id: number
          lastName: string
          note: string
        }
        Insert: {
          age: number
          firstName: string
          id?: number
          lastName: string
          note: string
        }
        Update: {
          age?: number
          firstName?: string
          id?: number
          lastName?: string
          note?: string
        }
        Relationships: []
      }
      Exampletable: {
        Row: {
          Allgemein: string | null
          connectId: number | null
          id: number
          Name: string | null
        }
        Insert: {
          Allgemein?: string | null
          connectId?: number | null
          id?: number
          Name?: string | null
        }
        Update: {
          Allgemein?: string | null
          connectId?: number | null
          id?: number
          Name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Exampletable_connectId_fkey"
            columns: ["connectId"]
            isOneToOne: false
            referencedRelation: "Exampletable2"
            referencedColumns: ["id"]
          },
        ]
      }
      Exampletable2: {
        Row: {
          Baum: string | null
          Exampletext: string
          id: number
        }
        Insert: {
          Baum?: string | null
          Exampletext?: string
          id?: number
        }
        Update: {
          Baum?: string | null
          Exampletext?: string
          id?: number
        }
        Relationships: []
      }
      Orders: {
        Row: {
          business: boolean
          clients_id: number
          employee_id: number
          id: number
          note: string | null
          orderDay: string
          paymentMethod: string
          paymentStatus: string
          quantity: number
          service: string
          serviceValue: number
        }
        Insert: {
          business: boolean
          clients_id: number
          employee_id: number
          id?: number
          note?: string | null
          orderDay: string
          paymentMethod: string
          paymentStatus?: string
          quantity: number
          service?: string
          serviceValue: number
        }
        Update: {
          business?: boolean
          clients_id?: number
          employee_id?: number
          id?: number
          note?: string | null
          orderDay?: string
          paymentMethod?: string
          paymentStatus?: string
          quantity?: number
          service?: string
          serviceValue?: number
        }
        Relationships: [
          {
            foreignKeyName: "Orders_clients_id_fkey"
            columns: ["clients_id"]
            isOneToOne: false
            referencedRelation: "Clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "Employees"
            referencedColumns: ["id"]
          },
        ]
      }
      "User-Tabelle": {
        Row: {
          Age: number | null
          FirstName: string
          id: number
          LastName: string | null
        }
        Insert: {
          Age?: number | null
          FirstName: string
          id: number
          LastName?: string | null
        }
        Update: {
          Age?: number | null
          FirstName?: string
          id?: number
          LastName?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
