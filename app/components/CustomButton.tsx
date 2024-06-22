import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
interface CustomButtonProps{
    title:string;
    handleClick:()=>void;
    classNames:string;
    isLoading:boolean;
    textStyle:string;
}
const CustomButton: React.FC<CustomButtonProps> = ({title,handleClick, classNames,isLoading,textStyle}) => {
  return (
    <>
        <TouchableOpacity onPress={handleClick} activeOpacity={0.7} 
         disabled={isLoading}
        className={`bg-secondary-100 min-h-[62px] rounded-xl justify-center items-center ${classNames} ${isLoading? "opacity-50":""}`}>
            <Text className={`text-primary text-lg font-semibold ${textStyle}`}>
                {title}
            </Text>
        </TouchableOpacity>
    </>
  );
}

export default CustomButton;
