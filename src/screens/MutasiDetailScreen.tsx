import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { BaseLayout } from "../components/Layout";

export type RequestStatusType =
  | "pending"
  | "fileVerifyFailed"
  | "fileVerifySuccess"
  | "verifyVehicle"
  | "waitingPickup"
  | "complete";

const MutasiDetailScreen = () => {
  return (
    <BaseLayout
      style={{
        marginTop: 4,
        flex: 1,
        paddingTop: 8,
        paddingHorizontal: 12,
      }}>
      <Card style={[styles.cardStyle, { height: 100 }]}>
        <Text>detail mutasi request</Text>
      </Card>
      <Card style={[styles.cardStyle, { height: 250 }]}>
        <Text>history mutasi</Text>
      </Card>
      <View style={{ height: 60 }} />
    </BaseLayout>
  );
};

export default MutasiDetailScreen;

const styles = StyleSheet.create({
  cardStyle: {
    elevation: 0,
  },
});
