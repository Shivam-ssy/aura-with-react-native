import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { icons } from "@/constants";
interface fildInput {
  title: string;
  value: string;
  handleChangeText: () => string;
  placeHolder: string;
  otherStyle: string;
}
export default function FormField({
  title,
  value,
  handleChangeText,
  placeHolder,
  otherStyle,
}: fildInput) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View className={`space-y-2 ${otherStyle} h-18`}>
        <Text className="text-gray-100 text-base font-pmedium ">{title}</Text>
        <View className="w-full border-2 border-black-200 bg-black-100 h-16 px-4 rounded-2xl">
          <TextInput
            className="flex-1 font-psemibold text-white text-base"
            value={value}
            placeholder={placeHolder}
            onChangeText={handleChangeText}
            placeholderTextColor="#7b7b8b"
            secureTextEntry={title === "Password" && !showPassword}
          />
          {title === "Password" && (
            <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className="absolute top-3 right-0">
              {
                !showPassword ? 
                <Image
                  className="h-10"
                  resizeMode="contain"
                  source={icons.eye}
                />:
                <Image
                  className="h-10"
                  resizeMode="contain"
                  source={icons.eyeHide}
                />
              }
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
