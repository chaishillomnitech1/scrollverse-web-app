import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export function PortalCard({ eyebrow, title, detail, accent, icon, onPress }: { eyebrow: string; title: string; detail: string; accent: string; icon: IoniconName; onPress: () => Promise<void> | void }) {
  return <Pressable onPress={async () => { await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); await onPress(); }} style={({ pressed }) => [styles.card, { borderColor: `${accent}85` }, pressed && styles.pressed]} accessibilityRole="link" accessibilityLabel={`${title}. ${detail}`}><View style={styles.header}><Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text><Ionicons name={icon} size={20} color={accent}/></View><Text style={styles.title}>{title}</Text><Text style={styles.detail}>{detail}</Text><Text style={[styles.open, { color: accent }]}>Open first-party path ›</Text></Pressable>;
}

const styles = StyleSheet.create({ card: { minHeight: 188, padding: 18, borderWidth: 1, borderRadius: 22, backgroundColor: "#09182B", marginBottom: 12 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, eyebrow: { fontSize: 10, fontWeight: "700", letterSpacing: 1.3 }, title: { marginTop: 20, color: "#FFFFFF", fontSize: 23, lineHeight: 28, fontWeight: "800" }, detail: { marginTop: 9, color: "#C8D8E7", fontSize: 13, lineHeight: 20 }, open: { marginTop: "auto", paddingTop: 18, fontSize: 13, fontWeight: "800" }, pressed: { opacity: 0.74, transform: [{ scale: 0.97 }] } });
