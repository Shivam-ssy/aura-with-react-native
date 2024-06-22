import { View, Text,ScrollView,Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants"
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import {createUser} from "../../lib/appwrite"
import { useGlobalContext } from '@/context/globalContext';
function SignUp() {
  const [username,setUserName]=useState<string>("")
  const [email,setEmail]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const [isSubmmiting,setIsSubitting]=useState<boolean>(false)
  const {setUser,setIsLogged}=useGlobalContext()
  const submit=async()=>{
    if(!username || !email || ! password){
      Alert.alert("Error","Please fill all the fields")
    }else{
      try {
        setIsSubitting(true)
       const user=await createUser({email,password,username});
       setUser(user)
        setIsLogged(true)
        console.log(user)
        router.replace("/home")
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "An unknown error occurred");
        }
        throw error
      } finally {
        setIsSubitting(false);
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
      <FormField title='UserName' otherStyle='w-full mt-2' placeHolder='Username'  value={username} handleChangeText={(e)=>setUserName(e)}/>
      <FormField title='Email' otherStyle='w-full mt-2' placeHolder='Email'  value={email} handleChangeText={(e)=>setEmail(e)}/>
      <FormField title='Password' otherStyle='w-full mt-2' placeHolder='Password' value={password} handleChangeText={(e)=>setPassword(e)}/>
      <CustomButton title="Sign Up" classNames=' mt-5 w-full' textStyle='font-psemibold ' handleClick={submit}/>
      <Text className="text-gray-100 text-pmedium text-center">Have an Account already? <Text><Link href="/signIn" className='text-secondary-200 font-psemibold '>Sign In</Link></Text></Text>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    </>
  );
}

export default SignUp;
