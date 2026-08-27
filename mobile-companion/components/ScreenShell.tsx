import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenShell({ children }: { children: ReactNode }) {
  return <View style={styles.root}><SafeAreaView edges={["top", "left", "right"]} style={styles.safe}>{children}</SafeAreaView></View>;
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: "#050B1A" }, safe: { flex: 1 } });
