import { View ,Text, Link, ScrollView} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
function Home(){
    return(
        <>
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
            <View className="w-full h-full justify-center">
                <Text className="text-white">
                    This is Home Page
                </Text>
            </View>

            </ScrollView>
        </SafeAreaView>
        </>
    )
}
export default Home;