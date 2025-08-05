import { StatusBar } from 'expo-status-bar';
// import { Audio } from 'expo-av';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect, use } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';


const colors =["#f7dc6f","#a2d9ce","#d7bde2"];

export default function App() {
  //Clock working starting in false (We start it as users)
  const [isRunning, setIsRunning]=useState(false);
  const [isActive, setIsActive]=useState(false);
  //Storing time by product of minutes * seconds
  const [time, setTime]=useState(25*60);
  const [currentTime,setCurrentTime]=useState(" Pomo" | "Short Break" |"Long Break" );

  useEffect(() => {
    let interval=null;
    if(isActive){
       interval=setInterval( () => {  
        setTime(time-1);       
        },1000); } 
        else{
            clearInterval(interval);
                }

                if(time === 0){
                  setIsActive(false);
                  setIsRunning((prev)=> !prev);
                // Reset to 25 minutes for Pomodoro or 5 minutes for Short Break
                  setTime(isRunning ? 300 : 1500); // Reset current time to Pom
                  //playSound(); // Uncomment to play sound when timer ends

                }
              return ()=>clearInterval(interval);
            }, [isActive, time]);


  //Function to start the clock 
  
function handleStartStop(){
    setIsActive(!isActive);
    //playSound();
};
/*
 async function playSound() {
  const {sound}= await Audio.Sound.createAsync(
    require('./assets/sound.mp3')
  );

  await sound.playAsync();
}*/
  return (
    <View style={[styles.container, { backgroundColor: colors[currentTime]}]}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Pomodoro</Text>
      <Header currentTime={currentTime} 
              setCurrentTime={setCurrentTime} 
              setTime={setTime}/>
      <Timer time={time}/>
      <TouchableOpacity style={styles.button} 
                        onPress={handleStartStop}
                        >
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              {isActive ? "PAUSE" : "START"} 
            </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:40,
  },
  text:{
    fontSize:32, fontWeight:'bold'
  },
  button: {
    backgroundColor: 'black',
    padding: 20,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderRadius:10,
    borderColor:'black',    
    marginTop: 2.5,
  },
});
