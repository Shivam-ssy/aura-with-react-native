import { Client ,Account, Avatars,Databases, Query} from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';
// Init your React Native SDK

interface configuration{
    ProjectId:string;
    endpoint:string;
    platform:string;
    databaseId:string;
    userCollectionId:string;
    videocollectionId:string;
    bucketId:string;
    
}
export const config:configuration={
    ProjectId:"6675385d00161be182eb",
    endpoint:"https://cloud.appwrite.io/v1",
    platform:"com.ssy.aura",
    databaseId:"66756436002b2aa00726",
    userCollectionId:"6675647d000416b15bfd",
    videocollectionId:"6675649e0009eb0f4671",
    bucketId:"667566b5001970240f2d",
}
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.ProjectId) 
    .setPlatform(config.platform) 
;

const account = new Account(client);
const avatar= new Avatars(client)
const database=new Databases(client)

// Register User
interface user{
    username:string;
    email:string;
    password:string;
}
export const createUser= async ({username,email,password}:user):Promise<any>=>{
    try {
        
      const user= await account.create(ID.unique(), email, password, username)
            
               
          if (!user) {
            console.log("user not created")
            throw new Error("User creation failed");
        }


            const avatarUrl=avatar.getInitials(username)
            const newUser=await database.createDocument(
                config.databaseId,
                config.userCollectionId,
                ID.unique(),{
                    accountId:user.$id,
                    email,
                    username,
                    avtar:avatarUrl
                }
            )
            await login({email,password})
            return newUser;
          
    } catch (error) {
        console.log(error)
        throw error;
    }
}
interface logIn{
    email:string;
    password:string;
}
export const login = async ({email,password}:logIn):Promise<any>=>{
        try {
            const session= await account.createEmailPasswordSession(email,password)
            return session;
        } catch (error) {
            console.log(error)
            throw Error
        }
}
export const getCurrentUser = async ()=>{
    try {
        const CurrentAccoutn= await account.get();
        const currentUser=await database.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',CurrentAccoutn.$id)]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log("Error while getting the user",error)
        throw Error
    }
}
