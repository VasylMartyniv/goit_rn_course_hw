declare module 'react-native-config' {
  export interface NativeConfig {
    SUPABASE_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
