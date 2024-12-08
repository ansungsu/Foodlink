import React from "react";
import { SafeAreaView } from "react-native";
import MyPage from "./MyPage";
import { styles } from "../RecipeCommunityScreen/Page.style";

const Page = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MyPage />
    </SafeAreaView>
  );
};

export default Page;