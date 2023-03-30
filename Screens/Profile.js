import { View, Text, FlatList, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDiaryQueueByUser, getProfileByUid } from '../Firebase/helper';
import { auth, firestore } from '../Firebase/firebase-setup';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';


export default function Profile({ navigation, route }) {
  const [profile, setProfile] = useState({id:auth.currentUser.uid,headPhoto:'',name:'User Profile',postCount:0,followerCount:0,followingCount:0,achievement:[]});
  const [id, setId] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [self, setSelf] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect( ()=>{
      (async()=>{
        let diaryListqueue;
        if (route.name === "Third Profile") {
        // console.log("third profile");
        let currentProfile = await getProfileByUid(route.params.id);
        diaryListqueue =  getDiaryQueueByUser(route.params.id);
        setId(route.params.id);
        setProfile(currentProfile);
        // setDiaries(diaryList);
        setSelf(false);
        navigation.setOptions({
          title: profile.name,
        })
        // let relation = checkRelation(id);
        // setFollowing(relation);
      } else {
        setId(auth.currentUser.uid);
        diaryListqueue =  getDiaryQueueByUser(auth.currentUser.uid);
        let currentProfile = await getProfileByUid(auth.currentUser.uid);
        // setDiaries(diaryList);
        setProfile(currentProfile);
        
        // const unsubscribe = onSnapshot(query(collection(firestore, "diary"),where("userId", "==", id)),(querySnapshot) => {
        //   if (querySnapshot.empty) {
        //     setDiaries([]);
        //   } else {
        //     const newDiaries = [];
        //     querySnapshot.forEach((doc) => {
        //         newDiaries.push({ ...doc.data(), diaryId:doc.id });
        //     });
        //     setDiaries(newDiaries);
        //   }
        // },
        // (err) => {
        //   console.log(err);
        // });
    
        // // cleanup function
        // return () => {
        //   console.log("unsubscribe");
        //   unsubscribe();
        // };
        // console.log(currentProfile);
        
        // const temp = {id:auth.currentUser.uid,headPhoto:'head-url',name:'david',postCount:10,followerCount:34,followingCount:45,achievements:['achievement-1','achievement-2'],diaries:['342','234','809']};
        // setProfile(temp);
      }
      const unsubscribe = onSnapshot(diaryListqueue, (querySnapshot) => {
        if (querySnapshot.empty) {
          setDiaries([]);
        } else {
          let diaries = [];
          querySnapshot.docs.forEach((doc) => {
            diaries.push({ ...doc.data(), diaryId: doc.id });
          });
          setDiaries(diaries);
        }
      });
      return () => {
        unsubscribe();
      };
  
      // const diaryList = profile.diaries.map((x) => ({diaryId:x,diaryPic:getDiary(x)[0]}));
      // const diaryList = [{diaryId:123, diaryPic:'pic-url1'}, {diaryId:234, diaryPic:'pic-url2'}]
      // console.log(diaryList);
      // console.log(profile);
    }
    )();

  },[])

  function pressFollow() {
    // followUser(selfId,thirdId);
    setFollowing(true);
    console.log('Follow user');
  }

  function pressUnfollow() {
    // unfollowUser(selfId,thirdId);
    setFollowing(false);
    console.log('Unfollow user');
  }

  return (
    <View>
      <View>
        <Text>User head photo: {profile.headPhoto}</Text>
        <Text>User name: {profile.name}</Text>
        {self && <Button title='Edit Profile' onPress={()=>navigation.navigate('Edit Profile',{profile: profile})}/>}
        <Text>Post number: {profile.postCount}</Text>
        <Pressable onPress={()=>navigation.navigate('Follow', {screen: 'Follower', id: id, name: profile.name})}><Text>Follower: {profile.followerCount}</Text></Pressable>
        <Pressable onPress={()=>navigation.navigate('Follow', {screen: 'Following', id: id, name: profile.name})}><Text>Following: {profile.followingCount}</Text></Pressable>
        {!self && following && <Button title="Following" onPress={()=>pressUnfollow()} />}
        {!self && !following && <Button title="Follow" onPress={()=>pressFollow()} />}
        <Text>Achievement</Text>
        <FlatList 
        data={profile.achievement}
        renderItem={({item})=>{
          return (
            <Text>{item}</Text>
          )
        }}
         />
      </View>
      <View>
        <Text>Diary Grid</Text>
        <FlatList 
        data={diaries}
        renderItem={({item})=>{
          return (
            <View>
            <Text>Item Photo: {item.photos[0]}</Text>
            <Text>Item ID: {item.diaryId}</Text>
            <Text>Item Species: {item.species}</Text>
            {self && <Button title='edit' onPress={()=>navigation.navigate('Edit Diary',{diary:item})}/>}
            </View>
          )
        }}
         />
      </View>
      {self && <Button title="Logout" onPress={()=>signOut(auth)} />}
      {/* <View>
        <Button title='Home' onPress={()=>navigation.navigate('Home')} />
        <Button title='Create a Diary' onPress={()=>navigation.navigate('Create')} />
        <Button title='Profile' disabled={true} />
      </View> */}
    </View>
  )
}