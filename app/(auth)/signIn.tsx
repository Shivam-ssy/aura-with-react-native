import { View, Text,ScrollView,Image,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants"
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { useState } from 'react';
import { Link,router } from 'expo-router';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/globalContext';

function SignIn() {
  const [email,setEmail]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const [issubmiting,setIsSubiting]=useState<boolean>(false)
  const {setUser,setIsLogged}=useGlobalContext()
  const submit=()=>{
    if( !email || ! password){
      Alert.alert("Error","Please fill all the fields")
    }else{
      try {
        setIsSubiting(true)
       const user:Promise<any>= login({email,password});
        setUser(user)
        setIsLogged(true)
        router.replace("/home")
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "An unknown error occurred");
        }
      } finally {
        setIsSubiting(false);
      }
    }
  }
  return (
    <>
    <SafeAreaView className="h-full  bg-primary ">
    <ScrollView  >

    <View className=" w-full m-0  min-h-[85vh] justify-center gap-5 bg-primary">
      <View className="w-full h-full justify-center px-5 gap-5">

      <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[34px]"/>
      <Text className="text-gray-100 text-xl font-bold">Sign In to Aura</Text>
      <FormField title='Email' otherStyle='w-full mt-2' placeHolder='Email'  value={email} handleChangeText={(e)=>setEmail(e)}/>
      <FormField title='Password' otherStyle='w-full mt-2' placeHolder='Password' value={password} handleChangeText={(e)=>setPassword(e)}/>
      <CustomButton title="Sign In" classNames=' mt-5 w-full' textStyle='font-psemibold ' handleClick={submit}/>
      <Text className="text-gray-100 text-pmedium text-center">Did't Have Account? <Text><Link href="/signUp" className='text-secondary-200 font-psemibold '>Sign Up</Link></Text></Text>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    </>
  );
}

export default SignIn;
