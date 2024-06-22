import { View ,Text,Image} from "react-native";
import { StyleSheet } from "react-native";
import {images} from "../constants"
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect,router } from "expo-router";
import 'react-native-url-polyfill/auto'
import GlobalProvider from "../context/globalContext";
import { useGlobalContext } from "../context/globalContext";
import { useCallback, useEffect, useState } from "react";
import Loader from "./loader";
function app(){
  const {isLogged, loading,user}=useGlobalContext();
//  com.ssy.aura
 
 
   if(!loading && isLogged){
     console.log("welcome to home "); 
     return <Redirect href="/home"/>
   }  
   if(loading){
    return <Loader/>
   } 
  
    return (
      <>
      
      <SafeAreaView className="  h-full items-center bg-primary ">
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View className="w-full px-5   justify-center items-center h-full ">
              <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[34px]"/>
              <Image source={images.cards} resizeMode="contain" className="max-w-[375px] w-full h-[298px]"/>
              <View className="relative mt-5">
              <Text className="text-3xl text-center font-bold text-white">Discover Endless Possibilities with {" "} <Text className="text-secondary-200 ">Aura</Text></Text>
              <Image source={images.path} resizeMode="contain" className="absolute  w-[136px] h-[15px] -bottom-1 -right-8 "/>
              </View>
              <Text className="mt-7 font-sm font-pregular text-center text-white">Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
              <CustomButton title="Continue With Email" classNames="w-full mt-5 " handleClick={()=>router.push("/signIn")}/>
            </View>
  
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light"/>
      </SafeAreaView>
     
      </>
    )
  
}
export default app;
