import { View, Text,Image} from "react-native";
import React, { useState } from "react";
import CardComponent from "./CardComponent";
import Grid from "./Grid";
import Color from "./Color";
import Icon from "./Icon";
import PressableButton from "./PressableButton";
import { AntDesign } from "@expo/vector-icons";



export default function DiaryCard({itemData}) {
  const [liked,setLiked]=useState(false);
  return (
    <CardComponent
      flexDirection="column"
      color={Color.headerTabColor}
      width={350}
      height={250}
      radius={20}
      marginBottom={15}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Image style={{width:130,height:130,marginTop:20}}
          source={{uri:itemData[0]}}></Image>
        <Grid
          itemData={itemData}
          width={100}
          alignSelf="flex-start"
          marginTop={10}
          marginRight={40}
        ></Grid>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "column" }}> 
          <Text>Name</Text>
        </View>
        <Text style={{ alignSelf: "center" }}>Random Text Story </Text>
      </View>
      <View style={{ flexDirection: "row" ,justifyContent:"space-around"}}>
      <Text style={{ marginTop: 10, marginLeft: 40 }}>Species: Orchild</Text>
      <PressableButton
          customizedStyle={{
            flexDirection: "row",
            // justifyContent:,
            width: "10%",
          }}
          buttonPressed={()=>{setLiked(!liked)}}
        >
      <AntDesign  name={!liked?"hearto":"heart"} color={liked?"red":"black"} size={22}></AntDesign>
      </PressableButton>
      </View>
    </CardComponent>
  );
}
