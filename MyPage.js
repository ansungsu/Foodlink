import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../RecipeCommunityScreen/MyPage.style";
import CmPostList from "./Community/CmPostList"; // CmPostList 컴포넌트
import RecipeList from "../RecipeCommunityScreen/Recipe/RecipeList"; // RecipeList 컴포넌트
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"; // Firestore 관련 추가
import { getAuth } from "firebase/auth"; // 현재 사용자 정보 가져오기
import { app2 } from "../../../firebase";

const MyPage = () => {
  const navigation = useNavigation();
  const [ingredients, setIngredients] = useState([]); // Firestore 이미지 데이터 상태
  const [selectedTab, setSelectedTab] = useState("레시피"); // 현재 선택된 탭 상태
  const db = getFirestore(app2); // Firestore 데이터베이스 가져오기
  const auth = getAuth(); // 현재 사용자 정보 가져오기
  const [nickname, setNickname] = useState(""); // 현재 사용자 닉네임

  // 현재 사용자 닉네임 가져오기
  const fetchNickname = async () => {
    try {
      const userUID = auth.currentUser?.uid;
      if (!userUID) {
        console.error("로그인된 사용자가 없습니다.");
        return;
      }

      const userDocRef = collection(db, "users");
      const userDocs = await getDocs(query(userDocRef, where("uid", "==", userUID)));

      if (!userDocs.empty) {
        const userData = userDocs.docs[0].data();
        setNickname(userData.nickname || "익명");
      } else {
        console.error("사용자 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("닉네임 불러오기 실패:", error);
    }
  };

  // Firestore에서 사용자 닉네임에 해당하는 게시물 데이터 불러오기
  const fetchIngredients = async () => {
    try {
      if (!nickname) return; // 닉네임이 없으면 실행하지 않음

      const querySnapshot = await getDocs(
        query(collection(db, "냉장고"), where("nickname", "==", nickname))
      );
      const imageList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
      }));
      setIngredients(imageList);
    } catch (error) {
      console.error("식자재 데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchNickname(); // 컴포넌트 마운트 시 사용자 닉네임 로드
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchIngredients(); // 화면 포커스 시 데이터 갱신
    }, [nickname])
  );

  // + 버튼 클릭 핸들러
  const handleAddPost = () => {
    if (selectedTab === "레시피") {
      navigation.navigate("MyRecipePost"); // 레시피 탭의 + 버튼
    } else if (selectedTab === "커뮤니티") {
      navigation.navigate("MyCmPost"); // 커뮤니티 탭의 + 버튼
    }
  };

  return (
    <View style={styles.container}>
      {/* 내 식자재 Section */}
      <View style={styles.myIngredientsSection}>
        <View style={styles.myIngredientsHeader}>
          <Text style={styles.headerText}>내 식자재</Text>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => navigation.navigate("MyIngredientsScreen")}
          >
            <Text style={styles.moreText}>더 보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ingredientsListContainer}
        >
          {/* 식자재 이미지 */}
          {ingredients.map((item) => (
            <View key={item.id} style={styles.ingredientImage}>
              <Image source={{ uri: item.url }} style={styles.ingredientImage} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 게시판 Section */}
      <View style={styles.boardSection}>
        {/* 게시판 헤더 */}
        <View style={styles.boardHeader}>
          <Text style={styles.headerText}>게시판</Text>
          <TouchableOpacity style={styles.addPostButton} onPress={handleAddPost}>
            <Text style={styles.addPostButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boardTabs}>
          <TouchableOpacity
            style={selectedTab === "레시피" ? styles.tabActive : styles.tab}
            onPress={() => setSelectedTab("레시피")}
          >
            <Text
              style={
                selectedTab === "레시피"
                  ? styles.tabActiveText
                  : styles.tabText
              }
            >
              레시피
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedTab === "커뮤니티" ? styles.tabActive : styles.tab}
            onPress={() => setSelectedTab("커뮤니티")}
          >
            <Text
              style={
                selectedTab === "커뮤니티"
                  ? styles.tabActiveText
                  : styles.tabText
              }
            >
              커뮤니티
            </Text>
          </TouchableOpacity>
        </View>

        {/* 레시피 탭 */}
        {selectedTab === "레시피" && (
          <View style={styles.recipeListContainer}>
            <RecipeList />
          </View>
        )}

        {/* 커뮤니티 */}
        {selectedTab === "커뮤니티" && (
          <View style={styles.postContainer}>
            <CmPostList navigation={navigation} />
          </View>
        )}
      </View>
    </View>
  );
};

export default MyPage;
