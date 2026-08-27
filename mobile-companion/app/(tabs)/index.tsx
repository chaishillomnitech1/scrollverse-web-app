import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScreenShell } from "@/components/ScreenShell";
import { PortalCard } from "@/components/PortalCard";
import { openPortal, PORTAL_PATHS } from "@/lib/portal";

const cards = [
  { eyebrow: "VISUAL SIGNAL", title: "Choose a pulse", detail: "Open the creator-authored Visual Signal and connected original worlds.", accent: "#00D4FF", icon: "pulse-outline" as const, path: PORTAL_PATHS.signal },
  { eyebrow: "PUBLIC EXPLORATION", title: "World Lens", detail: "Explore source-linked public world, map, weather, and observation context.", accent: "#9DEBFF", icon: "globe-outline" as const, path: PORTAL_PATHS.worldLens },
  { eyebrow: "CREATOR RECORD", title: "Digital DNA", detail: "Read the owner-authored frequency, equation, seal, character, and source record.", accent: "#DCC8FF", icon: "finger-print-outline" as const, path: PORTAL_PATHS.digitalDna },
];

export default function SignalScreen() { return <ScreenShell><FlatList data={cards} keyExtractor={(item) => item.title} contentContainerStyle={styles.content} ListHeaderComponent={<View style={styles.hero}><Text style={styles.eyebrow}>SCROLLVERSE · MOBILE COMPANION</Text><Text style={styles.title}>The source-led world, in your hands.</Text><Text style={styles.body}>A native companion starter with first-party creative paths. Every card opens the live ScrollVerse portal; no external account or device control is implied.</Text></View>} renderItem={({ item }) => <PortalCard {...item} onPress={() => openPortal(item.path)}/>} ListFooterComponent={<Text style={styles.note}>Native companion source kit · version 0.1.0 · store identity and signing intentionally not configured</Text>}/></ScreenShell>; }
const styles = StyleSheet.create({ content: { padding: 18, paddingBottom: 30 }, hero: { paddingTop: 12, paddingBottom: 22 }, eyebrow: { color: "#9DEBFF", fontSize: 10, fontWeight: "700", letterSpacing: 1.5 }, title: { marginTop: 15, color: "#FFFFFF", fontSize: 36, lineHeight: 40, fontWeight: "900" }, body: { marginTop: 15, color: "#C8D8E7", fontSize: 15, lineHeight: 24 }, note: { marginTop: 8, color: "#8293A4", fontSize: 11, lineHeight: 18, textAlign: "center" } });
